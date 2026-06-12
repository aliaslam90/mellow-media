// Reusable decorative SVG components for Mellow Media (70s sunset edition)

// Flower image component — renders one of the 7 uploaded SVG assets.
// v = 1–7 (variant). size, style, className all preserved.
// The color/outline/center props are accepted but ignored (images are fixed-color).
const GroovyFlower = ({ size = 40, v = 1, style = {}, className = '', color, outline, center }) => (
  <img
    src={`assets/flowers/flower-${Math.max(1, Math.min(7, Math.round(v)))}.svg`}
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    style={{ display: 'inline-block', width: size, height: size, flexShrink: 0, ...style }}
    className={className}
  />
);

// Daisy alias — kept for backward compat
const Daisy = (props) => <GroovyFlower {...props} />;

const Sparkle = ({ size = 22, color = '#CE6514', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style} className={className} aria-hidden="true">
    <path
      d="M50 5 C50 32, 55 45, 95 50 C55 55, 50 68, 50 95 C50 68, 45 55, 5 50 C45 45, 50 32, 50 5 Z"
      fill={color}
    />
  </svg>
);

const StarSparkle = ({ size = 18, color = '#CE6514', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style} className={className} aria-hidden="true">
    <path d="M50 0 L57 43 L100 50 L57 57 L50 100 L43 57 L0 50 L43 43 Z" fill={color} />
  </svg>
);

// Retro mushroom (cap + stem). Tasteful, palette-driven.
const Mushroom = ({ size = 64, cap = '#F1732D', spot = '#FFF1D4', stem = '#FBC2A4', shade = '#A84E0A', style = {}, className = '' }) => (
  <svg width={size} height={size * 1.05} viewBox="0 0 100 105" style={style} className={className} aria-hidden="true">
    {/* Stem */}
    <path d="M38 58 Q38 90 30 100 L70 100 Q62 90 62 58 Z" fill={stem} />
    <path d="M38 58 Q38 90 30 100 L42 100 Q44 90 44 58 Z" fill={shade} opacity="0.18" />
    {/* Cap */}
    <path d="M8 58 Q8 18 50 18 Q92 18 92 58 Q92 64 86 64 L14 64 Q8 64 8 58 Z" fill={cap} />
    {/* Cap shade */}
    <path d="M8 58 Q8 30 26 22 Q22 38 22 58 Q22 64 14 64 Q8 64 8 58 Z" fill={shade} opacity="0.22" />
    {/* Spots */}
    <ellipse cx="32" cy="36" rx="9" ry="7" fill={spot} />
    <ellipse cx="60" cy="30" rx="7" ry="5" fill={spot} />
    <ellipse cx="74" cy="46" rx="5" ry="4" fill={spot} />
    {/* Gills hint */}
    <rect x="14" y="60" width="72" height="4" rx="2" fill={shade} opacity="0.25" />
  </svg>
);

// Wavy stripe background — now sunset palette (peach/coral/pink/cream/mustard)
const WavyStripes = ({ style = {}, opacity = 0.5 }) => (
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
    style={{ width: '100%', height: '100%', opacity, ...style }} aria-hidden="true">
    <defs>
      <pattern id="wavyA" x="0" y="0" width="1440" height="900" patternUnits="userSpaceOnUse">
        {[
          { y: -120, c: '#F1732D' },
          { y: 0, c: '#F78762' },
          { y: 120, c: '#FFF1D4' },
          { y: 240, c: '#EA829A' },
          { y: 360, c: '#CE6514' },
          { y: 480, c: '#FBC2A4' },
          { y: 600, c: '#FFF1D4' },
          { y: 720, c: '#F29DB5' },
          { y: 840, c: '#CE6514' },
        ].map((b, i) => (
          <path
            key={i}
            d={`M -100 ${b.y} C 200 ${b.y - 60}, 500 ${b.y + 60}, 800 ${b.y} S 1300 ${b.y - 60}, 1600 ${b.y} L 1600 ${b.y + 120} C 1300 ${b.y + 60}, 800 ${b.y + 180}, 500 ${b.y + 120} S 200 ${b.y + 60}, -100 ${b.y + 120} Z`}
            fill={b.c}
          />
        ))}
      </pattern>
    </defs>
    <rect width="1440" height="900" fill="url(#wavyA)" />
  </svg>
);

// Concentric arches — sunset coloring
const WavyArches = ({ style = {} }) => (
  <svg viewBox="0 0 600 600" style={style} aria-hidden="true">
    {[
      { r: 280, c: '#CE6514' },
      { r: 230, c: '#F1732D' },
      { r: 185, c: '#F78762' },
      { r: 140, c: '#EA829A' },
      { r: 95, c: '#FBC2A4' },
      { r: 55, c: '#F29DB5' },
    ].map((ring, i) => (
      <circle key={i} cx="300" cy="300" r={ring.r} fill="none" stroke={ring.c} strokeWidth="22" />
    ))}
  </svg>
);

// Section divider wave
const WavyDivider = ({ fill = '#FFF1D4', bg = 'transparent', flip = false, height = 80 }) => (
  <div style={{ background: bg, lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none' }}>
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height }} aria-hidden="true">
      <path
        d="M0,60 C180,100 360,20 540,40 C720,60 900,110 1080,90 C1260,70 1380,30 1440,40 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  </div>
);

// 70s mirror disco ball — cream/silver base with colored facet tiles.
// Continuous spin + scroll-linked drop. Honors prefers-reduced-motion.
// `stringLength` lets the caller decide how long the hanging line is.
const DiscoBall = ({ size = 260, scrollY = 0, dropMax = 90, stringLength }) => {
  const reduce = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const drop = reduce ? 0 : Math.min(scrollY * 0.22, dropMax);
  const sway = reduce ? 0 : Math.sin(scrollY / 240) * 5;
  const strLen = stringLength != null ? stringLength : size * 0.5;
  const totalH = strLen + size;

  // Deterministic palette of facet tile colors (sunset)
  const tilePalette = ['#EA829A', '#F29DB5', '#F78762', '#F1732D', '#CB9626', '#6BB1AE', '#FBC2A4', '#FFE7C2'];
  // Pre-laid colored tile spots (x,y in 200-viewBox space, w,h, color index)
  const tiles = [
    [40, 56, 13, 9, 0], [76, 38, 12, 9, 2], [120, 84, 11, 8, 5],
    [56, 108, 13, 9, 3], [138, 128, 11, 8, 1], [92, 148, 12, 8, 6],
    [44, 132, 11, 8, 4], [110, 50, 12, 8, 0], [158, 96, 10, 8, 2],
    [30, 90, 11, 8, 5], [72, 162, 11, 7, 1], [134, 44, 10, 7, 3],
    [102, 116, 11, 8, 7], [86, 76, 10, 7, 4],
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: totalH,
        transform: `translate3d(0, ${drop}px, 0)`,
        transition: 'transform 0.12s linear',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* Pendulum group — swings as a unit around the top anchor */}
      <div style={{
        position: 'absolute', inset: 0,
        transformOrigin: 'top center',
        animation: reduce ? 'none' : 'discoSwing 3.8s ease-in-out infinite',
      }}>
        {/* String */}
        <div
          style={{
            position: 'absolute', left: '50%', top: 0,
            width: 1.5, height: strLen + 4,
            background: 'linear-gradient(to bottom, rgba(92,61,30,0.55), rgba(58,38,24,0.7))',
            transform: 'translateX(-50%)',
          }}
        />
        {/* Ball wrapper */}
        <div style={{
          position: 'absolute', top: strLen - 6, left: 0,
          width: size, height: size,
        }}>
          <svg viewBox="0 0 200 200" width={size} height={size}>
            <defs>
              {/* Cream / silver mirror-ball base */}
              <radialGradient id="ballGrad" cx="36%" cy="30%" r="82%">
                <stop offset="0%"  stopColor="#FFFDF5" />
                <stop offset="30%" stopColor="#FFE7C2" />
                <stop offset="62%" stopColor="#EAD3B5" />
                <stop offset="100%" stopColor="#7A5328" />
              </radialGradient>
              <radialGradient id="ballShine" cx="32%" cy="26%" r="22%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="ballAmbient" cx="50%" cy="80%" r="60%">
                <stop offset="0%" stopColor="#EA829A" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#EA829A" stopOpacity="0" />
              </radialGradient>
              <clipPath id="ballClip">
                <circle cx="100" cy="100" r="92" />
              </clipPath>
            </defs>
            {/* Cap */}
            <rect x="88" y="2" width="24" height="14" rx="3" fill="#7A5328" />
            <rect x="84" y="12" width="32" height="6" rx="2" fill="#3A2618" />
            {/* Ball base */}
            <circle cx="100" cy="100" r="92" fill="url(#ballGrad)" />
            <circle cx="100" cy="100" r="92" fill="url(#ballAmbient)" />
            {/* Facet grid */}
            <g clipPath="url(#ballClip)" stroke="#5C3D1E" strokeOpacity="0.42" strokeWidth="0.8" fill="none">
              {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x) => (
                <ellipse key={`v${x}`} cx="100" cy="100" rx={Math.abs(100 - x) || 5} ry="92" />
              ))}
              {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190].map((y) => (
                <line key={`h${y}`} x1="8" y1={y} x2="192" y2={y} />
              ))}
            </g>
            {/* Subtle silvery highlight tiles */}
            <g clipPath="url(#ballClip)" fill="#FFFDF5" opacity="0.55">
              <rect x="40" y="60" width="14" height="10" />
              <rect x="74" y="44" width="12" height="9" />
              <rect x="120" y="88" width="11" height="8" />
              <rect x="56" y="110" width="13" height="9" />
            </g>
            {/* Colored disco facet tiles (sunset palette reflections) */}
            <g clipPath="url(#ballClip)" opacity="0.85">
              {tiles.map(([x, y, w, h, ci], i) => (
                <rect key={`t${i}`} x={x} y={y} width={w} height={h} fill={tilePalette[ci]} />
              ))}
            </g>
            {/* Top shine */}
            <circle cx="100" cy="100" r="92" fill="url(#ballShine)" />
            {/* Rim */}
            <circle cx="100" cy="100" r="92" fill="none" stroke="#EA829A" strokeOpacity="0.5" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Spinning vinyl record accent — same look as the About section disc
const Vinyl = ({ size = 130, label = 'var(--coral)', center = 'var(--peach)', style = {}, className = '' }) => (
  <div className={className} style={{
    width: size, height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${label} 18%, #2C1A0E 19%, #2C1A0E 24%, #5C3D1E 25%, #5C3D1E 32%, #2C1A0E 33%, #2C1A0E 96%, var(--burnt-orange) 97%)`,
    boxShadow: '0 18px 30px -10px rgba(44,26,14,0.4)',
    animation: 'spinSlow 16s linear infinite',
    position: 'relative',
    ...style,
  }} aria-hidden="true">
    <div style={{
      position: 'absolute', inset: '45%',
      background: center, borderRadius: '50%',
      boxShadow: '0 0 0 2px var(--espresso)',
    }} />
  </div>
);

// Circular brand badge — round seal with curved text + flower in the middle
const BrandBadge = ({ size = 220, text = 'MELLOW MEDIA · SOLO SOCIAL STUDIO · EST 2025 · ', spin = true, bg = '#CE6514', textColor = '#FFF1D4' }) => (
  <div
    aria-hidden="true"
    style={{
      width: size, height: size, position: 'relative',
      display: 'inline-block', borderRadius: '50%',
      background: bg, color: textColor,
      boxShadow: '0 22px 44px -16px rgba(206, 101, 20, 0.55), inset 0 -8px 18px rgba(58,38,24,0.18)',
    }}
  >
    <svg viewBox="0 0 240 240" width={size} height={size}
      style={{
        position: 'absolute', inset: 0,
        animation: spin ? 'spinSlow 28s linear infinite' : 'none',
      }}
    >
      <defs>
        <path id="badgeCirc" d="M 120,120 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0" />
      </defs>
      <text fontFamily="Caprasimo, Cooper Black, serif" fontSize="17" fill={textColor} letterSpacing="4" style={{ textTransform: 'uppercase' }}>
        <textPath href="#badgeCirc" startOffset="0">{text + text}</textPath>
      </text>
      {/* Inner thin ring */}
      <circle cx="120" cy="120" r="76" fill="none" stroke={textColor} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 5" />
    </svg>
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <GroovyFlower size={size * 0.42} v={1} />
    </div>
  </div>
);

// Faux Instagram-style content card used in the hero collage
const PostCard = ({
  variant = 'photo',
  bg = '#F78762',
  accent = '#FFF1D4',
  caption = '',
  username = '@mellowmedia',
  rotate = 0,
  size = 'md',
  style = {},
}) => {
  const dims = size === 'lg' ? { w: 230, h: 290 } : size === 'sm' ? { w: 160, h: 200 } : { w: 200, h: 250 };
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: dims.w, height: dims.h,
        background: '#FFF9EF',
        borderRadius: 18,
        padding: 10,
        boxShadow: '0 20px 40px -16px rgba(58,38,24,0.28), 0 0 0 1px rgba(58,38,24,0.05)',
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center center',
        display: 'flex', flexDirection: 'column', gap: 8,
        ...style,
      }}
    >
      {/* Image area */}
      <div style={{
        flex: 1, borderRadius: 12, overflow: 'hidden', position: 'relative',
        background: variant === 'quote'
          ? `linear-gradient(135deg, ${bg} 0%, ${accent} 100%)`
          : variant === 'flower'
          ? `radial-gradient(circle at 50% 50%, ${accent} 0%, ${bg} 70%)`
          : `linear-gradient(180deg, ${bg} 0%, ${accent} 110%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {variant === 'flower' && <GroovyFlower size={dims.w * 0.55} v={3} />}
        {variant === 'quote' && (
          <div className="font-display" style={{
            color: '#FFF9EF', fontSize: 22, lineHeight: 1.05, textAlign: 'center',
            padding: '0 16px', textWrap: 'balance',
          }}>
            {caption || 'made for the chill girlies'}
          </div>
        )}
        {variant === 'sparkle' && (
          <div style={{ position: 'relative', width: '70%', height: '70%' }}>
            <Sparkle size={dims.w * 0.32} color="#FFF1D4" style={{ position: 'absolute', top: '8%', left: '20%' }} />
            <StarSparkle size={dims.w * 0.22} color="#FFF1D4" style={{ position: 'absolute', bottom: '12%', right: '14%' }} />
            <Sparkle size={dims.w * 0.18} color="#FFF1D4" style={{ position: 'absolute', bottom: '38%', left: '8%' }} />
          </div>
        )}
        {variant === 'photo' && (
          <div style={{ color: '#FFF9EF', fontSize: 14, fontWeight: 700, opacity: 0.85, letterSpacing: '0.18em' }}>
            {caption || '✿  feed feels'}
          </div>
        )}
      </div>
      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 6px 6px' }}>
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          background: `linear-gradient(135deg, ${bg}, ${accent})`,
          flexShrink: 0,
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#2C1A0E', whiteSpace: 'nowrap' }}>{username}</div>
          <div style={{ fontSize: 9, color: '#7A5328', whiteSpace: 'nowrap' }}>{variant === 'quote' ? 'caption · today' : '2h · sponsored'}</div>
        </div>
      </div>
    </div>
  );
};

// Icons
const IconMail = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3 7l9 7 9-7" />
  </svg>
);
const IconCalendar = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
const IconSparkleStroke = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
  </svg>
);
const IconChevron = ({ size = 18, color = 'currentColor', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const IconInstagram = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill={color} />
  </svg>
);
const IconTikTok = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 4c.4 2.4 2.2 4 4.5 4.2" />
  </svg>
);
const IconLinkedIn = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2.5 2.5 0 0 1 5 0v4M11 10v7" />
  </svg>
);

// Scatter helper
const Scatter = ({ items }) => (
  <>
    {items.map((it, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: it.x,
          top: it.y,
          transform: `rotate(${it.r || 0}deg)`,
          pointerEvents: 'none',
          animation: it.float ? `gentleFloat ${4 + (i % 3)}s ease-in-out infinite ${i * 0.3}s` : 'none',
          zIndex: it.z || 1,
        }}
      >
        {it.el}
      </div>
    ))}
  </>
);

Object.assign(window, {
  GroovyFlower, Daisy, Sparkle, StarSparkle, Mushroom,
  WavyStripes, WavyArches, WavyDivider, DiscoBall, BrandBadge, PostCard,
  IconMail, IconCalendar, IconSparkleStroke, IconChevron,
  IconInstagram, IconTikTok, IconLinkedIn, Scatter,
});
