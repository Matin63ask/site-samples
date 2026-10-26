import { Droplets, Wrench, MessagesSquare, Sprout, Layers, Microscope, ArrowLeft, Leaf } from 'lucide-react'
import { activities } from '../../data/activities.js'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import SoilEdge from '../ui/SoilEdge.jsx'
import { toPersianDigits } from '../../utils/format.js'

const icons = { droplets: Droplets, wrench: Wrench, messages: MessagesSquare, sprout: Sprout, layers: Layers, microscope: Microscope }

export default function ActivitiesSection() {
  return (
    <section className="relative">
      <SoilEdge position="static" topFill="#F5F0E5" fill="#24421F" crumb="#1A1612" className="h-12 md:h-20" />

      <div className="soil-surface grain-overlay relative bg-forest-900 py-20 text-ivory lg:py-28">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="فعالیت‌های شرکت"
                tone="light"
                title="فعالیت‌های پایا پویش سبز"
                intro="از طراحی و اجرای شبکه‌های آبیاری تا مشاوره‌ی تغذیه و اصلاح خاک؛ هر فعالیت با هدف افزایش بهره‌وری آب و خاک و پایداری تولید انجام می‌شود."
              />
            </Reveal>
            <Reveal delay={120}>
              <Button to="/activities" variant="outlineLight" size="md" className="shrink-0">
                مشاهده تمام فعالیت‌ها
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => {
              const Icon = icons[activity.icon] ?? Leaf
              return (
                <Reveal key={activity.slug} delay={index * 60} className="group">
                  <div className="relative overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      width="1280"
                      height="855"
                      loading="lazy"
                      decoding="async"
                      className="h-52 w-full object-cover opacity-90 transition-all duration-[1200ms] ease-organic group-hover:scale-[1.06] group-hover:opacity-100"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/25 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-3 right-4 text-[13px] font-bold tracking-[0.2em] text-sage">
                      {toPersianDigits(String(index + 1).padStart(2, '0'))}
                    </span>
                  </div>
                  <div className="mt-6 flex items-start gap-4">
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-sage/25 text-sage">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[19px] font-bold leading-[1.5] text-ivory">{activity.title}</h3>
                      <p className="prose-fa mt-3 text-[15px] leading-[1.9] text-ivory/70">
                        {activity.summary}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>

      <SoilEdge position="static" topFill="#24421F" fill="#F5F0E5" crumb="#1A1612" className="h-12 md:h-20" />
    </section>
  )
}
