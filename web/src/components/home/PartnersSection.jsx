import { partners } from '../../data/partners.js'
import Reveal from '../ui/Reveal.jsx'

function Logo({ partner }) {
  if (partner.placeholder) {
    return (
      <div className="flex h-20 w-40 shrink-0 flex-col items-center justify-center border border-dashed border-soil/25 text-center">
        <span className="text-[14px] font-semibold tracking-[0.1em] text-soil/45">جای برند</span>
        <span className="mt-1 text-[11px] text-soil/35">لوگو را اینجا جایگزین کنید</span>
      </div>
    )
  }
  return (
    <div className="flex h-20 w-40 shrink-0 items-center justify-center border border-soil/10 bg-ivory-50 px-5">
      <span className="text-[17px] font-bold tracking-[0.12em] text-soil/60" dir="ltr">
        {partner.name}
      </span>
    </div>
  )
}

export default function PartnersSection() {
  return (
    <section className="relative bg-ivory py-16 lg:py-20">
      <div className="shell">
        <Reveal className="text-center">
          <p className="mb-3 flex items-center justify-center gap-3 text-[13px] font-semibold tracking-[0.18em] text-forest">
            <span className="h-px w-8 bg-leaf/50" aria-hidden="true" />
            همکاران تجاری
          </p>
          <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold text-soil">
            برندها و همکاران تجاری
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-soil/60">
            تأمین تجهیزات و محصولات از برندهای همکار؛ جای لوگوی سایر برندها آماده‌ی تکمیل است.
          </p>
        </Reveal>
      </div>

      {/* gentle logo carousel */}
      <div className="relative mt-10 overflow-hidden" aria-label="گردونه برندها و همکاران">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent" aria-hidden="true" />
        <ul className="marquee-track flex w-max items-center gap-6 px-6">
          {[...partners, ...partners].map((partner, index) => (
            <li key={`${partner.name}-${index}`} aria-hidden={index >= partners.length}>
              <Logo partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
