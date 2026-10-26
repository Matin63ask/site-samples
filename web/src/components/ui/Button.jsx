import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const base =
  'group inline-flex min-h-[46px] items-center justify-center gap-2 font-semibold transition-all duration-300 ease-organic disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-forest text-ivory hover:bg-forest-600 hover:shadow-lift',
  leaf: 'bg-leaf text-white hover:bg-leaf-500 hover:shadow-lift',
  dark: 'bg-soil text-ivory hover:bg-soil-700',
  outline: 'border border-soil/25 text-soil hover:border-forest hover:text-forest',
  outlineLight: 'border border-ivory/35 text-ivory hover:border-sage hover:bg-ivory/5 hover:text-sage',
  quiet: 'text-forest hover:text-leaf',
}

const sizes = {
  sm: 'px-4 py-2 text-[14px]',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-[18px] text-[16px]',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowLeft
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-organic group-hover:-translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}
