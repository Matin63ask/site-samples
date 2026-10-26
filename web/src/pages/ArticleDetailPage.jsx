import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clock, FileQuestion } from 'lucide-react'
import { getArticle, relatedArticles } from '../data/articles.js'
import usePageMeta, { useStructuredData } from '../hooks/usePageMeta.js'
import PageHero from '../components/layout/PageHero.jsx'
import ArticleCard from '../components/ui/ArticleCard.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import SoilEdge from '../components/ui/SoilEdge.jsx'
import { toPersianDigits } from '../utils/format.js'

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const article = getArticle(slug)

  usePageMeta({
    title: article ? `${article.title} | پایا پویش سبز` : 'مقاله یافت نشد | پایا پویش سبز',
    description: article ? article.excerpt : 'مقاله‌ی مورد نظر در پایا پویش سبز پیدا نشد.',
    path: `/articles/${slug}`,
  })

  useStructuredData(
    'ld-article',
    article
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: `${window.location.origin}${article.image}`,
          datePublished: article.dateISO,
          articleSection: article.category,
          inLanguage: 'fa-IR',
        }
      : null,
  )

  if (!article) {
    return (
      <>
        <PageHero
          eyebrow="مقالات"
          title="این مقاله پیدا نشد"
          intro="ممکن است نشانی صفحه تغییر کرده باشد یا مقاله از فهرست خارج شده باشد."
          breadcrumb={[{ label: 'مقالات', href: '/articles' }, { label: 'مقاله یافت نشد' }]}
        />
        <section className="paper-texture py-20 lg:py-24">
          <div className="shell flex flex-col items-center text-center">
            <FileQuestion className="h-11 w-11 text-soil/35" aria-hidden="true" />
            <h2 className="mt-6 text-[24px] font-extrabold text-soil">مقاله‌ای با این نشانی نیست</h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.9] text-soil/70">
              می‌توانید فهرست مقالات را ببینید یا درخواست مشاوره ثبت کنید.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/articles" variant="primary" size="md">
                همه مقالات
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="outline" size="md">
                تماس با ما
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  const related = relatedArticles(article.slug, 3)

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        intro={article.excerpt}
        image={article.image}
        breadcrumb={[{ label: 'مقالات', href: '/articles' }, { label: article.title }]}
      />

      <section className="paper-texture py-16 lg:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-soil/10 pb-6 text-[13px] text-soil/60">
                <span className="font-semibold tracking-[0.16em] text-forest">{article.category}</span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {toPersianDigits(article.readingMinutes)} دقیقه مطالعه
                </span>
              </div>

              <div className="mt-8 overflow-hidden border border-soil/10 bg-ivory-50">
                <img
                  src={article.image}
                  alt={article.title}
                  width="1280"
                  height="855"
                  loading="eager"
                  decoding="async"
                  className="h-[260px] w-full object-cover sm:h-[380px]"
                />
              </div>

              <p className="prose-fa mt-10 border-r-2 border-leaf/60 pr-6 text-[19px] font-medium leading-[2] text-soil/85">
                {article.lead}
              </p>
            </Reveal>

            <div className="mt-12 space-y-12">
              {article.sections.map((section, index) => (
                <Reveal key={section.heading} delay={Math.min(index * 40, 120)}>
                  <h2
                    id={`section-${index + 1}`}
                    className="scroll-mt-32 text-[clamp(1.2rem,2.2vw,1.55rem)] font-extrabold leading-[1.45] text-soil"
                  >
                    {section.heading}
                  </h2>
                  <div className="prose-fa mt-5 space-y-5 text-[17px] leading-[2] text-soil/75">
                    {section.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-soil/10 pt-8 sm:flex-row sm:items-center">
              <p className="text-[15px] text-soil/65">
                این مطلب را می‌توانید برای کشاورزان و همکاران خود بفرستید.
              </p>
              <Link
                to="/articles"
                className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-forest transition-colors hover:text-leaf"
              >
                بازگشت به فهرست مقالات
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </article>

          {/* sidebar: contents + invitation */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal className="border border-soil/10 bg-ivory-50 p-7">
                <h2 className="text-[15px] font-bold text-soil">در این مقاله</h2>
                <ol className="mt-5 space-y-3 text-[14px] leading-[1.8]">
                  {article.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#section-${index + 1}`}
                        className="text-soil/70 transition-colors hover:text-forest"
                      >
                        {toPersianDigits(index + 1)}. {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={100} className="mt-6 border border-soil/10 bg-forest-900 p-7 text-ivory">
                <h2 className="text-[18px] font-bold text-ivory">پرسشی درباره‌ی مزرعه‌ی خود دارید؟</h2>
                <p className="prose-fa mt-3 text-[14px] leading-[1.9] text-ivory/70">
                  شرایط هر زمین متفاوت است؛ برای دریافت توصیه‌ی فنی متناسب با کشت خود، درخواست
                  مشاوره ثبت کنید.
                </p>
                <Button to="/collaboration" variant="leaf" size="sm" className="mt-6 w-full">
                  درخواست مشاوره
                </Button>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative">
        <SoilEdge position="static" topFill="#F5F0E5" fill="#1A1612" crumb="#2B2318" className="h-12 md:h-20" />
        <div className="soil-surface grain-overlay relative py-16 text-ivory lg:py-20">
          <div className="shell">
            <SectionHeading tone="light" eyebrow="ادامه‌ی مطالعه" title="مقالات مرتبط" />
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70} className="h-full">
                  <ArticleCard article={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
