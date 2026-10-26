const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** Converts Latin digits to Persian digits for display. */
export const toPersianDigits = (value) =>
  String(value ?? '').replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)])

/** Converts Persian/Arabic digits typed by a user back to Latin digits. */
export const toLatinDigits = (value) =>
  String(value ?? '')
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

/** Current Persian (Jalali) year, e.g. ۱۴۰۵ */
export const currentPersianYear = () => {
  try {
    return new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date())
  } catch {
    return '۱۴۰۵'
  }
}
