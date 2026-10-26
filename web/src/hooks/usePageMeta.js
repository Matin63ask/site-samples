import { useEffect } from 'react'

/**
 * Per-page SEO: unique title, description and canonical link.
 */
export default function usePageMeta({ title, description, path = '' }) {
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        document.head.appendChild(el)
      }
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
    }

    if (description) {
      setMeta('meta[name="description"]', { name: 'description', content: description })
      setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    }
    if (title) {
      setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    }
    if (path !== null) {
      let link = document.head.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', window.location.origin + path)
    }
  }, [title, description, path])
}

/** Injects a JSON-LD structured-data block and removes it on unmount. */
export function useStructuredData(id, data) {
  useEffect(() => {
    if (!data) return undefined
    let script = document.getElementById(id)
    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [id, data])
}
