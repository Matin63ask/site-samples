import { Link } from 'react-router-dom'
import { Phone, MapPin, Globe, Instagram, Send, MessageCircle, Mail } from 'lucide-react'
import { company, navigation, consultationCta } from '../../data/company.js'
import BrandLogo from './BrandLogo.jsx'
import SoilEdge from '../ui/SoilEdge.jsx'
import NewsletterForm from '../ui/NewsletterForm.jsx'
import { currentPersianYear } from '../../utils/format.js'

const socialIcon = { whatsapp: MessageCircle, telegram: Send, instagram: Instagram }

const legalLinks = [
  { label: 'درخواست همکاری', href: '/collaboration' },
  { label: 'صفحه محصولات', href: '/products' },
  { label: 'آخرین مقالات', href: '/articles' },
]

export default function Footer() {
  const year = currentPersianYear()

  return (
    <footer className="relative">
      {/* organic ivory-to-soil boundary */}
      <SoilEdge
        position="static"
        topFill="#F5F0E5"
        fill="#1A1612"
        crumb="#2B2318"
        className="h-12 md:h-20"
      />

      <div className="soil-surface grain-overlay relative overflow-hidden text-ivory">
        <div
          className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-forest/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell relative py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <BrandLogo />
              <p className="prose-fa mt-6 max-w-sm text-[15px] leading-[1.9] text-ivory/70">
                {company.shortDescription}
              </p>
              <p className="mt-5 text-[13px] text-ivory/50">
                فعالیت از سال {company.foundedYear} — {company.tagline}
              </p>
              <ul className="mt-6 flex items-center gap-3">
                {company.socials.map((social) => {
                  const Icon = socialIcon[social.icon] ?? MessageCircle
                  return (
                    <li key={social.name}>
                      {social.href ? (
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors duration-300 hover:border-sage hover:text-sage"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          title={`نشانی ${social.name} به‌زودی تکمیل می‌شود`}
                          aria-label={`${social.name} — نشانی ثبت نشده`}
                          className="flex h-11 w-11 cursor-default items-center justify-center border border-ivory/10 text-ivory/25"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <nav className="lg:col-span-3" aria-label="پیوندهای سریع">
              <h3 className="mb-5 text-[15px] font-bold text-ivory">پیوندها</h3>
              <ul className="space-y-3 text-[15px]">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="link-underline text-ivory/70 transition-colors hover:text-sage"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to={consultationCta.href}
                    className="link-underline text-sage transition-colors hover:text-ivory"
                  >
                    فرم درخواست همکاری
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h3 className="mb-5 text-[15px] font-bold text-ivory">ارتباط با ما</h3>
              <ul className="space-y-4 text-[15px] text-ivory/70">
                {company.phones.map((phone) => (
                  <li key={phone.dial}>
                    <a
                      href={`tel:${phone.dial}`}
                      className="flex items-center gap-3 transition-colors hover:text-sage"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                      <span dir="ltr">{phone.display}</span>
                    </a>
                  </li>
                ))}
                {company.email && (
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="flex items-center gap-3 transition-colors hover:text-sage"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                      <span dir="ltr">{company.email}</span>
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                  <span>
                    {company.address.city}
                    {company.address.detail ? ` — ${company.address.detail}` : ''}
                  </span>
                </li>
                <li>
                  <a
                    href={company.website.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-colors hover:text-sage"
                  >
                    <Globe className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                    <span dir="ltr">{company.website.display}</span>
                  </a>
                </li>
              </ul>
              <ul className="mt-6 space-y-2 text-[14px] text-ivory/45">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="transition-colors hover:text-sage">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="mb-5 text-[15px] font-bold text-ivory">خبرنامه</h3>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="relative border-t border-ivory/10">
          <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-ivory/55 sm:flex-row">
            <p>© {year} {company.name} — همه حقوق محفوظ است.</p>
            <p>آبیاری، تغذیه گیاهان، اصلاح خاک و مشاوره تخصصی کشاورزی</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
