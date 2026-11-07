type WbIcoProps = { n: WbIcoName; s?: number }

export type WbIcoName =
  | 'cal' | 'clock' | 'hour' | 'globe' | 'org' | 'check' | 'arrow' | 'back'
  | 'chev' | 'alert' | 'dl' | 'copy' | 'video' | 'lock' | 'flag' | 'menu' | 'x' | 'ext'

const PATHS: Record<WbIcoName, React.ReactNode> = {
  cal: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  hour: <path d="M6 3h12M6 21h12M17 21v-3.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V21M7 3v3.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V3" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.7 3 4 6 4 9s-1.3 6-4 9c-2.7-3-4-6-4-9s1.3-6 4-9z" /></>,
  org: <><path d="M3 21h18M5 21V9l7-5 7 5v12" /><path d="M9 21v-5h6v5" /></>,
  check: <path d="M5 12.5l4 4 10-10" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
  chev: <path d="m6 9 6 6 6-6" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5h.01" /></>,
  dl: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2.5" /><path d="m16 10.5 5-3v9l-5-3" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
  flag: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  ext: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
}

export function WbIco({ n, s = 18 }: WbIcoProps) {
  return (
    <svg className="wb-ico" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[n]}
    </svg>
  )
}
