export const DoorIcon = ({
  width = 20,
  height = 20,
  color = 'var(--color-text)'
}: { width?: number; height?: number; color?: string }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img"
  >
    <rect x="3" y="2" width="18" height="20" rx="2" ry="2" />
    <path d="M9 22v-6h6v6" />
    <circle cx="15" cy="12" r="1" />
  </svg>
);