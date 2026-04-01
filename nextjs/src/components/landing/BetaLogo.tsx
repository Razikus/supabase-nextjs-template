interface BetaLogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function BetaLogo({
  variant = "dark",
  className = "",
}: BetaLogoProps) {
  const textColor =
    variant === "light" ? "text-white" : "text-secondary-900";
  const plusColor = "text-primary-500";

  return (
    <span
      className={`inline-flex items-baseline font-bold text-2xl tracking-tight select-none ${className}`}
    >
      <span className={textColor}>BETA</span>
      <span className={`${plusColor} text-3xl font-extrabold leading-none -ml-0.5`}>
        +
      </span>
    </span>
  );
}
