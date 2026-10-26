import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ChevronLeft, PackageSearch, Phone } from 'lucide-react'
import { company } from '../data/company.js'
import { getProduct, categoryName, products } from '../data/products.js'
import usePageMeta, { useStructuredData } from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SoilEdge from '../components/ui/SoilEdge.jsx'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [activeImage, setActiveImage] = useState(0)

  usePageMeta({
    title: product
      ? `${product.title} | پایا پویش سبز`
      : 'محصول یافت نشد | پایا پویش سبز',
    description: product
      ? product.excerpt
      : 'محصول مورد نظر در فهرست محصولات پایا پویش سبز پیدا نشد.',
    path: `/products/${slug}`,
  })

  useStructuredData('ld-product', product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.gallery?.map((image) => `${window.location.origin}${image}`) ?? [],
        category: categoryName(product.category),
        brand: { '@type': 'Brand', name: company.name },
      }
    : null)

  if (!product) {
    return (
      <>
        <PageHero
          eyebrow="محصولات"
          title="این محصول پیدا نشد"
          intro="ممکن است نشانی صفحه تغییر کرده باشد یا محصول از فهرست خارج شده باشد."
          breadcrumb={[{ label: 'محصولات', href: '/products' }, { label: 'محصول یافت نشد' }]}
        />
        <section className="paper-texture py-20 lg:py-24">
          <div className="shell flex flex-col items-center text-center">
            <PackageSearch className="h-11 w-11 text-soil/35" aria-hidden="true" />
            <h2 className="mt-6 text-[24px] font-extrabold text-soil">محصولی با این نشانی نیست</h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.9] text-soil/70">
              فهرست کامل محصولات را ببینید یا درخواست خود را ثبت کنید تا کارشناسان ما راهنمایی‌تان
              کنند.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/products" variant="primary" size="md">
                همه محصولات
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/collaboration" variant="outline" size="md">
                درخواست مشاوره
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image]
  const related = products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => (b.category === product.category) - (a.category === product.category))
    .slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={categoryName(product.category)}
        title={product.title}
        intro={product.excerpt}
        image={product.image}
        breadcrumb={[{ label: 'محصولات', href: '/products' }, { label: product.title }]}
      />

      <section className="paper-texture py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* gallery */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="overflow-hidden border border-soil/10 bg-ivory-50 shadow-card">
                <img
                  src={gallery[activeImage]}
                  alt={product.title}
                  width="1280"
                  height="855"
                  loading="eager"
                  decoding="async"
                  className="h-[300px] w-full object-cover sm:h-[440px]"
                />
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 flex gap-4" role="group" aria-label="تصاویر محصول">
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`تصویر ${index + 1}`}
                      aria-pressed={index === activeImage}
                      className={`h-20 w-24 overflow-hidden border transition-colors duration-300 ${
                        index === activeImage
                          ? 'border-leaf'
                          : 'border-soil/15 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        width="1280"
                        height="855"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <h2 className="text-[24px] font-extrabold text-soil">معرفی محصول</h2>
              <p className="prose-fa mt-5 text-[17px] leading-[1.95] text-soil/75">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-12">
              <h2 className="text-[24px] font-extrabold text-soil">ویژگی‌ها</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 border border-soil/10 bg-ivory-50 p-5 text-[15px] leading-[1.85] text-soil/80"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* specification card */}
          <div className="lg:col-span-5">
            <Reveal delay={140}>
              <div className="border border-soil/10 bg-forest-900 p-8 text-ivory sm:p-10">
                <p className="text-[12px] font-semibold tracking-[0.18em] text-sage">
                  {categoryName(product.category)}
                </p>
                <h2 className="mt-4 text-[24px] font-extrabold leading-[1.4] text-ivory">
                  {product.title}
                </h2>
                <dl className="mt-8 divide-y divide-ivory/10 border-t border-ivory/10">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-start justify-between gap-6 py-4">
                      <dt className="text-[14px] text-ivory/60">{spec.label}</dt>
                      <dd className="text-left text-[15px] font-semibold text-ivory">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 space-y-3">
                  <Button
                    to={`/collaboration?subject=${encodeURIComponent(`سفارش ${product.title}`)}`}
                    variant="leaf"
                    size="md"
                    className="w-full"
                  >
                    درخواست سفارش و مشاوره
                  </Button>
                  <a
                    href={`tel:${company.phones[0].dial}`}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 border border-ivory/30 font-semibold text-ivory transition-colors duration-300 hover:border-sage hover:text-sage"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span dir="ltr">{company.phones[0].display}</span>
                  </a>
                </div>
                <p className="mt-6 text-[13px] leading-[1.8] text-ivory/55">
                  موجودی، ابعاد و شرایط تأمین بر اساس سفارش و زمان‌بندی کشت هماهنگ می‌شود.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180} className="mt-8 border border-soil/10 bg-ivory-50 p-8">
              <h3 className="text-[18px] font-bold text-soil">نیاز به راهنمایی فنی دارید؟</h3>
              <p className="prose-fa mt-3 text-[15px] leading-[1.9] text-soil/70">
                انتخاب قطر، فشار کاری و فاصله‌ی قطره‌چکان به شرایط زمین و کشت شما بستگی دارد.
                کارشناسان ما در انتخاب گزینه‌ی مناسب همراه شما هستند.
              </p>
              <Link
                to="/consulting"
                className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-forest transition-colors hover:text-leaf"
              >
                خدمات مشاوره
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* related products */}
      <section className="relative bg-ivory">
        <div className="shell border-t border-soil/10 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="محصولات مرتبط" title="محصولات پیشنهادی" />
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-forest transition-colors hover:text-leaf"
            >
              همه محصولات
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70} className="h-full">
                <article className="group flex h-full flex-col border border-soil/10 bg-ivory-50 shadow-card transition-all duration-500 ease-organic hover:-translate-y-1 hover:border-leaf/40 hover:shadow-lift">
                  <Link to={`/products/${item.slug}`} className="block overflow-hidden" tabIndex={-1}>
                    <img
                      src={item.image}
                      alt={item.title}
                      width="1280"
                      height="855"
                      loading="lazy"
                      decoding="async"
                      className="h-44 w-full object-cover transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.06]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 text-[12px] font-semibold tracking-[0.16em] text-forest">
                      {categoryName(item.category)}
                    </p>
                    <h3 className="text-[18px] font-bold leading-[1.5] text-soil">
                      <Link to={`/products/${item.slug}`} className="transition-colors hover:text-forest">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="prose-fa mt-3 flex-1 text-[15px] leading-[1.85] text-soil/70">
                      {item.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* closing invitation */}
      <section className="relative">
        <SoilEdge
          position="static"
          topFill="#F5F0E5"
          fill="#1A1612"
          crumb="#2B2318"
          className="h-12 md:h-20"
        />
        <div className="soil-surface grain-overlay relative py-16 text-ivory lg:py-20">
          <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[clamp(1.3rem,2.6vw,1.9rem)] font-extrabold text-ivory">
                سفارش خود را با مشاوره‌ی فنی همراه کنید
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-[1.9] text-ivory/70">
                مقدار، ابعاد و زمان تحویل بر اساس طرح آبیاری و برنامه‌ی کشت شما تعیین می‌شود.
              </p>
            </div>
            <Button to="/collaboration" variant="leaf" size="lg" className="shrink-0">
              فرم درخواست همکاری
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
