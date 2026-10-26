import { ArrowLeft } from 'lucide-react'
import { articles } from '../../data/articles.js'
import ArticleCard from '../ui/ArticleCard.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function ArticlesSection() {
  const latest = articles.slice(0, 3)

  return (
    <section className="paper-texture relative overflow-hidden py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="مقالات"
              title="آخرین نوشته‌ها"
              intro="تجربه‌های میدانی و نکات کاربردی درباره‌ی آبیاری، تغذیه‌ی گیاه، خاک و مدیریت مزرعه."
            />
          </Reveal>
          <Reveal delay={100}>
            <Button to="/articles" variant="outline" size="md" className="shrink-0">
              همه مقالات
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 80} className="h-full">
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
