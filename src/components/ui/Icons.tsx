type IconProps = { size?: number; className?: string; style?: React.CSSProperties }

const Icon = ({ children, size = 22, ...rest }: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    {...rest}
  >{children}</svg>
)

export const ArrowRight = (p: IconProps) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>
export const Play       = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/></Icon>
export const Star       = (p: IconProps) => <Icon {...p}><path d="M12 3.5l2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.9l6-.9z"/></Icon>
export const Moon       = (p: IconProps) => <Icon {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></Icon>
export const Sun        = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></Icon>
export const Menu       = (p: IconProps) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>
export const X          = (p: IconProps) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>
export const Receipt    = (p: IconProps) => <Icon {...p}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></Icon>
export const Wallet     = (p: IconProps) => <Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none"/></Icon>
export const Brain      = (p: IconProps) => <Icon {...p}><path d="M9 5a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8c0 1.2.7 2.2 1.8 2.7A3 3 0 0 0 9 18a3 3 0 0 0 3-1.5"/><path d="M15 5a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8c0 1.2-.7 2.2-1.8 2.7A3 3 0 0 1 15 18a3 3 0 0 1-3-1.5"/><path d="M12 5v13"/></Icon>
export const Calendar   = (p: IconProps) => <Icon {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></Icon>
export const Clock      = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></Icon>
export const Shield     = (p: IconProps) => <Icon {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2.2 2.2L15 10.5"/></Icon>
export const Bolt       = (p: IconProps) => <Icon {...p}><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></Icon>
export const Phone      = (p: IconProps) => <Icon {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></Icon>
export const Lock       = (p: IconProps) => <Icon {...p}><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></Icon>
export const Check      = (p: IconProps) => <Icon {...p}><path d="M5 12.5l4 4 10-10"/></Icon>
export const Plus       = (p: IconProps) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>
export const Minus      = (p: IconProps) => <Icon {...p}><path d="M5 12h14"/></Icon>
export const Quote      = (p: IconProps) => (
  <svg width={p.size ?? 26} height={p.size ?? 26} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M7.2 5C5 6.5 3.5 9 3.5 12.2c0 3 1.7 5 4.2 5 1.7 0 3-1.2 3-2.9 0-1.5-1-2.7-2.5-2.9-.6 0-.9-.2-.9-.7 0-1.3 1-2.7 2.4-3.7zM17.2 5c-2.2 1.5-3.7 4-3.7 7.2 0 3 1.7 5 4.2 5 1.7 0 3-1.2 3-2.9 0-1.5-1-2.7-2.5-2.9-.6 0-.9-.2-.9-.7 0-1.3 1-2.7 2.4-3.7z"/>
  </svg>
)
export const Sparkle    = (p: IconProps) => <Icon {...p}><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"/></Icon>
export const Chat       = (p: IconProps) => <Icon {...p}><path d="M21 12a8 8 0 0 1-12.5 6.6L4 20l1.4-4.5A8 8 0 1 1 21 12z"/></Icon>
export const Globe      = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.7 3 4 6 4 9s-1.3 6-4 9c-2.7-3-4-6-4-9s1.3-6 4-9z"/></Icon>
