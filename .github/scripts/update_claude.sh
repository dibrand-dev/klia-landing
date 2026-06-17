#!/usr/bin/env bash
set -e

COMMITS=$(git log --since="24 hours ago" --oneline --no-merges)

if [ -z "$COMMITS" ]; then
  echo "No hay commits en las ultimas 24 horas. Saliendo."
  exit 0
fi

FECHA=$(TZ="America/Argentina/Buenos_Aires" date +"%Y-%m-%d")

# Eliminar seccion previa
python3 -c "
import re
with open('CLAUDE.md') as f:
    content = f.read()
content = re.sub(r'\n## Ultimos cambios\n.*', '', content, flags=re.DOTALL)
with open('CLAUDE.md', 'w') as f:
    f.write(content)
"

# Agregar seccion nueva
{
  printf '\n## Ultimos cambios\n'
  printf '_Actualizado el %s_\n\n' "$FECHA"
  printf '```\n'
  printf '%s\n' "$COMMITS"
  printf '```\n'
} >> CLAUDE.md

# Commit y push
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git add CLAUDE.md
git diff --cached --quiet || git commit -m "docs: CLAUDE.md - commits del dia $FECHA"
git pull --rebase origin main
git push
