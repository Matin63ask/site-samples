import { company } from '../data/company.js'
import usePageMeta, { useStructuredData } from '../hooks/usePageMeta.js'
import Hero from '../components/home/Hero.jsx'
import AboutSection from '../components/home/AboutSection.jsx'
import ActivitiesSection from '../components/home/ActivitiesSection.jsx'
import ProductCarousel from '../components/home/ProductCarousel.jsx'
import ConsultingSection from '../components/home/ConsultingSection.jsx'
import WhyUsSection from '../components/home/WhyUsSection.jsx'
import CollaborationSection from '../components/home/CollaborationSection.jsx'
import ArticlesSection from '../components/home/ArticlesSection.jsx'
import PartnersSection from '../components/home/PartnersSection.jsx'

export default function Home() {
  usePageMeta({
    title: 'پایا پویش سبز | حافظ منافع آب، خاک و گیاه',
    description:
      'پایا پویش سبز؛ طراحی و اجرای سیستم‌های آبیاری تحت فشار، تجهیزات آبیاری و گلخانه، کود و بستر کشت، مشاوره تخصصی تغذیه گیاهان و اصلاح خاک.',
    path: '/',
  })

  useStructuredData('ld-organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    alternateName: company.latinName,
    description: company.shortDescription,
    url: company.website.href,
    telephone: company.phones.map((phone) => phone.dial),
    address: { '@type': 'PostalAddress', addressCountry: 'IR', addressLocality: 'تهران' },
    areaServed: 'IR',
    knowsAbout: ['آبیاری تحت فشار', 'تغذیه گیاهان', 'اصلاح خاک', 'کشاورزی پایدار'],
  })

  return (
    <>
      {/* 1. full-screen organic soil hero (with the soil-to-ivory edge) */}
      <Hero />
      {/* 2. about */}
      <AboutSection />
      {/* 3. company activities (dark cultivation band) */}
      <ActivitiesSection />
      {/* 4. product carousel */}
      <ProductCarousel />
      {/* 5. specialised consulting */}
      <ConsultingSection />
      {/* 6. why choose us */}
      <WhyUsSection />
      {/* 7. collaboration request form */}
      <CollaborationSection />
      {/* 8. latest articles */}
      <ArticlesSection />
      {/* 9. partner brands */}
      <PartnersSection />
    </>
  )
}
