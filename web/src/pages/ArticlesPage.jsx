import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock, Search, X } from 'lucide-react'
import { articles } from '../data/articles.js'
import usePageMeta from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import ArticleCard from '../components/ui/ArticleCard.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { toPersianDigits } from '../utils/format.js'

export default function ArticlesPage() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  usePageMeta({
    title: 'مقالات کشاورزی | پایا پویش سبز',
    description:
      'مقالات و یادداشت‌های تخصصی پایا پویش سبز درباره آبیاری تحت فشار، تغذیه گیاهان، خاک و بستر کشت، مدیریت مزرعه و کشاورزی پایدار.',
    path: '/articles',
  })

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(articles.map((article) => article.category)))],
    [],
  )

  const results = useMemo(() => {
    const term = query.trim()
    return articles.filter((article) => {
      if (category !== 'all' && article.category !== category) return false
      if (!term) return true
      return `${article.title} ${article.excerpt} ${article.category}`.includes(term)
    })
  }, [category, query])

  const [featured, ...rest] = results
  const showFeatured = category === 'all' && !query.trim() && featured

  return (
    <>
      <PageHero
        eyebrow="مقالات"
        title="یادداشت‌های کشاورزی"
        intro="تجربه‌های میدانی و نکات کاربردی درباره‌ی آب، خاک، تغذیه‌ی گیاه و مدیریت مزرعه."
        image="/images/leaf-drops.webp"
        breadcrumb={[{ label: 'مقالات' }]}
      />

      <section className="paper-texture py-16 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full max-w-md">
              <label htmlFor="article-search" className="mb-3 block text-[14px] font-semibold text-soil">
                جست‌وجو در مقالات
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soil/40"
                  aria-hidden="true"
                />
                <input
                  id="article-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="موضوع یا عنوان مقاله…"
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
              {toPersianDigits(results.length)} مقاله یافت شد
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3" role="group" aria-label="فیلتر موضوع مقالات">
            {categories.map((item) => {
              const active = category === item
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={active}
                  className={`min-h-[44px] border px-5 text-[15px] font-semibold transition-colors duration-300 ${
                    active
                      ? 'border-forest bg-forest text-ivory'
                      : 'border-soil/20 text-soil/75 hover:border-forest hover:text-forest'
                  }`}
                >
                  {item === 'all' ? 'همه موضوعات' : item}
                </button>
              )
            })}
          </div>

          {results.length === 0 && (
            <div className="mt-16 border border-soil/10 bg-ivory-50 px-8 py-16 text-center">
              <h2 className="text-[20px] font-bold text-soil">مقاله‌ای با این مشخصات پیدا نشد</h2>
              <p className="mt-3 text-[15px] text-soil/65">
                عبارت دیگری جست‌وجو کنید یا فیلتر موضوع را بردارید.
              </p>
              <div className="mt-7">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setQuery('')
                    setCategory('all')
                  }}
                >
                  نمایش همه مقالات
                </Button>
              </div>
            </div>
          )}

          {showFeatured && (
            <Reveal className="mt-14">
              <article className="group grid overflow-hidden border border-soil/10 bg-ivory-50 shadow-card transition-shadow duration-500 ease-organic hover:shadow-lift lg:grid-cols-12">
                <Link
                  to={`/articles/${featured.slug}`}
                  className="block overflow-hidden lg:col-span-7"
                  tabIndex={-1}
                >
                  <img
                    src={featured.image}
                    alt={featured.title}
                    width="1280"
                    height="855"
                    loading="eager"
                    decoding="async"
                    className="h-64 w-full object-cover transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.04] lg:h-full"
                  />
                </Link>
                <div className="flex flex-col justify-center p-8 lg:col-span-5 lg:p-12">
                  <div className="flex flex-wrap items-center gap-4 text-[12px] text-soil/55">
                    <span className="font-semibold tracking-[0.16em] text-forest">
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {toPersianDigits(featured.readingMinutes)} دقیقه مطالعه
                    </span>
                  </div>
                  <h2 className="mt-5 text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-[1.4] text-soil">
                    <Link
                      to={`/articles/${featured.slug}`}
                      className="transition-colors hover:text-forest"
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="prose-fa mt-4 text-[16px] leading-[1.9] text-soil/70">
                    {featured.excerpt}
                  </p>
                  <Link
                    to={`/articles/${featured.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-forest transition-colors hover:text-leaf"
                  >
                    مطالعه مقاله
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          )}

          {(showFeatured ? rest : results).length > 0 && (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(showFeatured ? rest : results).map((article, index) => (
                <Reveal key={article.slug} delay={(index % 3) * 70} className="h-full">
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
