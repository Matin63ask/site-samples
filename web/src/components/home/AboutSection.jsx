import { Leaf, ArrowLeft } from 'lucide-react'
import { company } from '../../data/company.js'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const focusAreas = [
  'راهکارهای تخصصی کشاورزی',
  'تجهیزات و لوازم آبیاری',
  'اصلاح و بهبود خاک',
  'تغذیه و سلامت گیاه',
  'مشاوره تخصصی مزرعه و باغ',
  'فناوری‌های نوین کشاورزی',
]

export default function AboutSection() {
  return (
    <section id="about" className="paper-texture relative overflow-hidden py-20 lg:py-28">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* visual evidence */}
          <Reveal className="relative lg:col-span-6">
            <div className="relative">
              <div className="overflow-hidden">
                <img
                  src="/images/greenhouse-tomato.webp"
                  alt="پرورش گیاهان در گلخانه با سیستم کشت مدرن"
                  width="1280"
                  height="855"
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover transition-transform duration-[1200ms] ease-organic hover:scale-[1.04] sm:h-[520px]"
                />
              </div>
              <div className="absolute -bottom-8 left-0 hidden w-44 overflow-hidden border-4 border-ivory shadow-lift sm:block lg:-left-8 lg:w-52">
                <img
                  src="/images/soil-hand.webp"
                  alt="بررسی بافت خاک در دست کارشناس کشاورزی"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="h-32 w-full object-cover lg:h-36"
                />
              </div>
              <div className="absolute -top-5 right-0 bg-forest px-5 py-3 text-[13px] font-semibold text-ivory shadow-card">
                فعالیت حرفه‌ای از سال {company.foundedYear}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                eyebrow="درباره ما"
                title="درباره پایا پویش سبز"
                intro="پایا پویش سبز با تمرکز بر سه پایه‌ی اصلی کشاورزی پایدار — آب، خاک و تغذیه‌ی گیاه — فعالیت خود را در حوزه‌ی آبیاری تحت فشار، تجهیزات کشاورزی و مشاوره‌ی تخصصی آغاز کرد و امروز این مسیر را با تکیه بر تجربه‌ی کارشناسی و دانش فنی ادامه می‌دهد."
              />
            </Reveal>

            <Reveal delay={120}>
              <p className="prose-fa mt-6 text-[17px] leading-[1.95] text-soil/75">
                تمرکز ما بر انتخاب راهکار متناسب با شرایط واقعی هر زمین است؛ از بررسی منبع آب و
                بافت خاک تا انتخاب سیستم آبیاری، تجهیزات و برنامه‌ی تغذیه. این نگاه، مصرف آب و
                نهاده‌ها را کاهش می‌دهد و بهره‌وری را در بلندمدت افزایش می‌دهد.
              </p>

              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {focusAreas.map((area) => (
                  <li key={area} className="flex items-start gap-3 text-[16px] text-soil/80">
                    <Leaf className="mt-1 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button to="/about" variant="outline" size="md">
                  بیشتر درباره ما
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
