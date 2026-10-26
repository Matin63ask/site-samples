import { Link } from 'react-router-dom'
import { ArrowLeft, Sprout } from 'lucide-react'
import { navigation } from '../data/company.js'
import usePageMeta from '../hooks/usePageMeta.js'
import Button from '../components/ui/Button.jsx'
import SoilEdge from '../components/ui/SoilEdge.jsx'

export default function NotFoundPage() {
  usePageMeta({
    title: 'صفحه پیدا نشد | پایا پویش سبز',
    description: 'نشانی وارد شده در پایا پویش سبز وجود ندارد.',
    path: null,
  })

  return (
    <section className="soil-surface grain-overlay relative flex min-h-[100svh] items-center overflow-hidden bg-soil text-ivory">
      <img
        src="/images/roots-earth.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        loading="eager"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-soil via-soil/85 to-soil/60"
        aria-hidden="true"
      />

      <div className="shell relative py-32">
        <p className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.18em] text-sage">
          <span className="h-px w-8 bg-sage/60" aria-hidden="true" />
          خطای ۴۰۴
        </p>
        <h1 className="mt-6 max-w-2xl text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.2]">
          این مسیر به جایی نمی‌رسد
        </h1>
        <p className="prose-fa mt-6 max-w-xl text-[17px] leading-[1.9] text-ivory/75">
          صفحه‌ای که به دنبال آن هستید پیدا نشد؛ ممکن است نشانی تغییر کرده باشد. از مسیرهای زیر
          ادامه دهید.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/" variant="leaf" size="lg">
            بازگشت به صفحه اصلی
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button to="/products" variant="outlineLight" size="lg">
            مشاهده محصولات
          </Button>
        </div>

        <nav aria-label="مسیرهای جایگزین" className="mt-14 border-t border-ivory/15 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-sage"
                >
                  <Sprout className="h-3.5 w-3.5 text-sage" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
