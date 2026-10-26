/**
 * Irregular soil-edge transition between two surfaces — the organic boundary that
 * gives the layout its "sub-surface" feel instead of a straight cut.
 *
 * topFill is the surface above the edge, fill the surface below it; crumb draws a
 * thin looser layer just under the boundary. Fully self-contained, so it can be a
 * static block between sections or an absolute overlay inside a section.
 */
const EDGE =
  'M0,96 L0,52 C60,44 96,58 150,50 C196,44 232,26 286,40 C330,52 360,30 404,36 C452,43 486,64 534,52 C574,42 604,58 646,62 C688,66 716,44 762,38 C806,32 842,52 886,56 C926,60 958,74 1006,66 C1048,59 1080,40 1126,44 C1170,48 1204,66 1252,60 C1294,55 1322,38 1368,44 C1396,48 1416,50 1440,46 L1440,96 Z'

const POSITIONS = {
  static: 'relative',
  'absolute-bottom': 'absolute inset-x-0 bottom-0',
  'absolute-top': 'absolute inset-x-0 top-0',
}

export default function SoilEdge({
  topFill = '#F5F0E5',
  fill = '#1A1612',
  crumb = '',
  flip = false,
  position = 'static',
  className = 'h-14 w-full md:h-24',
}) {
  return (
    <div className={`${POSITIONS[position]} z-20 leading-[0] ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={flip ? { transform: 'scaleY(-1)' } : undefined}
      >
        <rect width="1440" height="96" fill={topFill} />
        {crumb && <path d={EDGE} fill={crumb} transform="translate(0,-10)" />}
        <path d={EDGE} fill={fill} />
      </svg>
    </div>
  )
}
