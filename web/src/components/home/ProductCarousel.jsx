import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowLeft, MessageSquare } from 'lucide-react'
import { products, categoryName } from '../../data/products.js'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const CARD_STEP = 340

export default function ProductCarousel() {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const featured = products

  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    const position = Math.abs(track.scrollLeft)
    setEdges({ start: position <= 4, end: position >= max - 4 })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    syncEdges()
    track.addEventListener('scroll', syncEdges, { passive: true })
    window.addEventListener('resize', syncEdges)
    return () => {
      track.removeEventListener('scroll', syncEdges)
      window.removeEventListener('resize', syncEdges)
    }
  }, [syncEdges])

  const scrollBy = (direction) => {
    const track = trackRef.current
    if (!track) return
    // RTL: the track starts at the right edge, so moving forward scrolls negatively.
    track.scrollBy({ left: direction * CARD_STEP, behavior: 'smooth' })
  }

  return (
    <section className="paper-texture relative overflow-hidden py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="محصولات"
              title="محصولات پایا پویش سبز"
              intro="تجهیزات آبیاری، لوله و اتصالات، کود و بستر کشت — انتخاب‌شده برای شرایط واقعی مزرعه، باغ و گلخانه."
            />
          </Reveal>

          <Reveal delay={100} className="flex items-center gap-3">
            <Button to="/products" variant="outline" size="md" className="shrink-0">
              همه محصولات
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={edges.end}
                aria-label="محصولات بعدی"
                className="flex h-12 w-12 items-center justify-center border border-soil/20 text-soil transition-colors duration-300 hover:border-forest hover:text-forest disabled:opacity-35"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={edges.start}
                aria-label="محصولات قبلی"
                className="flex h-12 w-12 items-center justify-center border border-soil/20 text-soil transition-colors duration-300 hover:border-forest hover:text-forest disabled:opacity-35"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="گردونه محصولات"
        tabIndex={0}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 sm:px-8 lg:px-10"
      >
        {featured.map((product) => (
          <article
            key={product.slug}
            className="group w-[280px] shrink-0 snap-start border border-soil/10 bg-ivory-50 shadow-card transition-all duration-500 ease-organic hover:-translate-y-1 hover:border-leaf/50 hover:shadow-lift sm:w-[320px]"
          >
            <Link to={`/products/${product.slug}`} className="block overflow-hidden" tabIndex={-1}>
              <img
                src={product.image}
                alt={product.title}
                width="1280"
                height="855"
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.06]"
              />
            </Link>
            <div className="flex h-[calc(100%-12rem)] flex-col p-6">
              <p className="mb-3 text-[12px] font-semibold tracking-[0.16em] text-forest">
                {categoryName(product.category)}
              </p>
              <h3 className="text-[19px] font-bold leading-[1.5] text-soil">
                <Link to={`/products/${product.slug}`} className="transition-colors hover:text-forest">
                  {product.title}
                </Link>
              </h3>
              <p className="prose-fa mt-3 flex-1 text-[15px] leading-[1.85] text-soil/70">
                {product.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-soil/10 pt-5">
                <Link
                  to={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-forest transition-colors hover:text-leaf"
                >
                  مشاهده محصول
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to={`/collaboration?subject=${encodeURIComponent(`مشاوره درباره ${product.title}`)}`}
                  className="inline-flex items-center gap-1.5 text-[13px] text-soil/60 transition-colors hover:text-forest"
                  aria-label={`درخواست مشاوره درباره ${product.title}`}
                >
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  مشاوره
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="shell mt-2 text-[13px] text-soil/45 lg:hidden">
        برای دیدن محصولات بیشتر، کارت‌ها را به کنار بکشید.
      </p>
    </section>
  )
}
