import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, X, PackageSearch } from 'lucide-react'
import { products, productCategories, categoryName } from '../data/products.js'
import usePageMeta from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import { toPersianDigits } from '../utils/format.js'

export default function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || 'all'
  const [query, setQuery] = useState('')

  usePageMeta({
    title: 'محصولات پایا پویش سبز | تجهیزات آبیاری، کود و بستر کشت',
    description:
      'فهرست محصولات پایا پویش سبز: اتصالات آبیاری، نوار تیپ، لوله پلی‌اتیلن، اتصالات گلخانه، کود آلی و شیمیایی، بستر کشت و تجهیزات مرتبط با کشاورزی.',
    path: '/products',
  })

  const results = useMemo(() => {
    const term = query.trim()
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      if (!matchesCategory) return false
      if (!term) return true
      const haystack = `${product.title} ${product.excerpt} ${categoryName(product.category)}`
      return haystack.includes(term)
    })
  }, [activeCategory, query])

  const selectCategory = (slug) => {
    const next = new URLSearchParams(params)
    if (slug === 'all') next.delete('category')
    else next.set('category', slug)
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageHero
        eyebrow="محصولات"
        title="محصولات پایا پویش سبز"
        intro="تجهیزات و محصولات تخصصی آبیاری، تغذیه و بستر کشت — با امکان جست‌وجو و فیلتر بر اساس دسته‌بندی."
        image="/images/wheat-field.webp"
        breadcrumb={[{ label: 'محصولات' }]}
      />

      <section className="paper-texture py-16 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full max-w-md">
              <label htmlFor="product-search" className="mb-3 block text-[14px] font-semibold text-soil">
                جست‌وجو در محصولات
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soil/40"
                  aria-hidden="true"
                />
                <input
                  id="product-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="نام محصول یا دسته‌بندی…"
                  className="min-h-[48px] w-full border border-soil/20 bg-ivory-50 py-3 pl-11 pr-11 text-[16px] text-soil placeholder:text-soil/40 focus:border-leaf focus:outline-none focus:ring-0"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="پاک کردن جست‌وجو"
                    className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-soil/45 transition-colors hover:text-soil"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-[14px] text-soil/60" role="status">
              {toPersianDigits(results.length)} محصول یافت شد
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3" role="group" aria-label="فیلتر دسته‌بندی محصولات">
            <button
              type="button"
              onClick={() => selectCategory('all')}
              aria-pressed={activeCategory === 'all'}
              className={`min-h-[44px] border px-5 text-[15px] font-semibold transition-colors duration-300 ${
                activeCategory === 'all'
                  ? 'border-forest bg-forest text-ivory'
                  : 'border-soil/20 text-soil/75 hover:border-forest hover:text-forest'
              }`}
            >
              همه محصولات
            </button>
            {productCategories.map((category) => {
              const active = activeCategory === category.slug
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => selectCategory(category.slug)}
                  aria-pressed={active}
                  className={`min-h-[44px] border px-5 text-[15px] font-semibold transition-colors duration-300 ${
                    active
                      ? 'border-forest bg-forest text-ivory'
                      : 'border-soil/20 text-soil/75 hover:border-forest hover:text-forest'
                  }`}
                >
                  {category.name}
                </button>
              )
            })}
          </div>

          {results.length === 0 ? (
            <div className="mt-16 flex flex-col items-center border border-soil/10 bg-ivory-50 px-8 py-16 text-center">
              <PackageSearch className="mb-5 h-10 w-10 text-soil/35" aria-hidden="true" />
              <h2 className="text-[20px] font-bold text-soil">محصولی با این مشخصات پیدا نشد</h2>
              <p className="mt-3 max-w-md text-[15px] text-soil/65">
                می‌توانید عبارت دیگری جست‌وجو کنید، فیلتر دسته‌بندی را بردارید یا درخواست خود را برای
                ما ارسال کنید تا راهنمایی‌تان کنیم.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setQuery('')
                    selectCategory('all')
                  }}
                >
                  نمایش همه محصولات
                </Button>
                <Button to="/collaboration" variant="primary" size="md">
                  درخواست مشاوره
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product, index) => (
                <Reveal key={product.slug} delay={(index % 3) * 70} className="h-full">
                  <article className="group flex h-full flex-col border border-soil/10 bg-ivory-50 shadow-card transition-all duration-500 ease-organic hover:-translate-y-1 hover:border-leaf/40 hover:shadow-lift">
                    <Link
                      to={`/products/${product.slug}`}
                      className="block overflow-hidden"
                      tabIndex={-1}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        width="1280"
                        height="855"
                        loading="lazy"
                        decoding="async"
                        className="h-52 w-full object-cover transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.06]"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="mb-3 text-[12px] font-semibold tracking-[0.16em] text-forest">
                        {categoryName(product.category)}
                      </p>
                      <h2 className="text-[19px] font-bold leading-[1.5] text-soil">
                        <Link
                          to={`/products/${product.slug}`}
                          className="transition-colors hover:text-forest"
                        >
                          {product.title}
                        </Link>
                      </h2>
                      <p className="prose-fa mt-3 flex-1 text-[15px] leading-[1.85] text-soil/70">
                        {product.excerpt}
                      </p>
                      <div className="mt-6 border-t border-soil/10 pt-5">
                        <Link
                          to={`/products/${product.slug}`}
                          className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-forest transition-colors hover:text-leaf"
                        >
                          مشاهده محصول
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
