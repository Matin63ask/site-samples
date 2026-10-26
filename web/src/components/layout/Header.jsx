import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Instagram, Send, MessageCircle } from 'lucide-react'
import { company, navigation, consultationCta } from '../../data/company.js'
import BrandLogo from './BrandLogo.jsx'
import Button from '../ui/Button.jsx'
import { toPersianDigits } from '../../utils/format.js'

const socialIcon = { whatsapp: MessageCircle, telegram: Send, instagram: Instagram }

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-organic ${
        scrolled || menuOpen
          ? 'bg-soil/95 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.95)] backdrop-blur-md'
          : 'bg-gradient-to-b from-soil/90 via-soil/50 to-transparent'
      }`}
    >
      {/* contact strip — the company's published phone numbers */}
      {!scrolled && (
        <div className="hidden border-b border-ivory/10 lg:block">
          <div className="shell flex h-11 items-center justify-between text-[13px] text-ivory/70">
            <div className="flex items-center gap-5">
              {company.phones.map((phone, index) => (
                <a
                  key={phone.dial}
                  href={`tel:${phone.dial}`}
                  className="flex items-center gap-2 transition-colors hover:text-sage"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span dir="ltr">{phone.display}</span>
                  {index === 0 && <span className="text-ivory/25">|</span>}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a
                href={company.website.href}
                className="transition-colors hover:text-sage"
                dir="ltr"
                rel="noopener"
              >
                {company.website.display}
              </a>
              <span className="h-4 w-px bg-ivory/15" aria-hidden="true" />
              <ul className="flex items-center gap-3">
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
                          className="transition-colors hover:text-sage"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          className="cursor-default text-ivory/30"
                          title={`نشانی ${social.name} به‌زودی تکمیل می‌شود`}
                          aria-label={`${social.name} — نشانی ثبت نشده`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="shell flex items-center justify-between gap-6 py-3 lg:py-4">
        <Link to="/" aria-label={`${company.name} — صفحه اصلی`}>
          <BrandLogo />
        </Link>

        <nav aria-label="ناوبری اصلی" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `link-underline text-[15px] font-medium transition-colors ${
                      isActive ? 'text-sage' : 'text-ivory/85 hover:text-ivory'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button to={consultationCta.href} variant="leaf" size="sm" className="hidden sm:inline-flex">
            درخواست مشاوره
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
            className="flex h-11 w-11 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-sage hover:text-sage lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="soil-surface grain-overlay relative max-h-[calc(100svh-70px)] overflow-y-auto border-t border-ivory/10 lg:hidden"
        >
          <nav aria-label="ناوبری موبایل" className="shell py-6">
            <ul className="flex flex-col divide-y divide-ivory/10">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `block py-4 text-[17px] font-semibold transition-colors ${
                        isActive ? 'text-sage' : 'text-ivory/90'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-5">
                <Button to={consultationCta.href} variant="leaf" size="md" className="w-full">
                  درخواست مشاوره تخصصی
                </Button>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-ivory/70">
              {company.phones.map((phone) => (
                <a key={phone.dial} href={`tel:${phone.dial}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span dir="ltr">{phone.display}</span>
                </a>
              ))}
              <span className="text-ivory/40">
                برای هماهنگی بازدید و مشاوره، با شماره‌های بالا تماس بگیرید.
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
