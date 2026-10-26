import { Link } from 'react-router-dom'
import { Phone, Globe, MapPin, Clock, MessageCircle, Instagram, Send } from 'lucide-react'
import { company, consultationCta } from '../data/company.js'
import usePageMeta from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import CollaborationForm from '../components/ui/CollaborationForm.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'

const socialIcon = { whatsapp: MessageCircle, telegram: Send, instagram: Instagram }

export default function ContactPage() {
  usePageMeta({
    title: 'تماس با پایا پویش سبز',
    description:
      'راه‌های ارتباط با پایا پویش سبز: شماره‌های تماس مستقیم، وب‌سایت شرکت و فرم ارسال پیام برای دریافت مشاوره آبیاری، تغذیه گیاهان و اصلاح خاک.',
    path: '/contact',
  })

  return (
    <>
      <PageHero
        eyebrow="تماس"
        title="با ما در ارتباط باشید"
        intro="برای دریافت مشاوره، سفارش تجهیزات یا هر پرسش فنی درباره‌ی آب، خاک و تغذیه‌ی گیاه با ما تماس بگیرید."
        image="/images/field-sunset.webp"
        breadcrumb={[{ label: 'تماس با ما' }]}
      />

      <section className="paper-texture py-16 lg:py-24">
        <div className="shell">
          {/* contact channels */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="h-full">
              <div className="flex h-full flex-col border border-soil/10 bg-ivory-50 p-7">
                <span className="mb-5 flex h-11 w-11 items-center justify-center border border-forest/25 text-forest">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="text-[16px] font-bold text-soil">تماس تلفنی</h2>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {company.phones.map((phone) => (
                    <li key={phone.dial}>
                      <a
                        href={`tel:${phone.dial}`}
                        dir="ltr"
                        className="text-soil/75 transition-colors hover:text-forest"
                      >
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={70} className="h-full">
              <div className="flex h-full flex-col border border-soil/10 bg-ivory-50 p-7">
                <span className="mb-5 flex h-11 w-11 items-center justify-center border border-forest/25 text-forest">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="text-[16px] font-bold text-soil">وب‌سایت شرکت</h2>
                <a
                  href={company.website.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="mt-4 text-[15px] text-soil/75 transition-colors hover:text-forest"
                >
                  {company.website.display}
                </a>
              </div>
            </Reveal>

            <Reveal delay={140} className="h-full">
              <div className="flex h-full flex-col border border-soil/10 bg-ivory-50 p-7">
                <span className="mb-5 flex h-11 w-11 items-center justify-center border border-forest/25 text-forest">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="text-[16px] font-bold text-soil">نشانی</h2>
                <p className="mt-4 text-[15px] leading-[1.9] text-soil/75">{company.address.city}</p>
                {company.address.detail && (
                  <p className="mt-1 text-[14px] leading-[1.9] text-soil/60">{company.address.detail}</p>
                )}
              </div>
            </Reveal>

            <Reveal delay={210} className="h-full">
              <div className="flex h-full flex-col border border-soil/10 bg-ivory-50 p-7">
                <span className="mb-5 flex h-11 w-11 items-center justify-center border border-forest/25 text-forest">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="text-[16px] font-bold text-soil">پیگیری درخواست‌ها</h2>
                <p className="mt-4 text-[15px] leading-[1.9] text-soil/75">
                  درخواست‌های ثبت‌شده در روزهای کاری بررسی و پاسخ داده می‌شوند.
                </p>
              </div>
            </Reveal>
          </div>

          {/* message form + imagery */}
          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <SectionHeading
                eyebrow="ارسال پیام"
                title="پیام خود را بنویسید"
                intro="اگر ترجیح می‌دهید تلفنی صحبت نکنید، فرم زیر را تکمیل کنید؛ در اولین فرصت پاسخ می‌دهیم."
              />
              <div className="mt-10 border border-soil/10 bg-ivory-50 p-8 shadow-card sm:p-10">
                <CollaborationForm defaultSubject="تماس با ما" submitLabel="ارسال پیام" />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="relative h-full min-h-[380px] overflow-hidden border border-soil/10">
                <img
                  src="/images/greenhouse-team.webp"
                  alt="گروه کارشناسان پایا پویش سبز در حال بررسی گلخانه"
                  width="1280"
                  height="855"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-soil via-soil/45 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 text-ivory">
                  <h2 className="text-[20px] font-extrabold">کارشناسان ما در کنار شما</h2>
                  <p className="mt-3 text-[14px] leading-[1.9] text-ivory/75">
                    برای موضوعات فنی که نیاز به بررسی دقیق دارند، مشاوره‌ی تخصصی گزینه‌ی مناسب‌تری
                    است.
                  </p>
                  <Link
                    to={consultationCta.href}
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 border border-ivory/40 px-5 text-[14px] font-semibold transition-colors duration-300 hover:border-sage hover:text-sage"
                  >
                    {consultationCta.label}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* socials */}
          {company.socials.some((social) => social.href) && (
            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-soil/10 pt-8">
              <p className="text-[14px] text-soil/60">ما را در شبکه‌های اجتماعی دنبال کنید:</p>
              <ul className="flex items-center gap-3">
                {company.socials
                  .filter((social) => social.href)
                  .map((social) => {
                    const Icon = socialIcon[social.icon] ?? MessageCircle
                    return (
                      <li key={social.name}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex h-11 w-11 items-center justify-center border border-soil/20 text-soil/70 transition-colors duration-300 hover:border-forest hover:text-forest"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </li>
                    )
                  })}
              </ul>
              <Button to="/products" variant="quiet" size="sm" className="ml-auto">
                مشاهده محصولات
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
