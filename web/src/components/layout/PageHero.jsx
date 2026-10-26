import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import SoilEdge from '../ui/SoilEdge.jsx'

/**
 * Dark soil band that opens every inner page, so the transparent header always
 * sits on the same organic surface as the hero.
 */
export default function PageHero({ eyebrow, title, intro, image, breadcrumb = [] }) {
  return (
    <section className="grain-overlay relative isolate flex min-h-[52svh] items-end overflow-hidden pb-24 pt-40 sm:min-h-[46svh] lg:pt-48">
      <div className="absolute inset-0 -z-10 bg-soil" aria-hidden="true" />
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      )}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-soil via-soil/80 to-soil/55"
        aria-hidden="true"
      />

      <div className="shell relative">
        <nav aria-label="مسیر صفحه" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ivory/60">
            <li>
              <Link to="/" className="transition-colors hover:text-sage">
                صفحه اصلی
              </Link>
            </li>
            {breadcrumb.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-2">
                <ChevronLeft className="h-3.5 w-3.5 text-ivory/35" aria-hidden="true" />
                {crumb.href ? (
                  <Link to={crumb.href} className="transition-colors hover:text-sage">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ivory/85">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && (
          <p className="mb-4 flex items-center gap-3 text-[13px] font-semibold tracking-[0.18em] text-sage">
            <span className="h-px w-8 bg-sage/60" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.15] text-ivory">
          {title}
        </h1>
        {intro && (
          <p className="prose-fa mt-6 max-w-2xl text-[17px] leading-[1.9] text-ivory/75">{intro}</p>
        )}
      </div>

      <SoilEdge
        position="absolute-bottom"
        topFill="#1A1612"
        fill="#F5F0E5"
        crumb="#120F0C"
        className="h-12 md:h-20"
      />
    </section>
  )
}
