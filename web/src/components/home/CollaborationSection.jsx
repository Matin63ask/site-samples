import { Phone, Clock } from 'lucide-react'
import { company } from '../../data/company.js'
import CollaborationForm from '../ui/CollaborationForm.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function CollaborationSection() {
  return (
    <section id="collaboration" className="relative overflow-hidden bg-oat py-20 lg:py-28">
      {/* organic soil decoration */}
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-leaf/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[url('/textures/soil.svg')] bg-[length:640px] opacity-[0.07]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="همکاری"
            title="فرم درخواست همکاری"
            intro="برای دریافت مشاوره، سفارش تجهیزات یا بررسی طرح آبیاری، فرم زیر را تکمیل کنید. کارشناسان ما درخواست شما را بررسی و در روزهای کاری تماس می‌گیرند."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <div className="border border-soil/10 bg-ivory-50 p-8 shadow-card sm:p-10 lg:p-12">
              <CollaborationForm />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <div className="h-full border border-soil/10 bg-forest-900 p-8 text-ivory sm:p-10">
              <h3 className="text-[20px] font-bold">تماس مستقیم</h3>
              <p className="prose-fa mt-4 text-[15px] leading-[1.9] text-ivory/75">
                اگر موضوع فوری است، تماس تلفنی سریع‌ترین راه دسترسی به کارشناسان ما است.
              </p>
              <ul className="mt-8 space-y-5">
                {company.phones.map((phone) => (
                  <li key={phone.dial}>
                    <a
                      href={`tel:${phone.dial}`}
                      className="flex items-center gap-3 text-[17px] font-semibold transition-colors hover:text-sage"
                    >
                      <Phone className="h-4 w-4 text-sage" aria-hidden="true" />
                      <span dir="ltr">{phone.display}</span>
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-[15px] text-ivory/70">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                  پیگیری درخواست‌های فرم در روزهای کاری انجام می‌شود.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
