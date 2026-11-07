'use client'

import { useEffect, useRef, useState } from 'react'
import { WbIco } from '../wb-icons'
import { buildGoogleCalendarUrl, buildIcs, type WebinarCalendarInfo } from '@/lib/webinars/utils'

export default function WbSuccess({ webinar, meetUrl, email, already }: {
  webinar: WebinarCalendarInfo
  meetUrl: string
  email: string
  already: boolean
}) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => { ref.current?.focus({ preventScroll: true }) }, [])

  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2200) }
    if (navigator.clipboard) navigator.clipboard.writeText(meetUrl).then(done, done)
    else done()
  }

  const downloadIcs = () => {
    const ics = buildIcs(webinar, meetUrl)
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    a.download = `${webinar.slug}.ics`
    a.click()
  }

  return (
    <div className="wb-success" role="status">
      <div className="wb-okico"><WbIco n="check" s={26} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 tabIndex={-1} ref={ref}>¡Listo, estás inscripto/a!</h2>
        <p className="lead2">{already ? 'Ya estabas inscripto/a, te reenviamos el mail' : <>Te enviamos un mail a <strong>{email}</strong> con los detalles</>}</p>
      </div>
      <div className="wb-actions">
        <a className="btn btn-accent" href={buildGoogleCalendarUrl(webinar, meetUrl)} target="_blank" rel="noopener"><WbIco n="cal" s={17} />Agregar a Google Calendar</a>
        <button type="button" className="btn btn-ghost" onClick={downloadIcs}><WbIco n="dl" s={17} />Descargar .ics</button>
      </div>
      <div className="wb-meet">
        <div className="wb-meet-t"><WbIco n="video" s={18} />Link de la videoconferencia</div>
        <div className="wb-url">
          <code>{meetUrl.replace('https://', '')}</code>
          <button type="button" className={'wb-copy' + (copied ? ' is-done' : '')} onClick={copy} aria-label={copied ? 'Link copiado' : 'Copiar link de la reunión'}>
            <WbIco n={copied ? 'check' : 'copy'} s={16} />{copied ? 'Copiado' : 'Copiar link'}
          </button>
        </div>
        <span className="wb-sr" aria-live="polite">{copied ? 'Link copiado al portapapeles' : ''}</span>
        <a className="btn btn-accent" href={meetUrl} target="_blank" rel="noopener">Ir a la reunión <WbIco n="ext" s={16} /></a>
      </div>
    </div>
  )
}
