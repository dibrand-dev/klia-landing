import { WbIco } from './wb-icons'

export function WbChip({ org }: { org: string | null }) {
  return org
    ? <span className="wb-chip" title={org}><WbIco n="org" s={14} /><span>{org}</span></span>
    : <span className="wb-chip wb-chip-online"><WbIco n="globe" s={14} /><span>Online</span></span>
}

export function WbImg({ title, org, src }: { title: string; org: string | null; src: string | null }) {
  return (
    <div className="wb-img" role="img" aria-label={`Imagen del webinar ${title}`}>
      {src
        ? <img src={src} alt="" loading="lazy" width={1600} height={900} />
        : <span className="wb-img-label">imagen hero · {org || 'webinar online'}</span>}
    </div>
  )
}

export function WbStatePanel({ kind }: { kind: 'closed' | 'ended' }) {
  const c = kind === 'closed'
    ? { ico: 'lock' as const, t: 'Inscripción cerrada', p: 'La fecha de inscripción a este webinar ya venció.' }
    : { ico: 'flag' as const, t: 'Este webinar ya finalizó', p: 'La transmisión ya se realizó.' }
  return (
    <div className="wb-state" role="status">
      <div className="wb-ibox"><WbIco n={c.ico} s={22} /></div>
      <h2>{c.t}</h2><p>{c.p}</p>
      <a href="/webinar" className="btn btn-ghost"><WbIco n="back" s={16} />Ver próximos webinars</a>
    </div>
  )
}
