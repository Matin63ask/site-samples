export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'right',
  tone = 'dark',
  className = '',
  as: Heading = 'h2',
}) {
  const isLight = tone === 'light'
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-3 text-[13px] font-semibold tracking-[0.18em] ${
            align === 'center' ? 'justify-center' : ''
          } ${isLight ? 'text-sage' : 'text-forest'}`}
        >
          <span className={`h-px w-8 ${isLight ? 'bg-sage/60' : 'bg-leaf/60'}`} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={`text-[clamp(1.9rem,4.2vw,3.1rem)] font-extrabold leading-[1.18] ${
          isLight ? 'text-ivory' : 'text-soil'
        }`}
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={`mt-5 text-[17px] leading-[1.85] ${
            isLight ? 'text-ivory/75' : 'text-soil/70'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
