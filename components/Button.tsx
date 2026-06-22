import Link from "next/link";
import { clsx } from "clsx";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline-light" | "outline-dark" | "outline-gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const variants = {
  primary: "bg-teal text-white hover:bg-teal-dark shadow-md hover:shadow-lg",
  secondary: "bg-navy text-white hover:bg-navy-dark shadow-md hover:shadow-lg",
  "outline-light": "border-2 border-white/60 text-white hover:bg-white/10 hover:border-white",
  "outline-dark": "border-2 border-navy/30 text-navy hover:border-teal hover:text-teal",
  "outline-gold": "border-2 border-gold/60 text-gold hover:bg-gold/10 hover:border-gold",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const cls = clsx(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className,
  );

  if (href) {
    return <Link href={href} className={cls} onClick={onClick}>{children}</Link>;
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
