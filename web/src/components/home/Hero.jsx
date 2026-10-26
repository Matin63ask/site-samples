import { useEffect, useRef } from 'react'
import { ArrowLeft, Sprout } from 'lucide-react'
import { company } from '../../data/company.js'
import Button from '../ui/Button.jsx'
import SoilEdge from '../ui/SoilEdge.jsx'

/**
 * "Sub-surface" hero: a macro soil surface with roots and a living shoot,
 * composed so the section reads as earth opening up rather than a banner image.
 */
export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        section.style.setProperty('--sy', `${Math.min(window.scrollY, 900)}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="grain-overlay relative isolate flex min-h-[92svh] items-center overflow-hidden bg-soil"
      aria-labelledby="hero-heading"
    >
      {/* macro soil surface */}
      <img
        src="/images/hero-soil.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        style={{ transform: 'translate3d(0, calc(var(--sy, 0px) * 0.12), 0) scale(1.05)' }}
      />

      {/* exposed roots — lower left */}
      <img
        src="/images/roots-brown.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="mask-soft-bottom absolute -left-[6%] bottom-0 -z-20 w-[62%] max-w-[620px] opacity-70 mix-blend-luminosity sm:w-[48%]"
        style={{ transform: 'translate3d(0, calc(var(--sy, 0px) * -0.06), 0)' }}
      />

      {/* living shoot — lower right */}
      <img
        src="/images/plant-soil.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="mask-soft-bottom absolute -right-[2%] bottom-0 -z-20 hidden w-[26%] max-w-[330px] opacity-85 sm:block"
        style={{ transform: 'translate3d(0, calc(var(--sy, 0px) * -0.03), 0)' }}
      />

      {/* legibility scrims */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-soil/90 via-soil/60 to-soil/95"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(26,22,18,0.15)_0%,rgba(26,22,18,0.72)_78%)]"
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex flex-col items-center pb-[20svh] pt-36 text-center sm:pb-[24svh] lg:pt-44">
        <p className="animate-fade-up mb-6 flex items-center gap-3 text-[13px] font-semibold tracking-[0.2em] text-sage">
          <Sprout className="h-4 w-4" aria-hidden="true" />
          {company.tagline}
        </p>

        <h1 id="hero-heading" className="max-w-4xl">
          <span className="block text-[clamp(2.6rem,7.5vw,5rem)] font-black leading-[1.06] text-ivory">
            {company.name}
          </span>
          <span className="mt-5 block text-[clamp(1.25rem,3.4vw,2.15rem)] font-bold leading-[1.4] text-sage">
            {company.headline}
          </span>
        </h1>

        <p className="prose-fa mt-7 max-w-2xl text-[17px] leading-[1.95] text-ivory/75 sm:text-[18px]">
          {company.lead}
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
          <Button
            to="/products"
            variant="leaf"
            size="lg"
            withArrow
            className="w-full sm:w-auto"
            aria-label="مشاهده محصولات"
          >
            مشاهده محصولات
          </Button>
          <Button
            to="/collaboration"
            variant="outlineLight"
            size="lg"
            className="w-full sm:w-auto"
            aria-label="دریافت مشاوره تخصصی"
          >
            دریافت مشاوره تخصصی
          </Button>
        </div>

        <a
          href="#about"
          className="mt-14 hidden items-center gap-2 text-[13px] text-ivory/55 transition-colors hover:text-sage lg:flex"
        >
          <ArrowLeft className="h-4 w-4 rotate-90" aria-hidden="true" />
          بیشتر بدانید
        </a>
      </div>

      <SoilEdge
        position="absolute-bottom"
        topFill="#1A1612"
        fill="#F5F0E5"
        crumb="#120F0C"
        className="h-14 md:h-24"
      />
    </section>
  )
}
