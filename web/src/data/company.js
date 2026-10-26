/**
 * Company facts. Only information that came with the project is filled in here —
 * anything the company has not provided (email, street address, social profile
 * URLs) is intentionally left empty rather than invented, and the UI adapts.
 */
export const company = {
  name: 'پایا پویش سبز',
  latinName: 'Paya Pooyesh Sabz',
  tagline: 'حافظ منافع آب، خاک و گیاه',
  headline: 'از ریشه‌های سالم تا کشاورزی پایدار',
  lead: 'راهکارهای تخصصی در زمینه آبیاری، تغذیه گیاهان، اصلاح خاک و توسعه کشاورزی نوین',
  shortDescription:
    'پایا پویش سبز با تکیه بر تجربه‌ی کارشناسی در حوزه‌ی آب، خاک و تغذیه‌ی گیاه، خدمات طراحی و اجرای سیستم‌های آبیاری تحت فشار، تأمین تجهیزات و مشاوره‌ی تخصصی کشاورزی را برای کشاورزان، باغداران و گلخانه‌داران ارائه می‌کند.',
  foundedYear: '۱۳۹۰',
  phones: [
    { display: '۰۲۱-۴۴۴۸۱۷۱۶', dial: '+982144481716' },
    { display: '۰۲۱-۴۴۴۸۱۷۱۷', dial: '+982144481717' },
  ],
  email: '',
  address: { city: 'تهران، ایران', detail: '' },
  website: { display: 'payapooyesh.com', href: 'https://payapooyesh.com' },
  socials: [
    {
      name: 'واتس‌اپ',
      icon: 'whatsapp',
      href: 'https://wa.me/982144481716',
    },
    // نشانی صفحه‌های اینستاگرام و تلگرام شرکت داده نشده است؛ پس از دریافت، مقدار href را تکمیل کنید.
    { name: 'تلگرام', icon: 'telegram', href: '' },
    { name: 'اینستاگرام', icon: 'instagram', href: '' },
  ],
}

export const navigation = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'درباره ما', href: '/about' },
  { label: 'محصولات', href: '/products' },
  { label: 'مشاوره', href: '/consulting' },
  { label: 'فعالیت‌ها', href: '/activities' },
  { label: 'مقالات', href: '/articles' },
  { label: 'تماس با ما', href: '/contact' },
]

export const consultationCta = { label: 'درخواست مشاوره تخصصی', href: '/collaboration' }

export const pageTitles = {
  '/': 'پایا پویش سبز | آبیاری، تغذیه گیاهان و اصلاح خاک',
  '/about': 'درباره پایا پویش سبز | تجربه‌ی کارشناسی در آب، خاک و گیاه',
  '/products': 'محصولات پایا پویش سبز | تجهیزات آبیاری، کود و بستر کشت',
  '/activities': 'فعالیت‌های پایا پویش سبز | از طراحی آبیاری تا اصلاح خاک',
  '/consulting': 'مشاوره تخصصی آبیاری، تغذیه و بیماری گیاهان',
  '/collaboration': 'فرم درخواست همکاری | پایا پویش سبز',
  '/articles': 'مقالات کشاورزی | پایا پویش سبز',
  '/contact': 'تماس با پایا پویش سبز',
}
