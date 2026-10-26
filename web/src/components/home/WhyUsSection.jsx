import { CheckCircle2 } from 'lucide-react'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { toPersianDigits } from '../../utils/format.js'

const reasons = [
  {
    title: 'تخصص در حوزه کشاورزی',
    text: 'کار کارشناسی ما روی آب، خاک و تغذیه‌ی گیاه متمرکز است؛ همان سه محوری که نتیجه‌ی نهایی تولید به آن‌ها وابسته است.',
  },
  {
    title: 'راهکارهای متناسب با نیاز مشتری',
    text: 'هر زمین شرایط خود را دارد؛ توصیه‌ها بر پایه‌ی بازدید، وضعیت منبع آب و ویژگی‌های خاک همان مزرعه یا باغ تنظیم می‌شود.',
  },
  {
    title: 'محصولات و تجهیزات تخصصی',
    text: 'تجهیزات آبیاری، لوله و اتصالات، کود و بستر کشت با انتخاب فنی و متناسب با طرح اجرایی تأمین می‌شوند.',
  },
  {
    title: 'مشاوره و پشتیبانی',
    text: 'پس از اجرا هم در دسترس هستیم؛ پیگیری وضعیت سیستم و پاسخ به پرسش‌های فنی بخشی از کار ما است.',
  },
  {
    title: 'توجه به کشاورزی پایدار',
    text: 'کاهش مصرف آب و نهاده‌های شیمیایی، بهبود ماده‌ی آلی خاک و حفظ توان تولید زمین در بلندمدت، معیار تصمیم‌های ما است.',
  },
]

export default function WhyUsSection() {
  return (
    <section className="paper-texture relative overflow-hidden py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="اعتماد و تجربه"
                title="چرا پایا پویش سبز؟"
                intro="انتخاب یک مجموعه‌ی کشاورزی، انتخاب همراه فنی در طول فصل است. این‌ها ویژگی‌هایی است که کار با ما را برای کشاورز، باغدار و گلخانه‌دار قابل اتکا می‌کند."
              />
            </Reveal>

            <Reveal delay={120} className="mt-10 hidden lg:block">
              <div className="relative">
                <img
                  src="/images/sprout-brown.webp"
                  alt="جوانه‌ی سبز در حال رشد از خاک حاصلخیز"
                  width="1280"
                  height="1920"
                  loading="lazy"
                  decoding="async"
                  className="h-[320px] w-full max-w-sm object-cover"
                />
                <div className="absolute -bottom-6 -left-6 border border-leaf/30 bg-ivory px-6 py-5 shadow-card">
                  <p className="text-[13px] font-semibold tracking-[0.14em] text-forest">
                    ریشه‌ی سالم، محصول سالم
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol className="divide-y divide-soil/10 border-y border-soil/10">
              {reasons.map((reason, index) => (
                <Reveal as="li" key={reason.title} delay={index * 60} className="flex gap-6 py-7">
                  <span className="mt-1 text-[13px] font-bold tracking-[0.2em] text-leaf">
                    {toPersianDigits(String(index + 1).padStart(2, '0'))}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-3 text-[19px] font-bold text-soil">
                      <CheckCircle2 className="h-4 w-4 text-forest" aria-hidden="true" />
                      {reason.title}
                    </h3>
                    <p className="prose-fa mt-3 text-[16px] leading-[1.9] text-soil/70">
                      {reason.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
