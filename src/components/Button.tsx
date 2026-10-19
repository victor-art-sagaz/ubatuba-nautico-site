import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'dark' | 'outline-light' | 'outline-dark'
type Size = 'md' | 'lg'

interface StyleProps {
  variant?: Variant
  size?: Size
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-sea-400 text-navy-950 shadow-soft hover:-translate-y-0.5 hover:bg-sea-300',
  dark: 'bg-navy-800 text-white shadow-soft hover:-translate-y-0.5 hover:bg-navy-700',
  'outline-light': 'border border-white/50 text-white hover:bg-white/10',
  'outline-dark': 'border border-navy-300 text-navy-800 hover:bg-navy-50',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

/** Botão de ação (executa uma função). */
export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return (
    <button type="button" className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

/** Link interno (React Router) com aparência de botão. */
export function ButtonLink({ variant, size, className, children, ...rest }: LinkProps & StyleProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}

/** Link externo (nova aba, com rel seguro) ou tel:/mailto: com aparência de botão. */
export function ExternalButtonLink({
  variant,
  size,
  className,
  children,
  href,
  newTab = true,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & { href: string; newTab?: boolean }) {
  return (
    <a
      href={href}
      className={buttonClasses(variant, size, className)}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
