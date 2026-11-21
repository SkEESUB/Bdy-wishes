/** Tiny hand-drawn style SVG illustration library used all over the scrapbook. */

export function Flower({ size = 28, petal = "#F9C8D9", center = "#FFE9B8", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={style} className={className} aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="16" cy="8.5" rx="5" ry="7.5" fill={petal} transform={`rotate(${a} 16 16)`} />
      ))}
      <circle cx="16" cy="16" r="5" fill={center} />
      <circle cx="16" cy="16" r="2" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export function Heart({ size = 22, color = "#E48BB0", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path
        d="M12 21s-7.5-4.7-9.3-9.2C1.2 8.1 3.4 4.6 7 4.6c2.1 0 3.7 1.2 5 3 1.3-1.8 2.9-3 5-3 3.6 0 5.8 3.5 4.3 7.2C19.5 16.3 12 21 12 21z"
        fill={color}
      />
    </svg>
  );
}

export function Balloon({ size = 40, color = "#BBDFF5", style, className }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 32 44" style={style} className={className} aria-hidden="true">
      <ellipse cx="16" cy="14" rx="12" ry="14" fill={color} />
      <ellipse cx="12" cy="10" rx="3.4" ry="4.6" fill="#fff" opacity="0.55" />
      <path d="M16 28c-1.6 1.8-1.6 3 0 4 1.6-1 1.6-2.2 0-4z" fill={color} />
      <path d="M16 32c-2 5 2 8-1 12" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Star({ size = 20, color = "#FFE9B8", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path
        d="M12 2.5l2.6 6.1 6.6.5-5 4.3 1.6 6.4L12 16.4 6.2 19.8l1.6-6.4-5-4.3 6.6-.5z"
        fill={color}
      />
    </svg>
  );
}

export function Sparkle({ size = 16, color = "#fff", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path d="M12 1l2 8.2L22 12l-8 2.8L12 23l-2-8.2L2 12l8-2.8z" fill={color} opacity="0.85" />
    </svg>
  );
}

export function Sun({ size = 40, style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={style} className={className} aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="23" y="2" width="2.4" height="8" rx="1.2" fill="#FFE9B8" transform={`rotate(${i * 30} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="11" fill="#FFDD86" />
      <circle cx="24" cy="24" r="8" fill="#FFF3C4" />
    </svg>
  );
}

export function Butterfly({ size = 26, color = "#DCD4F2", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={style} className={className} aria-hidden="true">
      <ellipse cx="9" cy="13" rx="7" ry="9" fill={color} transform="rotate(-16 9 13)" />
      <ellipse cx="23" cy="13" rx="7" ry="9" fill={color} transform="rotate(16 23 13)" />
      <ellipse cx="11" cy="23" rx="4.5" ry="5.5" fill={color} opacity="0.75" transform="rotate(-24 11 23)" />
      <ellipse cx="21" cy="23" rx="4.5" ry="5.5" fill={color} opacity="0.75" transform="rotate(24 21 23)" />
      <rect x="15" y="8" width="2" height="18" rx="1" fill="#4A5A6A" opacity="0.45" />
      <path d="M15 9c-2-3-4-4-6-4M17 9c2-3 4-4 6-4" stroke="#4A5A6A" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

export function Bow({ size = 34, color = "#F9C8D9", style, className }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 44 32" style={style} className={className} aria-hidden="true">
      <path d="M22 16C14 6 4 6 4 14s8 10 18 2z" fill={color} />
      <path d="M22 16c8-10 18-10 18-2s-8 10-18 2z" fill={color} />
      <path d="M22 16c-4 6-6 9-7 13M22 16c4 6 6 9 7 13" stroke={color} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="15" r="4.2" fill="#fff" opacity="0.45" />
    </svg>
  );
}

export function Leaf({ size = 22, color = "#C9EBDD", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path d="M4 20C4 9 12 3 21 3c0 9-6 17-17 17z" fill={color} />
      <path d="M6 19C9 14 13 10 19 6" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.6" />
    </svg>
  );
}

export function Cupcake({ size = 34, style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={style} className={className} aria-hidden="true">
      <path d="M20 4c6 0 9 4 8.5 8.5H11.5C11 8 14 4 20 4z" fill="#F9C8D9" />
      <path d="M8 16h24l-3 9H11z" fill="#FFF7EC" stroke="#E48BB0" strokeWidth="1" />
      <path d="M12 25h16l-3 11H15z" fill="#DCD4F2" />
      <circle cx="20" cy="8" r="2.4" fill="#E48BB0" />
    </svg>
  );
}

export function Cloud({ size = 54, color = "#fff", style, className }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 64 40" style={style} className={className} aria-hidden="true">
      <path
        d="M16 34h30c8 0 12-5 12-11s-5-11-12-11c-2-7-9-11-16-9S19 8 19 8c-7 0-12 5-12 11s5 15 9 15z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

export function DoodleHeart({ size = 60, color = "#E48BB0", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style} className={className} aria-hidden="true">
      <path
        d="M32 54C20 46 8 38 6 26 4 15 12 8 20 10c6 1 10 6 12 10 2-4 6-9 12-10 8-2 16 5 14 16-2 12-14 20-26 28z"
        fill={color}
        opacity="0.25"
      />
      <path
        d="M32 54C20 46 8 38 6 26 4 15 12 8 20 10c6 1 10 6 12 10 2-4 6-9 12-10 8-2 16 5 14 16-2 12-14 20-26 28z"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StickFriend({ size = 60, color = "#4A5A6A", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style} className={className} aria-hidden="true">
      <circle cx="30" cy="16" r="9" fill="none" stroke={color} strokeWidth="2.4" />
      <path d="M30 25v20M30 32l-10 6M30 32l10-6M30 45l-8 13M30 45l9 12" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="27" cy="15" r="1.4" fill={color} />
      <circle cx="33" cy="15" r="1.4" fill={color} />
      <path d="M27 19c2 2 4 2 6 0" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Note({ size = 20, color = "#E48BB0", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className} aria-hidden="true">
      <path d="M9 18.5a2.5 2.5 0 1 1-2-2.45V6.2l10-2.2v10.2a2.6 2.6 0 1 1-2-2.45V6.6L9 8.4z" fill={color} />
    </svg>
  );
}

export function VinylLabel({ size = 40, color = "#F9C8D9", style, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={style} className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill={color} />
      <circle cx="20" cy="20" r="5" fill="#FFF7EC" />
      <circle cx="20" cy="20" r="2" fill="#4A5A6A" />
    </svg>
  );
}

/** A decorative flourish used under section headings. */
export function Flourish({ className = "", color = "#6FA8D6" }) {
  return (
    <svg viewBox="0 0 220 20" className={className} aria-hidden="true" height="18" fill="none">
      <path d="M4 10h70" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M146 10h70" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M110 3c6 4 6 10 0 14-6-4-6-10 0-14z" fill={color} opacity="0.75" />
      <circle cx="88" cy="10" r="3" fill={color} opacity="0.5" />
      <circle cx="132" cy="10" r="3" fill={color} opacity="0.5" />
    </svg>
  );
}

export const PALETTES = {
  blue: { bg: "#DCEEFB", edge: "#6FA8D6", accent: "#8EC3E6" },
  pink: { bg: "#FDE7F0", edge: "#E48BB0", accent: "#F9C8D9" },
  lavender: { bg: "#EFEAFF", edge: "#A48FD0", accent: "#DCD4F2" },
  mint: { bg: "#E4F7EF", edge: "#6FBFA0", accent: "#C9EBDD" },
  butter: { bg: "#FFF6DF", edge: "#D9A94B", accent: "#FFE9B8" },
};

export default { Flower, Heart, Balloon, Star, Sparkle, Butterfly, Bow, Leaf, Cupcake, Cloud, DoodleHeart, StickFriend, VinylLabel, Flourish, PALETTES };
