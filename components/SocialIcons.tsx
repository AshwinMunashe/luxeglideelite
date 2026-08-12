/* lucide-react ships no brand/social icons (removed for trademark reasons),
   so these are hand-drawn to match its exact stroke conventions —
   24x24 viewBox, currentColor stroke, width 2, round caps/joins —
   so they sit visually identical next to Phone/Mail/MessageCircle etc. */

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} className={className} style={style} {...base}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} className={className} style={style} {...base}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} className={className} style={style} {...base}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function TikTokIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} className={className} style={style} {...base}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c0 3 2.2 5 5 5" />
    </svg>
  );
}

export function YouTubeIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} className={className} style={style} {...base}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
