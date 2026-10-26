import { Droplets, Sprout, Layers, ArrowLeft, Leaf } from 'lucide-react'
import { company } from '../data/company.js'
import { activities } from '../data/activities.js'
import usePageMeta from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SoilEdge from '../components/ui/SoilEdge.jsx'

const pillars = [
  {
    icon: Droplets,
    title: 'آب',
    text: 'طراحی و اجرای سیستم‌های آبیاری تحت فشار با هدف توزیع یکنواخت و کاهش هدررفت آب در مزرعه و گلخانه.',
  },
  {
    icon: Layers,
    title: 'خاک',
    text: 'اصلاح ساختمان خاک، بهبود ماده‌ی آلی و مدیریت شوری برای فراهم‌کردن محیط مناسب رشد ریشه.',
  },
  {
    icon: Sprout,
    title: 'گیاه',
    text: 'برنامه‌ی تغذیه و سلامت گیاه بر پایه‌ی آزمون خاک و آب و پایش وضعیت رشد در طول فصل.',
  },
]

export default function AboutPage() {
  usePageMeta({
    title: 'درباره پایا پویش سبز | آب، خاک و گیاه',
    description:
      'معرفی پایا پویش سبز؛ شرکت فعال در حوزه آبیاری تحت فشار، تجهیزات کشاورزی، اصلاح خاک و تغذیه گیاهان با تمرکز بر کشاورزی پایدار.',
    path: '/about',
  })

  return (
    <>
      <PageHero
        eyebrow="درباره ما"
        title="درباره پایا پویش سبز"
        intro="مجموعه‌ای فعال در حوزه‌ی کشاورزی که کار خود را بر سه پایه‌ی آب، خاک و تغذیه‌ی گیاه بنا کرده است."
        image="/images/greenhouse-team.webp"
        breadcrumb={[{ label: 'درباره ما' }]}
      />

      <section className="paper-texture py-20 lg:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              eyebrow="معرفی"
              title="یک همراه فنی در مسیر تولید"
              intro="پایا پویش سبز فعالیت خود را با هدف ارائه‌ی راهکارهای تخصصی در حوزه‌ی کشاورزی آغاز کرد و امروز در زمینه‌ی آبیاری تحت فشار، تجهیزات و لوازم آبیاری، تغذیه‌ی گیاهان و اصلاح خاک خدمات ارائه می‌دهد."
            />
            <div className="prose-fa mt-8 space-y-5 text-[17px] leading-[1.95] text-soil/75">
              <p>
                تجربه‌ی کار میدانی نشان داده است که بیشتر مشکلات تولید، ریشه در سه موضوع دارد:
                مدیریت آب، وضعیت خاک و برنامه‌ی تغذیه. به همین دلیل فعالیت‌های این مجموعه حول همین
                سه محور سازمان یافته است و توصیه‌های فنی، بر پایه‌ی بررسی شرایط واقعی هر زمین ارائه
                می‌شود.
              </p>
              <p>
                در این مسیر، از انتخاب و تأمین تجهیزات تا اجرای شبکه‌ی آبیاری و تنظیم برنامه‌ی
                تغذیه، تلاش می‌کنیم تصمیم‌ها بر اساس داده‌های قابل اندازه‌گیری گرفته شوند: کیفیت منبع
                آب، ویژگی‌های خاک و نیاز گیاه در هر مرحله از رشد.
              </p>
              <p>
                باور ما این است که کشاورزی پایدار، نتیجه‌ی مصرف کمتر و دقیق‌تر است؛ نه تولید بیشتر با
                فشار بر منابع. این نگاه، هم هزینه‌ی تولید را کاهش می‌دهد و هم توان زمین را برای
                فصل‌های بعد حفظ می‌کند.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="overflow-hidden">
              <img
                src="/images/field-specialist.webp"
                alt="کارشناس کشاورزی در حال بازدید از مزرعه"
                width="1280"
                height="854"
                loading="lazy"
                decoding="async"
                className="h-[420px] w-full object-cover"
              />
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-soil/10 pt-8">
              <div>
                <dt className="text-[13px] text-soil/55">حوزه‌ی فعالیت</dt>
                <dd className="mt-2 text-[16px] font-semibold text-soil">
                  آبیاری، تغذیه گیاه، خاک
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-soil/55">فعالیت از سال</dt>
                <dd className="mt-2 text-[16px] font-semibold text-soil">{company.foundedYear}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-soil/55">خدمات</dt>
                <dd className="mt-2 text-[16px] font-semibold text-soil">
                  طراحی، اجرا، تأمین، مشاوره
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-soil/55">شماره تماس</dt>
                <dd className="mt-2 text-[16px] font-semibold text-soil" dir="ltr">
                  {company.phones[0].display}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <SoilEdge position="static" topFill="#F5F0E5" fill="#24421F" crumb="#1A1612" className="h-12 md:h-20" />
        <div className="soil-surface grain-overlay bg-forest-900 py-20 text-ivory lg:py-24">
          <div className="shell">
            <Reveal>
              <SectionHeading
                align="center"
                tone="light"
                eyebrow="رویکرد ما"
                title="سه ریشه‌ای که روی آن کار می‌کنیم"
              />
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 80}>
                  <span className="mb-6 flex h-14 w-14 items-center justify-center border border-sage/25 text-sage">
                    <pillar.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-[22px] font-extrabold text-ivory">{pillar.title}</h3>
                  <p className="prose-fa mt-4 text-[16px] leading-[1.95] text-ivory/70">
                    {pillar.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <SoilEdge position="static" topFill="#24421F" fill="#F5F0E5" crumb="#1A1612" className="h-12 md:h-20" />
      </section>

      <section className="paper-texture py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="خدمات"
              title="آنچه برای شما انجام می‌دهیم"
              intro="خدمات این مجموعه در شش حوزه‌ی اصلی و به‌صورت یکپارچه ارائه می‌شود."
            />
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <li key={activity.slug} className="flex items-start gap-3 text-[16px] text-soil/80">
                <Leaf className="mt-1 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                {activity.title}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button to="/activities" variant="outline" size="md">
              فعالیت‌های شرکت
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/collaboration" variant="primary" size="md">
              درخواست مشاوره تخصصی
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
