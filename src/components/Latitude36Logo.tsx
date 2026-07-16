interface Latitude36LogoProps {
  size?: number;
  className?: string;
}

export default function Latitude36Logo({ size = 24, className }: Latitude36LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Globe outline */}
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" />
      {/* Latitude lines */}
      <path d="M4.4 11h23.2" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <path d="M3 16h26" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.4 21h23.2" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      {/* Meridian ellipse */}
      <ellipse cx="16" cy="16" rx="6" ry="13" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      {/* 36th parallel marker */}
      <circle cx="22.5" cy="11" r="2.4" fill="currentColor" />
    </svg>
  );
}
