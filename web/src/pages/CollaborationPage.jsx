import { useSearchParams } from 'react-router-dom'
import { Phone, Clock, CheckCircle2, ArrowLeft, ClipboardList } from 'lucide-react'
import { company } from '../data/company.js'
import usePageMeta from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import CollaborationForm from '../components/ui/CollaborationForm.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { toPersianDigits } from '../utils/format.js'

const steps = [
  {
    title: 'ثبت درخواست',
    text: 'فرم را با اطلاعات زمین یا پروژه تکمیل می‌کنید تا موضوع درخواست برای کارشناس مشخص باشد.',
  },
  {
    title: 'تماس کارشناس',
    text: 'در روزهای کاری با شما تماس گرفته می‌شود و جزئیات لازم درباره‌ی کشت و شرایط زمین پرسیده می‌شود.',
  },
  {
    title: 'بررسی و پیشنهاد',
    text: 'در صورت نیاز بازدید میدانی انجام می‌شود و پیشنهاد فنی و فهرست تجهیزات آماده می‌گردد.',
  },
]

export default function CollaborationPage() {
  const [params] = useSearchParams()
  const subject = params.get('subject') || ''

  usePageMeta({
    title: 'فرم درخواست همکاری | پایا پویش سبز',
    description:
      'فرم درخواست همکاری پایا پویش سبز برای دریافت مشاوره تخصصی آبیاری و تغذیه گیاهان، سفارش تجهیزات کشاورزی و بررسی طرح آبیاری مزرعه یا گلخانه.',
    path: '/collaboration',
  })

  return (
    <>
      <PageHero
        eyebrow="همکاری"
        title="فرم درخواست همکاری"
        intro="برای دریافت مشاوره، سفارش تجهیزات یا بررسی طرح آبیاری، فرم زیر را تکمیل کنید. کارشناسان ما درخواست شما را بررسی و در روزهای کاری تماس می‌گیرند."
        image="/images/planting-hands.webp"
        breadcrumb={[{ label: 'درخواست همکاری' }]}
      />

      <section className="paper-texture py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <div className="border border-soil/10 bg-ivory-50 p-8 shadow-card sm:p-10 lg:p-12">
              <div className="mb-10 flex items-start gap-4 border-b border-soil/10 pb-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-forest/25 text-forest">
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-[20px] font-bold text-soil">اطلاعات درخواست</h2>
                  <p className="mt-2 text-[14px] leading-[1.8] text-soil/65">
                    هرچه توضیح درخواست کامل‌تر باشد، پاسخ فنی دقیق‌تری دریافت می‌کنید.
                  </p>
                </div>
              </div>
              <CollaborationForm defaultSubject={subject} submitLabel="ارسال درخواست همکاری" />
            </div>
          </Reveal>

          <aside className="lg:col-span-4">
            <Reveal delay={100}>
              <div className="border border-soil/10 bg-forest-900 p-8 text-ivory sm:p-10">
                <h2 className="text-[20px] font-bold">تماس مستقیم</h2>
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

            <Reveal delay={160} className="mt-8">
              <div className="border border-soil/10 bg-ivory-50 p-8">
                <h2 className="text-[18px] font-bold text-soil">پس از ثبت درخواست چه می‌شود؟</h2>
                <ol className="mt-6 space-y-5">
                  {steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-leaf/40 text-[13px] font-bold text-forest">
                        {toPersianDigits(index + 1)}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-bold text-soil">{step.title}</h3>
                        <p className="mt-1 text-[14px] leading-[1.8] text-soil/65">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-7 flex items-start gap-2 border-t border-soil/10 pt-5 text-[13px] leading-[1.8] text-soil/55">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                  اطلاعات تماس شما تنها برای پاسخ به همین درخواست استفاده می‌شود.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="shell mt-16">
          <Reveal className="flex flex-col items-start justify-between gap-6 border border-soil/10 bg-oat p-8 sm:flex-row sm:items-center lg:p-12">
            <SectionHeading
              eyebrow="پیش از ارسال"
              title="هنوز مطمئن نیستید کدام خدمت را انتخاب کنید؟"
              intro="توضیح دهید در مزرعه یا گلخانه چه موضوعی مطرح است؛ کارشناس مناسب درخواست شما را بررسی می‌کند."
              className="max-w-2xl"
            />
            <a
              href={`tel:${company.phones[0].dial}`}
              className="inline-flex min-h-[48px] shrink-0 items-center gap-2 bg-soil px-7 font-semibold text-ivory transition-colors duration-300 hover:bg-soil-700"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              تماس با کارشناس
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
