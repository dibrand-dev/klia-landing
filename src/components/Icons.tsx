import React from 'react';

interface IconProps {
  size?: number;
  stroke?: number;
  className?: string;
  style?: React.CSSProperties;
}
const Ico = ({ children, size = 22, stroke = 1.6, ...rest }: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
    {...rest}
  >{children}</svg>
);

export const Icons = {
  Arrow:    (p: IconProps) => <Ico {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Ico>,
  Check:    (p: IconProps) => <Ico {...p}><path d="M5 12.5l4 4 10-10"/></Ico>,
  Calendar: (p: IconProps) => <Ico {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="14.5" r="1.2" fill="currentColor" stroke="none"/></Ico>,
  Doc:      (p: IconProps) => <Ico {...p}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h6M10 16h4"/></Ico>,
  Brain:    (p: IconProps) => <Ico {...p}><path d="M9 5a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8c0 1.2.7 2.2 1.8 2.7A3 3 0 0 0 9 18a3 3 0 0 0 3-1.5"/><path d="M15 5a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8c0 1.2-.7 2.2-1.8 2.7A3 3 0 0 1 15 18a3 3 0 0 1-3-1.5"/><path d="M12 5v13"/></Ico>,
  Mic:      (p: IconProps) => <Ico {...p}><path d="M12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M4 14a8.27 8.27 0 0 0 16 0"/><line x1="12" y1="22" x2="12" y2="18"/></Ico>,
  Wallet:   (p: IconProps) => <Ico {...p}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none"/></Ico>,
  Bell:     (p: IconProps) => <Ico {...p}><path d="M6 10a6 6 0 0 1 12 0c0 4 2 5 2 5H4s2-1 2-5z"/><path d="M10 19.5a2 2 0 0 0 4 0"/></Ico>,
  Receipt:  (p: IconProps) => <Ico {...p}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></Ico>,
  Card:     (p: IconProps) => <Ico {...p}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><path d="M7 15h3"/></Ico>,
  Link:     (p: IconProps) => <Ico {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Ico>,
  Folder:   (p: IconProps) => <Ico {...p}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></Ico>,
  Coins:    (p: IconProps) => <Ico {...p}><circle cx="8.5" cy="14" r="5"/><path d="M17 9c1.7.3 3 1.7 3 3.5 0 1-.5 1.9-1.2 2.5"/><path d="M20.5 6C21.4 6.7 22 7.8 22 9c0 1.3-.8 2.5-2 3"/></Ico>,
  Video:    (p: IconProps) => <Ico {...p}><polygon points="15 10 21 7 21 17 15 14"/><rect x="1" y="7" width="14" height="11" rx="2"/></Ico>,
  Mail:     (p: IconProps) => <Ico {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,7 12,13 22,7"/></Ico>,
  Globe:    (p: IconProps) => <Ico {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.7 3 4 6 4 9s-1.3 6-4 9c-2.7-3-4-6-4-9s1.3-6 4-9z"/></Ico>,
  Shield:   (p: IconProps) => <Ico {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2.2 2.2L15 10.5"/></Ico>,
  Sun:      (p: IconProps) => <Ico {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></Ico>,
  Moon:     (p: IconProps) => <Ico {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></Ico>,
  Stethoscope: (p: IconProps) => <Ico {...p}><path d="M5 4v6a4 4 0 0 0 8 0V4"/><path d="M5 4H3M13 4h2"/><path d="M9 14v2.5a4 4 0 0 0 8 0v-1.2"/><circle cx="17" cy="13.5" r="1.8"/></Ico>,
  X:        (p: IconProps) => <Ico {...p}><path d="M6 6l12 12M18 6L6 18"/></Ico>,
  Menu:     (p: IconProps) => <Ico {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Ico>,
};

export type IconName = keyof typeof Icons;
