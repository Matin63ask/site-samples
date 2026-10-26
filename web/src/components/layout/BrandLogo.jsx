import { company } from '../../data/company.js'

export function LeafMark({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="نشان پایا پویش سبز">
      <path
        d="M24 43V21"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path d="M24 31c-9.4 0-15.6-4.9-15.6-13.6C17.8 17.4 24 22.3 24 31Z" fill="#669A45" />
      <path d="M24 26c0-9.6 5.9-15.9 15.6-15.9C39.6 19.8 33.7 26 24 26Z" fill="#8FBB5C" />
      <path
        d="M24 43c-2.6 3.2-6.4 4.6-9.8 3.9M24 43c2.6 3.2 6.4 4.6 9.8 3.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
    </svg>
  )
}

export default function BrandLogo({ className = '', tone = 'light', withTagline = true }) {
  const isLight = tone === 'light'
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LeafMark className={`h-11 w-11 shrink-0 ${isLight ? 'text-sage' : 'text-forest'}`} />
      <span className="flex flex-col leading-tight">
        <span
          className={`text-[20px] font-extrabold tracking-tight ${isLight ? 'text-ivory' : 'text-soil'}`}
        >
          {company.name}
        </span>
        {withTagline && (
          <span
            className={`mt-0.5 hidden text-[11px] tracking-[0.16em] sm:block ${
              isLight ? 'text-ivory/60' : 'text-soil/55'
            }`}
          >
            PAYA POOYESH SABZ
          </span>
        )}
      </span>
    </span>
  )
}
