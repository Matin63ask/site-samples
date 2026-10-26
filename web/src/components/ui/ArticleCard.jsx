import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays } from 'lucide-react'

export default function ArticleCard({ article, className = '' }) {
  return (
    <article
      className={`group flex h-full flex-col border border-soil/10 bg-ivory-50 shadow-card transition-all duration-500 ease-organic hover:-translate-y-1 hover:border-leaf/40 hover:shadow-lift ${className}`}
    >
      <Link to={`/articles/${article.slug}`} className="block overflow-hidden" tabIndex={-1}>
        <img
          src={article.image}
          alt={article.title}
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          className="h-52 w-full object-cover transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.06]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-4 flex items-center gap-4 text-[12px] text-soil/55">
          <span className="font-semibold tracking-[0.14em] text-forest">{article.category}</span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {article.date}
          </span>
        </div>
        <h3 className="text-[20px] font-bold leading-[1.55] text-soil">
          <Link to={`/articles/${article.slug}`} className="transition-colors hover:text-forest">
            {article.title}
          </Link>
        </h3>
        <p className="prose-fa mt-4 flex-1 text-[15px] leading-[1.9] text-soil/70">
          {article.excerpt}
        </p>
        <div className="mt-6 border-t border-soil/10 pt-5">
          <Link
            to={`/articles/${article.slug}`}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-forest transition-colors hover:text-leaf"
          >
            مطالعه بیشتر
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
