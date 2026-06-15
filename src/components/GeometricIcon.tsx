type GeometricIconProps = {
  tone?: 'green' | 'pink' | 'yellow' | 'cyan';
  title?: string;
};

const tones = {
  green: {
    front: '#7CFE2D',
    side: '#2F8F16',
    edge: '#D8FFC8',
  },
  pink: {
    front: '#FF2F92',
    side: '#8D1450',
    edge: '#FFD2E8',
  },
  yellow: {
    front: '#F4FF3A',
    side: '#9B8C00',
    edge: '#FFFFC2',
  },
  cyan: {
    front: '#2DE2FF',
    side: '#0D7185',
    edge: '#C9F8FF',
  },
};

export default function GeometricIcon({ tone = 'green', title }: GeometricIconProps) {
  const color = tones[tone];

  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className="h-9 w-9 shrink-0 drop-shadow-[0_0_14px_rgba(124,254,45,0.22)]"
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
    >
      <path d="M14 20 32 9l18 11v22L32 55 14 42V20Z" fill={color.side} />
      <path d="M14 20 32 31l18-11L32 9 14 20Z" fill={color.edge} />
      <path d="M14 20v22l18 13V31L14 20Z" fill={color.front} />
      <path d="M50 20v22L32 55V31l18-11Z" fill={color.side} />
      <path
        d="M14 20 32 9l18 11v22L32 55 14 42V20Z"
        fill="none"
        stroke="#050505"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M14 20 32 31l18-11M32 31v24"
        fill="none"
        stroke="#050505"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
