import { toLatinDigits } from './format.js'

const PHONE = /^(?:\+98|0098|0)?(?:9\d{9}|[1-8]\d{8,9})$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/

export function validateCollaboration(values, { requireSubject = false } = {}) {
  const errors = {}
  const fullName = values.fullName.trim()
  const phone = toLatinDigits(values.phone).replace(/[\s-()]/g, '')
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (fullName.length < 3) errors.fullName = 'نام و نام خانوادگی را کامل وارد کنید.'
  if (!phone) errors.phone = 'شماره تماس را وارد کنید.'
  else if (!PHONE.test(phone)) errors.phone = 'شماره تماس معتبر نیست. نمونه: ۰۹۱۲۳۴۵۶۷۸۹'
  if (email && !EMAIL.test(email)) errors.email = 'نشانی ایمیل معتبر نیست.'
  if (requireSubject && subject.length < 3) errors.subject = 'موضوع همکاری را وارد کنید.'
  if (message.length < 10) errors.message = 'متن درخواست را کامل‌تر بنویسید (حداقل ۱۰ نویسه).'

  return { errors, payload: { fullName, phone, email, subject, message } }
}

export function validateEmail(value) {
  const email = String(value ?? '').trim()
  if (!email) return 'نشانی ایمیل را وارد کنید.'
  if (!EMAIL.test(email)) return 'نشانی ایمیل معتبر نیست.'
  return ''
}
