import { Leaf, Droplets, ArrowLeft } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import SoilEdge from '../ui/SoilEdge.jsx'

export default function ConsultingSection() {
  return (
    <section className="relative">
      <SoilEdge position="static" topFill="#F5F0E5" fill="#1A1612" crumb="#2B2318" className="h-12 md:h-20" />

      <div className="soil-surface grain-overlay relative bg-soil py-20 text-ivory lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              align="center"
              tone="light"
              eyebrow="مشاوره تخصصی"
              title="مشاوره تخصصی آبیاری، تغذیه و بیماری گیاهان"
              intro="تصمیم‌های فنی در مزرعه و گلخانه، وقتی بر پایه‌ی داده‌های واقعی گرفته شوند، هم هزینه را کاهش می‌دهند و هم نتیجه‌ی پایدارتری می‌سازند. کارشناسان ما در دو حوزه‌ی اصلی در کنار شما هستند."
            />
          </Reveal>

          {/* Block 1 — plant nutrition: forest panel, image on the left of the text */}
          <Reveal className="mt-16 overflow-hidden border border-sage/15 bg-forest-900 lg:mt-20">
            <div className="grid lg:grid-cols-12">
              <div className="relative order-2 min-h-[300px] lg:order-1 lg:col-span-5">
                <img
                  src="/images/greenhouse-man.webp"
                  alt="کارشناس در حال بررسی سلامت برگ و تغذیه گیاه در گلخانه"
                  width="1280"
                  height="855"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-l from-forest-900/85 via-forest-900/25 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="order-1 p-8 sm:p-12 lg:order-2 lg:col-span-7 lg:p-16">
                <span className="mb-5 flex h-12 w-12 items-center justify-center border border-sage/30 text-sage">
                  <Leaf className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold text-ivory">
                  مشاوره تغذیه گیاهان
                </h3>
                <p className="prose-fa mt-5 max-w-2xl text-[16px] leading-[1.95] text-ivory/75">
                  برنامه‌ی تغذیه بر پایه‌ی آزمون خاک، آب و برگ تنظیم می‌شود و متناسب با مرحله‌ی رشد
                  گیاه اصلاح می‌گردد. هدف، رفع کمبودهای واقعی و کاهش مصرف بی‌مورد کود است.
                </p>
                <ul className="mt-7 grid gap-x-8 gap-y-3 text-[15px] text-ivory/80 sm:grid-cols-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                    تفسیر نتیجه‌ی آزمون خاک و آب
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                    تعیین برنامه‌ی کودی مرحله‌ای
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                    انتخاب کود ماکرو و ریزمغذی
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                    پایش نتیجه و اصلاح در فصل
                  </li>
                </ul>
                <div className="mt-9">
                  <Button
                    to={`/collaboration?subject=${encodeURIComponent('مشاوره تغذیه گیاهان')}`}
                    variant="leaf"
                    size="md"
                  >
                    درخواست مشاوره تغذیه گیاهان
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Block 2 — irrigation: ivory panel, mirrored composition */}
          <Reveal className="mt-10 overflow-hidden border border-soil/10 bg-ivory lg:mt-14">
            <div className="grid lg:grid-cols-12">
              <div className="p-8 text-soil sm:p-12 lg:col-span-7 lg:p-16">
                <span className="mb-5 flex h-12 w-12 items-center justify-center border border-forest/25 text-forest">
                  <Droplets className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold text-soil">
                  مشاوره سیستم‌های آبیاری
                </h3>
                <p className="prose-fa mt-5 max-w-2xl text-[16px] leading-[1.95] text-soil/75">
                  از انتخاب روش آبیاری و طراحی شبکه تا تنظیم دور و عمق آبیاری و رفع ایرادهای
                  سیستم‌های اجراشده؛ مشاوره‌ی ما با هدف افزایش یکنواختی توزیع آب و کاهش هدررفت
                  انجام می‌شود.
                </p>
                <ul className="mt-7 grid gap-x-8 gap-y-3 text-[15px] text-soil/80 sm:grid-cols-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                    ارزیابی منبع آب و کیفیت آن
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                    طراحی شبکه و انتخاب تجهیزات
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                    تنظیم برنامه‌ی دور و عمق آبیاری
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                    بررسی و رفع ایراد سیستم
                  </li>
                </ul>
                <div className="mt-9">
                  <Button
                    to={`/collaboration?subject=${encodeURIComponent('مشاوره سیستم‌های آبیاری')}`}
                    variant="primary"
                    size="md"
                  >
                    درخواست مشاوره آبیاری
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="relative order-first min-h-[280px] lg:order-last lg:col-span-5">
                <img
                  src="/images/sprinkler-farmer.webp"
                  alt="کارشناس آبیاری در حال بررسی و تنظیم سیستم آبیاری در مزرعه"
                  width="1280"
                  height="855"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <SoilEdge position="static" topFill="#1A1612" fill="#F5F0E5" crumb="#2B2318" className="h-12 md:h-20" />
    </section>
  )
}
