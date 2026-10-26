import { Link } from 'react-router-dom'
import { ArrowLeft, MessageSquare, MoveRight } from 'lucide-react'
import { activities } from '../data/activities.js'
import usePageMeta from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import ConsultingSection from '../components/home/ConsultingSection.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SoilEdge from '../components/ui/SoilEdge.jsx'
import { toPersianDigits } from '../utils/format.js'

const steps = [
  {
    title: 'بررسی اولیه',
    text: 'شرایط زمین، منبع آب، نوع کشت و مشکل فعلی در گفت‌وگوی نخست مشخص می‌شود.',
  },
  {
    title: 'بازدید و اندازه‌گیری',
    text: 'در صورت نیاز، وضعیت خاک، آب و سیستم موجود در محل بررسی و داده‌های لازم ثبت می‌شود.',
  },
  {
    title: 'تحلیل و توصیه',
    text: 'نتیجه‌ی بررسی به یک برنامه‌ی روشن تبدیل می‌شود: اصلاح خاک، برنامه‌ی تغذیه یا اصلاح شبکه‌ی آبیاری.',
  },
  {
    title: 'پیگیری در فصل',
    text: 'اجرای برنامه در طول فصل پایش می‌شود و در صورت نیاز اصلاح می‌گردد.',
  },
]

const faqs = [
  {
    question: 'مشاوره برای چه نوع واحدهای تولیدی مناسب است؟',
    answer:
      'خدمات مشاوره برای مزرعه‌های زراعی، باغ، گلخانه و خزانه طراحی شده است. برنامه‌ی پیشنهادی بر اساس نوع کشت، سطح زیر کشت و شرایط منبع آب هر واحد تنظیم می‌شود.',
  },
  {
    question: 'آیا پیش از مشاوره به آزمون خاک یا آب نیاز است؟',
    answer:
      'آزمون خاک و آب، دقت توصیه‌ها را بسیار بیشتر می‌کند؛ اما در ابتدا می‌توان بررسی را بر پایه‌ی وضعیت ظاهری مزرعه و سابقه‌ی کشت آغاز کرد و در صورت نیاز، آزمون تکمیلی پیشنهاد می‌شود.',
  },
  {
    question: 'مشاوره فقط به ارائه‌ی توصیه محدود می‌شود؟',
    answer:
      'خیر. در کنار توصیه‌ی فنی، انتخاب تجهیزات، تأمین اقلام مورد نیاز و اجرای اصلاحات پیشنهادی نیز قابل انجام است تا برنامه به‌صورت عملی در مزرعه پیاده شود.',
  },
  {
    question: 'برای شروع چه اطلاعاتی لازم است؟',
    answer:
      'نام و شماره تماس، موقعیت زمین، سطح زیر کشت، نوع محصول و توضیح کوتاهی از موضوع کافی است. باقی جزئیات در گفت‌وگوی نخست تکمیل می‌شود.',
  },
]

export default function ConsultingPage() {
  usePageMeta({
    title: 'مشاوره تخصصی آبیاری، تغذیه و بیماری گیاهان | پایا پویش سبز',
    description:
      'خدمات مشاوره تخصصی پایا پویش سبز در حوزه آبیاری تحت فشار، برنامه تغذیه گیاهان، اصلاح خاک و مدیریت مزرعه و گلخانه بر پایه داده‌های واقعی.',
    path: '/consulting',
  })

  return (
    <>
      <PageHero
        eyebrow="مشاوره"
        title="مشاوره تخصصی کشاورزی"
        intro="تصمیم‌های فنی در مزرعه و گلخانه، وقتی بر پایه‌ی داده‌های واقعی گرفته شوند، هم هزینه را کاهش می‌دهند و هم نتیجه‌ی پایدارتری می‌سازند."
        image="/images/field-specialist.webp"
        breadcrumb={[{ label: 'مشاوره' }]}
      />

      {/* how our advisory works */}
      <section className="paper-texture py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="مسیر همکاری"
              title="از بررسی وضعیت تا اجرای برنامه"
              intro="مشاوره‌ی ما با یک گفت‌وگوی ساده آغاز می‌شود و به یک برنامه‌ی قابل اجرا در مزرعه می‌رسد."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 70} className="h-full">
                <div className="flex h-full flex-col border border-soil/10 bg-ivory-50 p-7">
                  <span className="mb-6 flex h-11 w-11 items-center justify-center border border-forest/30 text-[15px] font-extrabold text-forest">
                    {toPersianDigits(index + 1)}
                  </span>
                  <h3 className="text-[17px] font-bold text-soil">{step.title}</h3>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.9] text-soil/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* the two advisory services (shared with the home page) */}
      <ConsultingSection />

      {/* FAQ */}
      <section className="relative bg-oat py-20 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="پرسش‌های متداول"
              title="پیش از درخواست مشاوره"
              intro="اگر پاسخ پرسش خود را پیدا نکردید، از طریق فرم درخواست همکاری یا تماس تلفنی بپرسید."
            />
            <Button to="/collaboration" variant="primary" size="md" className="mt-8">
              ثبت درخواست مشاوره
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="divide-y divide-soil/10 border-y border-soil/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-bold text-soil transition-colors hover:text-forest">
                    {faq.question}
                    <MoveRight
                      className="h-5 w-5 shrink-0 text-forest transition-transform duration-300 group-open:-rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="prose-fa pb-6 text-[15px] leading-[1.95] text-soil/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* link to the activity pages */}
      <section className="relative">
        <SoilEdge position="static" topFill="#E8DFC9" fill="#1A1612" crumb="#2B2318" className="h-12 md:h-20" />
        <div className="soil-surface grain-overlay relative py-16 text-ivory lg:py-20">
          <div className="shell">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                tone="light"
                eyebrow="خدمات مرتبط"
                title="از مشاوره تا اجرا"
                intro="مشاوره در عمل، زمانی نتیجه می‌دهد که به طراحی، تأمین تجهیزات و اجرا متصل باشد."
              />
              <Link
                to="/activities"
                className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-sage transition-colors hover:text-ivory"
              >
                همه فعالیت‌ها
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activities.slice(0, 3).map((activity, index) => (
                <Reveal key={activity.slug} delay={index * 70}>
                  <Link
                    to="/activities"
                    className="group flex h-full flex-col border border-ivory/15 p-7 transition-colors duration-300 hover:border-sage/60 hover:bg-ivory/5"
                  >
                    <MessageSquare className="mb-5 h-5 w-5 text-sage" aria-hidden="true" />
                    <h3 className="text-[17px] font-bold leading-[1.6] text-ivory">
                      {activity.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14px] leading-[1.9] text-ivory/65">
                      {activity.summary}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
