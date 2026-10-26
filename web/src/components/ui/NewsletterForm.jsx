import { useState } from 'react'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { validateEmail } from '../../utils/validation.js'

/**
 * Newsletter signup — posts to the app's own API and stores the address in the
 * database, so a submission really is recorded.
 */
export default function NewsletterForm({ tone = 'light' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')
  const isLight = tone === 'light'

  const onSubmit = async (event) => {
    event.preventDefault()
    const message = validateEmail(email)
    if (message) {
      setError(message)
      setStatus('idle')
      return
    }
    setError('')
    setStatus('loading')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || 'ثبت عضویت انجام نشد.')
      setStatus('done')
      setEmail('')
    } catch (err) {
      setError(err.message || 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor="newsletter-email" className="mb-2 block text-[13px] text-ivory/70">
        نشانی ایمیل برای دریافت مطالب کشاورزی
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          dir="ltr"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className={`min-h-[46px] flex-1 border bg-ivory/95 px-4 text-[15px] text-soil placeholder:text-soil/35 focus:outline-none focus:ring-0 ${
            error ? 'border-red-400' : 'border-transparent focus:border-sage'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex min-h-[46px] items-center justify-center gap-2 bg-leaf px-6 font-semibold text-white transition-colors duration-300 hover:bg-leaf-500 disabled:opacity-60"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          عضویت
        </button>
      </div>

      {error && (
        <p id="newsletter-error" role="alert" className="mt-3 text-[13px] text-red-300">
          {error}
        </p>
      )}
      {status === 'done' && (
        <p
          role="status"
          className={`mt-3 flex items-center gap-2 text-[13px] ${isLight ? 'text-sage' : 'text-forest'}`}
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          عضویت شما ثبت شد. از همراهی‌تان سپاسگزاریم.
        </p>
      )}
    </form>
  )
}
