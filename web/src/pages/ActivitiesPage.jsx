import { Droplets, Wrench, MessagesSquare, Sprout, Layers, Microscope, Check, ArrowLeft } from 'lucide-react'
import { activities } from '../data/activities.js'
import usePageMeta from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'

const icons = {
  droplets: Droplets,
  wrench: Wrench,
  messages: MessagesSquare,
  sprout: Sprout,
  layers: Layers,
  microscope: Microscope,
}

export default function ActivitiesPage() {
  usePageMeta({
    title: 'فعالیت‌های پایا پویش سبز | از طراحی آبیاری تا اصلاح خاک',
    description:
      'فعالیت‌های پایا پویش سبز: طراحی و اجرای سیستم‌های آبیاری تحت فشار، تأمین تجهیزات، مشاوره تخصصی کشاورزی، تغذیه گیاهان، اصلاح خاک و توسعه روش‌های نوین کشاورزی.',
    path: '/activities',
  })

  return (
    <>
      <PageHero
        eyebrow="فعالیت‌ها"
        title="فعالیت‌های پایا پویش سبز"
        intro="شش حوزه‌ی اصلی خدمات، از بررسی و طراحی تا اجرا و پیگیری پس از اجرا."
        image="/images/sprinkler-corn.webp"
        breadcrumb={[{ label: 'فعالیت‌ها' }]}
      />

      <section className="paper-texture py-20 lg:py-24">
        <div className="shell space-y-16 lg:space-y-24">
          {activities.map((activity, index) => {
            const Icon = icons[activity.icon] ?? Sprout
            const flipped = index % 2 === 1
            return (
              <Reveal
                key={activity.slug}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <div className={`lg:col-span-6 ${flipped ? 'lg:order-2' : ''}`}>
                  <div className="overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      width="1280"
                      height="855"
                      loading="lazy"
                      decoding="async"
                      className="h-[300px] w-full object-cover transition-transform duration-[1200ms] ease-organic hover:scale-[1.04] sm:h-[380px]"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-6 ${flipped ? 'lg:order-1' : ''}`}>
                  <span className="mb-6 flex h-14 w-14 items-center justify-center border border-forest/25 text-forest">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-[1.35] text-soil">
                    {activity.title}
                  </h2>
                  <p className="prose-fa mt-5 text-[17px] leading-[1.95] text-soil/75">
                    {activity.summary}
                  </p>
                  <ul className="mt-8 grid gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                    {activity.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[15px] text-soil/80">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="shell mt-20">
          <Reveal className="flex flex-col items-start justify-between gap-6 border border-soil/10 bg-forest-900 p-8 text-ivory sm:flex-row sm:items-center lg:p-12">
            <div>
              <h2 className="text-[clamp(1.3rem,2.4vw,1.8rem)] font-extrabold">
                آماده‌ی بررسی زمین یا طرح شما هستیم
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-[1.9] text-ivory/70">
                برای دریافت مشاوره یا سفارش تجهیزات، فرم درخواست همکاری را تکمیل کنید.
              </p>
            </div>
            <Button to="/collaboration" variant="leaf" size="lg" className="shrink-0">
              درخواست همکاری
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
