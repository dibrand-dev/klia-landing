type IconProps = { size?: number }

const Ico = ({ children, size = 22 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

export const IconBowl = ({ size }: IconProps) => (
  <Ico size={size}><path d="M4 11h16a8 8 0 0 1-16 0z" /><path d="M8 7c0-1.5 1-2 1-3M12 7c0-1.5 1-2 1-3M16 7c0-1.5 1-2 1-3" /></Ico>
)

export const IconChart = ({ size }: IconProps) => (
  <Ico size={size}><path d="M4 20V4M4 20h16" /><path d="M8 15l4-4 3 3 5-6" /></Ico>
)

export const IconShare = ({ size }: IconProps) => (
  <Ico size={size}><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" /></Ico>
)

export const IconCalendarGreen = ({ size }: IconProps) => (
  <Ico size={size}><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M4 10h16M9 3v4M15 3v4" /></Ico>
)

export const IconWallet = ({ size }: IconProps) => (
  <Ico size={size}><path d="M4 7a2 2 0 0 1 2-2h11v4" /><rect x="4" y="7" width="16" height="12" rx="3" /><circle cx="16" cy="13" r="1" /></Ico>
)

export const IconMic = ({ size }: IconProps) => (
  <Ico size={size}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Ico>
)

export const IconSparkle = ({ size }: IconProps) => (
  <Ico size={size}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></Ico>
)

export const IconReceipt = ({ size }: IconProps) => (
  <Ico size={size}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></Ico>
)

export const IconCheckSmall = ({ size = 13 }: IconProps) => (
  <Ico size={size}><path d="M5 12.5l4.5 4.5L19 7.5" /></Ico>
)

export const IconSearch = ({ size = 18 }: IconProps) => (
  <Ico size={size}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></Ico>
)
