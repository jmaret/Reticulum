import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  href?: string;
};

export function Logo({ compact = false, href = "/" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex min-w-0 items-center gap-2.5 no-underline" aria-label="Reticulum home">
      <svg
        viewBox="0 0 36 36"
        width="36"
        height="36"
        aria-hidden="true"
        className="size-8 shrink-0 rounded-full ring-1 ring-[var(--line)] sm:size-9"
      >
        <circle cx="18" cy="18" r="17" fill="#E6CA98" stroke="#B89260" strokeWidth="1" />
        <path
          d="M18 8 L26 18 L18 28 L10 18 Z"
          fill="none"
          stroke="#0F4C5C"
          strokeWidth="1.3"
        />
        <path d="M10 18 H26 M18 8 V28" fill="none" stroke="#0F4C5C" strokeWidth="1.1" />
        <circle cx="18" cy="8" r="1.35" fill="#0F4C5C" />
        <circle cx="26" cy="18" r="1.35" fill="#0F4C5C" />
        <circle cx="18" cy="28" r="1.35" fill="#0F4C5C" />
        <circle cx="10" cy="18" r="1.35" fill="#0F4C5C" />
        <circle cx="18" cy="18" r="1.15" fill="#0F4C5C" />
      </svg>
      {!compact && (
        <span className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--ink)] sm:text-2xl">
          Reticulum
        </span>
      )}
    </Link>
  );
}
