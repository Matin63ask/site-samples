import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react'
import { validateCollaboration } from '../../utils/validation.js'

const EMPTY = { fullName: '', phone: '', email: '', subject: '', message: '' }

function Field({ id, label, error, children }) {
  return (
    <div className="relative">
      {children}
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Collaboration / inquiry form. Submissions are validated on the client and again
 * on the server, then stored in the application database (no pretend success state).
 */
export default function CollaborationForm({ defaultSubject = '', submitLabel = 'ارسال درخواست' }) {
  const [values, setValues] = useState({ ...EMPTY, subject: defaultSubject })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [savedName, setSavedName] = useState('')
  const feedbackRef = useRef(null)

  useEffect(() => {
    if (defaultSubject) setValues((current) => ({ ...current, subject: defaultSubject }))
  }, [defaultSubject])

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const onChange = (event) => {
    event.preventDefault()
    const { errors: nextErrors, payload } = validateCollaboration(values)
    setErrors(nextErrors)
    setServerError('')
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      feedbackRef.current?.focus()
      return
    }

    setStatus('loading')
    fetch('/api/collaboration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}))
        if (!response.ok) {
          if (data.errors) setErrors(data.errors)
          throw new Error(data.message || 'ثبت درخواست انجام نشد.')
        }
        setSavedName(payload.fullName)
        setValues({ ...EMPTY, subject: defaultSubject })
        setStatus('success')
      })
      .catch((error) => {
        setServerError(error.message || 'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.')
        setStatus('error')
      })
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="border border-leaf/35 bg-ivory-50 p-8 text-right shadow-card"
        ref={feedbackRef}
        tabIndex={-1}
      >
        <CheckCircle2 className="mb-4 h-10 w-10 text-leaf" aria-hidden="true" />
        <h3 className="text-[22px] font-extrabold text-soil">درخواست شما ثبت شد</h3>
        <p className="mt-4 text-[16px] leading-[1.9] text-soil/75">
          {savedName ? `${savedName} عزیز، ` : ''}درخواست همکاری شما در سیستم ثبت شد و کارشناسان ما
          در روزهای کاری با شما تماس می‌گیرند. برای پیگیری سریع‌تر می‌توانید با شماره‌های شرکت تماس
          بگیرید.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 inline-flex min-h-[46px] items-center gap-2 bg-soil px-6 font-semibold text-ivory transition-colors duration-300 hover:bg-soil-700"
        >
          ثبت درخواست جدید
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onChange} noValidate className="space-y-8" aria-label="فرم درخواست همکاری">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <Field id="fullName" label="نام و نام خانوادگی *" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className="field-line"
            placeholder=" "
            value={values.fullName}
            onChange={update('fullName')}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
        </Field>

        <Field id="phone" label="شماره تماس *" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            className="field-line text-right"
            placeholder=" "
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
        </Field>

        <Field id="email" label="ایمیل" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            className="field-line text-right"
            placeholder=" "
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>

        <Field id="subject" label="موضوع همکاری" error={errors.subject}>
          <input
            id="subject"
            name="subject"
            type="text"
            className="field-line"
            placeholder=" "
            value={values.subject}
            onChange={update('subject')}
          />
        </Field>
      </div>

      <Field id="message" label="متن درخواست *" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="field-line resize-y"
          placeholder=" "
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      <div ref={feedbackRef} tabIndex={-1} aria-live="polite">
        {serverError && (
          <p role="alert" className="mb-5 flex items-start gap-2 border border-red-300 bg-red-50 p-4 text-[14px] text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {serverError}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-soil px-8 font-semibold text-ivory transition-colors duration-300 hover:bg-soil-700 disabled:opacity-60 sm:w-auto"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {submitLabel}
        </button>
        <p className="text-[13px] leading-relaxed text-soil/55">
          اطلاعات شما تنها برای پاسخ‌گویی به همین درخواست استفاده می‌شود.
        </p>
      </div>
    </form>
  )
}
