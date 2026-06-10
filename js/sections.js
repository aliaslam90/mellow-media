// Page sections for Mellow Media — 70s sunset edition

const { useState, useEffect, useRef } = React;

// ============== NAV ==============
const Nav = ({ scrolled }) => {
  const [open, setOpen] = useState(false);
  const leftLinks  = [
    { href: '#about',        label: 'About' },
    { href: '#services',     label: 'Services' },
    { href: '#testimonials', label: 'Kind Words' },
    { href: '#contact',      label: 'Contact' },
  ];
  const rightLinks = [];
  const linkStyle = {
    color: 'var(--espresso)', textDecoration: 'none', fontWeight: 700, fontSize: 15,
    position: 'relative', padding: '6px 4px', whiteSpace: 'nowrap',
  };
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 60,
        padding: scrolled ? '6px 0' : '10px 0',
        background: scrolled
          ? 'rgba(251, 220, 199, 0.92)'
          : 'rgba(255, 241, 212, 0.88)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        borderBottom: scrolled ? '1px solid rgba(206, 101, 20, 0.18)' : '1px solid rgba(206, 101, 20, 0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Desktop: 3-column centred layout */}
      <div className="nav-desktop" style={{
        maxWidth: 1320, margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16,
      }}>
        {/* Left links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {leftLinks.map((l) => (
            <a key={l.href} href={l.href} style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--burnt-orange)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--espresso)'}
            >{l.label}</a>
          ))}
        </div>

        {/* Centre logo */}
        <a href="#top" aria-label="Mellow Media — home" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
          <img
            src="assets/images/logo.png"
            alt="Mellow Media"
            style={{ height: scrolled ? 86 : 106, width: 'auto', display: 'block', transition: 'height 0.3s ease' }}
          />
        </a>

        {/* Right: links + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 28 }}>
          {rightLinks.map((l) => (
            <a key={l.href} href={l.href} style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--burnt-orange)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--espresso)'}
            >{l.label}</a>
          ))}
          <a href="#contact" className="mm-btn mm-btn-primary" style={{ padding: '11px 22px', fontSize: 14 }}>
            Book a Free Chat
          </a>
        </div>
      </div>

      {/* Mobile: logo left, hamburger right */}
      <div className="nav-mobile-bar" style={{
        maxWidth: 1320, margin: '0 auto', padding: '0 24px',
        display: 'none', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#top" aria-label="Mellow Media — home" style={{ textDecoration: 'none' }}>
          <img src="assets/images/logo.png" alt="Mellow Media"
            style={{ height: 68, width: 'auto', display: 'block' }} />
        </a>
        <button
          aria-label="Menu" aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--espresso)', padding: 8 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {open ? <><path d="M6 6l12 12"/><path d="M6 18L18 6"/></> : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="nav-mobile-menu" style={{
        display: open ? 'block' : 'none',
        background: 'var(--warm-white)',
        borderTop: '1px solid rgba(206, 101, 20, 0.15)',
        padding: '20px 32px 28px',
      }}>
        {[...leftLinks, ...rightLinks].map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
            display: 'block', padding: '12px 0', color: 'var(--espresso)',
            textDecoration: 'none', fontWeight: 700, fontSize: 18,
          }}>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className="mm-btn mm-btn-primary" style={{ marginTop: 12, display: 'inline-flex' }}>
          Book a Free Chat
        </a>
      </div>
    </nav>
  );
};

// ============== HERO (editorial full-width collage) ==============
const Hero = ({ scrollY }) => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [reducedMotion, setReducedMotion] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  const isNarrow = vw < 720;
  const isMid = vw < 960;
  const ballSize = isNarrow ? 150 : isMid ? 190 : 230;

  return (
    <section id="top" style={{
      position: 'relative',
      paddingTop: isNarrow ? 110 : 130,
      paddingBottom: isNarrow ? 70 : 60,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #FBDCE3 0%, #FFE7C2 50%, #FBC2A4 100%)',
    }}>
      {/* Horizontal retro wave bands — animated, full width */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.78 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="band1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F29DB5" />
            <stop offset="100%" stopColor="#EA829A" />
          </linearGradient>
          <linearGradient id="band2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FBC2A4" />
            <stop offset="100%" stopColor="#F78762" />
          </linearGradient>
          <linearGradient id="band3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFE7C2" />
            <stop offset="100%" stopColor="#E9BE6A" />
          </linearGradient>
        </defs>

        {/* Pink wave — flows left → right at 22s (extra copies only rendered when animating) */}
        <g style={{ willChange: reducedMotion ? 'auto' : 'transform' }}>
          <path d="M -50 200 C 240 130, 540 270, 820 200 S 1280 130, 1500 210 L 1500 290 C 1280 360, 820 240, 540 320 S 240 250, -50 290 Z" fill="url(#band1)" opacity="0.55" />
          {!reducedMotion && (
            <>
              <path d="M 1390 200 C 1680 130, 1980 270, 2260 200 S 2720 130, 2940 210 L 2940 290 C 2720 360, 2260 240, 1980 320 S 1680 250, 1390 290 Z" fill="url(#band1)" opacity="0.55" />
              <path d="M 2830 200 C 3120 130, 3420 270, 3700 200 S 4160 130, 4380 210 L 4380 290 C 4160 360, 3700 240, 3420 320 S 3120 250, 2830 290 Z" fill="url(#band1)" opacity="0.55" />
              <animateTransform attributeName="transform" type="translate"
                from="-1440,0" to="0,0" dur="22s" repeatCount="indefinite" calcMode="linear" />
            </>
          )}
        </g>

        {/* Orange/peach wave — flows right → left at 26s */}
        <g style={{ willChange: reducedMotion ? 'auto' : 'transform' }}>
          <path d="M -50 420 C 260 360, 560 480, 860 410 S 1280 350, 1500 430 L 1500 510 C 1280 580, 860 470, 560 540 S 260 480, -50 510 Z" fill="url(#band2)" opacity="0.5" />
          {!reducedMotion && (
            <>
              <path d="M 1390 420 C 1700 360, 2000 480, 2300 410 S 2720 350, 2940 430 L 2940 510 C 2720 580, 2300 470, 2000 540 S 1700 480, 1390 510 Z" fill="url(#band2)" opacity="0.5" />
              <path d="M 2830 420 C 3140 360, 3440 480, 3740 410 S 4160 350, 4380 430 L 4380 510 C 4160 580, 3740 470, 3440 540 S 3140 480, 2830 510 Z" fill="url(#band2)" opacity="0.5" />
              <animateTransform attributeName="transform" type="translate"
                from="0,0" to="-1440,0" dur="26s" repeatCount="indefinite" calcMode="linear" />
            </>
          )}
        </g>

        {/* Cream/yellow wave — flows left → right at 30s */}
        <g style={{ willChange: reducedMotion ? 'auto' : 'transform' }}>
          <path d="M -50 640 C 260 580, 560 700, 860 630 S 1280 570, 1500 650 L 1500 800 L -50 800 Z" fill="url(#band3)" opacity="0.55" />
          {!reducedMotion && (
            <>
              <path d="M 1390 640 C 1700 580, 2000 700, 2300 630 S 2720 570, 2940 650 L 2940 800 L 1390 800 Z" fill="url(#band3)" opacity="0.55" />
              <path d="M 2830 640 C 3140 580, 3440 700, 3740 630 S 4160 570, 4380 650 L 4380 800 L 2830 800 Z" fill="url(#band3)" opacity="0.55" />
              <animateTransform attributeName="transform" type="translate"
                from="-1440,0" to="0,0" dur="30s" repeatCount="indefinite" calcMode="linear" />
            </>
          )}
        </g>
      </svg>

      {/* Soft top-edge fade so nav blends in */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(180deg, #FFE7C2 0%, transparent 100%)',
        opacity: 0.7, pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Hanging disco balls now rendered globally from App so they stay attached
          to the navbar on scroll — see HangingBalls in app.js */}

      {/* Decorative motifs — flowers and sparkles only, tastefully placed */}
      <GroovyFlower size={isNarrow ? 32 : 56} v={1}
        style={{ position: 'absolute', top: isNarrow ? '20%' : '26%', left: '5%', zIndex: 2, animation: 'gentleFloat 6s ease-in-out infinite' }} />
      <GroovyFlower size={isNarrow ? 28 : 42} v={3}
        style={{ position: 'absolute', bottom: '14%', right: '6%', zIndex: 2, animation: 'gentleFloat 5.2s ease-in-out infinite 0.4s' }} />
      <GroovyFlower size={isNarrow ? 24 : 36} v={5}
        style={{ position: 'absolute', top: '14%', right: '12%', zIndex: 2, animation: 'gentleFloat 4.8s ease-in-out infinite 1s' }} />
      <Sparkle size={22} color="#CE6514"
        style={{ position: 'absolute', top: '46%', left: '10%', zIndex: 2, animation: 'twinkle 2.8s ease-in-out infinite' }} />
      <Sparkle size={18} color="#EA829A"
        style={{ position: 'absolute', bottom: '26%', left: '14%', zIndex: 2, animation: 'twinkle 3.2s ease-in-out infinite 0.6s' }} />
      <StarSparkle size={16} color="#F1732D"
        style={{ position: 'absolute', top: '32%', right: '4%', zIndex: 2, animation: 'twinkle 2.5s ease-in-out infinite 1.1s' }} />
      <StarSparkle size={14} color="#CB9626"
        style={{ position: 'absolute', bottom: '32%', right: '20%', zIndex: 2 }} />

      {/* Subtle off-canvas content card peek — bottom-left corner */}
      {!isNarrow && (
        <PostCard
          variant="quote" bg="#EA829A" accent="#FBDCE3"
          caption="made for the chill girlies"
          username="@mellowmedia" rotate={-9}
          size="md"
          style={{
            bottom: -50, left: -40, zIndex: 2,
            opacity: 0.95,
          }}
        />
      )}

      {/* Brand badge — bottom-right corner, subtle */}
      {!isNarrow && (
        <div style={{
          position: 'absolute',
          bottom: isMid ? -40 : -50,
          right: isMid ? -30 : -40,
          zIndex: 2,
          opacity: 0.96,
        }}>
          <BrandBadge size={isMid ? 150 : 180} bg="#CE6514" textColor="#FFF1D4" />
        </div>
      )}

      {/* CENTERED EDITORIAL CONTENT — no card, sits directly on the artwork */}
      <div style={{
        position: 'relative', zIndex: 5,
        maxWidth: 940, margin: '0 auto',
        padding: '0 28px',
        textAlign: 'center',
        // On narrow screens the (single) ball stacks above; otherwise leave breathing room below the nav.
        marginTop: isNarrow ? ballSize + 130 : isMid ? 70 : 80,
      }}>
        <div className="font-script" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          color: 'var(--burnt-orange)',
          fontSize: 'clamp(20px, 1.8vw, 26px)',
          fontWeight: 600,
          marginBottom: 10,
        }}>
          <Sparkle size={14} color="#CE6514" /> solo social studio · est 2025 <Sparkle size={14} color="#CE6514" />
        </div>

        <h1 className="font-display" style={{
          margin: 0,
          fontSize: 'clamp(48px, 7.2vw, 108px)',
          lineHeight: 0.96,
          color: 'var(--espresso)',
          letterSpacing: '-0.02em',
          textWrap: 'balance',
          textShadow: '0 2px 0 rgba(255,255,255,0.35)',
        }}>
          The <span style={{ color: 'var(--burnt-orange)' }}>chill</span> way
          {isNarrow ? ' ' : <br />}
          to build a <span style={{ position: 'relative', display: 'inline-block' }}>
            <span className="font-script" style={{
              fontFamily: 'Pacifico, cursive',
              color: 'var(--coral)',
              fontWeight: 400,
              fontSize: '0.95em',
            }}>hot</span>
            <Sparkle size={28} color="#EA829A" style={{ position: 'absolute', top: -10, right: -22 }} />
          </span> brand.
        </h1>

        <p style={{
          margin: '24px auto 30px',
          maxWidth: 620,
          fontSize: 'clamp(16px, 1.25vw, 19px)',
          lineHeight: 1.65,
          color: 'var(--deep-brown)',
          fontWeight: 500,
        }}>
          Social media shouldn't feel like a chore. I handle the strategy, design, posting,
          engagement and growth — to keep your brand active and your workload mellow.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#contact" className="mm-btn mm-btn-primary mm-btn-lg">
            <IconMail size={18} /> Get in touch
          </a>
          <a href="#services" className="mm-btn mm-btn-secondary mm-btn-lg">
            <Sparkle size={16} color="currentColor" /> View packages
          </a>
          <a href="#contact" className="mm-btn mm-btn-ghost mm-btn-lg">
            <IconCalendar size={18} /> Book a free chat
          </a>
        </div>

        <div style={{
          marginTop: 28,
          display: 'inline-flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center',
          color: 'var(--deep-brown)', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--soft-teal)' }} />
            Taking 2 new clients this season
          </span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Dubai, working everywhere</span>
        </div>
      </div>

      {/* Scroll indicator — sits in normal flow at the bottom of hero content */}
      <div style={{
        position: 'relative',
        marginTop: 28,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        color: 'var(--deep-brown)', fontSize: 11, fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase',
        opacity: scrollY > 80 ? 0 : 0.7, transition: 'opacity 0.3s',
        zIndex: 1,
      }}>
        scroll
        <span style={{ animation: 'bounceY 1.8s ease-in-out infinite' }}>
          <IconChevron size={18} color="currentColor" />
        </span>
      </div>
    </section>
  );
};

// ============== ABOUT ==============
const About = () => {
  return (
    <section id="about" style={{ position: 'relative', padding: '120px 0 120px', background: 'var(--warm-white)' }}>
      {/* Subtle background decorations */}
      <Mushroom size={70} cap="#EA829A" stem="#FBC2A4" style={{ position: 'absolute', top: 56, left: 36, opacity: 0.55 }} />
      <GroovyFlower size={64} v={2} style={{ position: 'absolute', bottom: 80, right: 60, opacity: 0.5, animation: 'gentleFloat 6s ease-in-out infinite' }} />

      <div style={{
        maxWidth: 1180, margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 80, alignItems: 'center',
      }} className="about-grid">
        {/* Left: blob photo placeholder */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -22,
            background: 'radial-gradient(ellipse, rgba(242, 157, 181, 0.45), transparent 70%)',
            filter: 'blur(20px)',
            zIndex: 0,
          }} />
          <div style={{
            position: 'relative', zIndex: 2,
            aspectRatio: '4/5',
            background: 'linear-gradient(135deg, var(--peach-soft) 0%, var(--pink-pale) 100%)',
            borderRadius: '46% 54% 52% 48% / 48% 42% 58% 52%',
            border: '6px solid var(--peach)',
            boxShadow: '0 30px 60px -20px rgba(206, 101, 20, 0.28), 0 0 0 12px rgba(247, 135, 98, 0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            backgroundImage: `
              repeating-linear-gradient(135deg, rgba(206, 101, 20, 0.07) 0 12px, transparent 12px 24px),
              linear-gradient(135deg, var(--peach-soft) 0%, var(--pink-pale) 100%)
            `,
          }}>
            <div style={{
              textAlign: 'center', color: 'var(--brown-mid)',
              fontFamily: 'monospace', fontSize: 13,
              padding: 24,
            }}>
              <div style={{ fontSize: 64, marginBottom: 12 }}>📷</div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                portrait of founder
              </div>
              <div style={{ marginTop: 6, opacity: 0.7 }}>warm, sunlit, on the couch with the cats</div>
            </div>
          </div>

          {/* Floating decorations */}
          <GroovyFlower size={64} v={4} style={{ position: 'absolute', top: -28, right: -10, animation: 'gentleFloat 5s ease-in-out infinite', zIndex: 3 }} />
          <GroovyFlower size={42} v={6} style={{ position: 'absolute', bottom: 28, left: -28, animation: 'gentleFloat 4.5s ease-in-out infinite 0.8s', zIndex: 3 }} />
          <Sparkle size={22} color="#CE6514" style={{ position: 'absolute', top: '30%', left: -38, zIndex: 3 }} />
          <StarSparkle size={16} color="#CB9626" style={{ position: 'absolute', bottom: -8, right: 30, zIndex: 3 }} />

          {/* Vinyl/record disc accent */}
          <div style={{
            position: 'absolute', bottom: -30, right: -36, width: 130, height: 130,
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--coral) 18%, #2C1A0E 19%, #2C1A0E 24%, #5C3D1E 25%, #5C3D1E 32%, #2C1A0E 33%, #2C1A0E 96%, var(--burnt-orange) 97%)',
            boxShadow: '0 18px 30px -10px rgba(44,26,14,0.4)',
            animation: 'spinSlow 16s linear infinite',
            zIndex: 1,
          }}>
            <div style={{
              position: 'absolute', inset: '45%',
              background: 'var(--peach)', borderRadius: '50%',
              boxShadow: '0 0 0 2px var(--espresso)',
            }} />
          </div>
        </div>

        {/* Right: text */}
        <div>
          <div className="font-caveat" style={{
            color: 'var(--burnt-orange)', fontSize: 28, fontWeight: 600, marginBottom: 8,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            hey, it's me <Sparkle size={18} color="#EA829A" />
          </div>
          <h2 className="font-display" style={{
            margin: '0 0 28px',
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.0,
            fontWeight: 600,
            color: 'var(--espresso)',
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
            textWrap: 'balance',
          }}>
            I'm the person behind the posts.
          </h2>

          <div style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--brown)' }}>
            <p style={{ margin: '0 0 18px' }}>
              I founded <strong style={{ color: 'var(--espresso)' }}>Mellow Media</strong> because I believe
              that social media should be a tool for growth, not a source of burnout. I wanted to
              create a space where businesses could get high-quality digital support without the
              high-stress agency feel.
            </p>
            <p style={{ margin: '0 0 18px' }}>
              I specialise in the essentials that keep a business humming —
              <em> clean graphic design</em>, <em>consistent scheduling</em> and
              <em> genuine community engagement</em>.
            </p>
            <p style={{ margin: 0 }}>
              When I'm not planning content calendars, you can find me on a beach or a hike,
              at a Pilates class, or curled up on my couch with my cats listening to dreamy
              folk music on vinyl records.
            </p>
          </div>

          {/* Mini facts row */}
          <div style={{
            marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          }} className="about-facts">
            {[
              { k: '6 yrs', v: 'in social' },
              { k: '40+', v: 'brands grown' },
              { k: '1', v: 'human (no bots)' },
            ].map((f) => (
              <div key={f.k} style={{
                padding: '18px 18px',
                background: 'rgba(242, 157, 181, 0.18)',
                border: '1.5px solid rgba(234, 130, 154, 0.45)',
                borderRadius: 22,
              }}>
                <div className="font-display" style={{
                  fontSize: 30, fontWeight: 800, color: 'var(--burnt-orange)', lineHeight: 1,
                  fontStyle: 'italic',
                }}>
                  {f.k}
                </div>
                <div style={{ marginTop: 4, fontSize: 13, fontWeight: 700, color: 'var(--brown-mid)' }}>
                  {f.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============== SERVICES ==============
const Services = () => {
  const packages = [
    {
      name: 'Mellow Basics',
      sub: 'For businesses just getting started with social.',
      price: 'AED ___',
      features: [
        'Profile setup & optimisation',
        '8 posts per month (designed + scheduled)',
        'Basic caption copywriting',
        'Monthly performance report',
        '1 platform included',
      ],
    },
    {
      name: 'Mellow Flow',
      sub: 'For growing brands who want to stay consistent.',
      price: 'AED ___',
      popular: true,
      features: [
        '12 posts per month across 2 platforms',
        'Caption copywriting + hashtag strategy',
        'Community engagement (DMs + comments)',
        'Monthly strategy call',
        'Story templates included',
      ],
    },
    {
      name: 'Totally Mellow',
      sub: 'The full-service, hands-off experience.',
      price: 'AED ___',
      features: [
        '20 posts per month across 3 platforms',
        'Full content calendar & creative direction',
        'Daily engagement & community management',
        'Bi-weekly strategy calls',
        'Reels / short video content included',
      ],
    },
  ];

  return (
    <section id="services" style={{ position: 'relative', background: '#FBDCE3' }}>
      <div style={{
        background: 'linear-gradient(180deg, #FBDCE3 0%, #F29DB5 45%, #F78762 100%)',
        padding: '40px 0 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.16, pointerEvents: 'none',
        }}>
          <WavyStripes opacity={1} />
        </div>

        {/* Scattered flowers + mushrooms */}
        <GroovyFlower size={56} v={7} style={{ position: 'absolute', top: 80, left: 60, animation: 'gentleFloat 6s ease-in-out infinite' }} />
        <GroovyFlower size={36} v={2} style={{ position: 'absolute', top: 160, right: 100, animation: 'gentleFloat 4.8s ease-in-out infinite 1s' }} />
        <GroovyFlower size={44} v={5} style={{ position: 'absolute', bottom: 80, left: 120, animation: 'gentleFloat 5.5s ease-in-out infinite 0.4s', opacity: 0.78 }} />
        <Sparkle size={26} color="#CE6514" style={{ position: 'absolute', top: 110, right: '38%' }} />
        <Mushroom size={64} cap="#CE6514" stem="#FBC2A4" style={{ position: 'absolute', bottom: 40, right: 70 }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="font-caveat" style={{
              color: 'var(--espresso)', fontSize: 30, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              what I offer <Sparkle size={20} color="#2C1A0E" />
            </div>
            <h2 className="font-display" style={{
              margin: '8px 0 14px',
              fontSize: 'clamp(44px, 6vw, 84px)',
              lineHeight: 0.98,
              fontWeight: 700,
              color: 'var(--espresso)',
              letterSpacing: '-0.025em',
              fontStyle: 'italic',
            }}>
              Find your flow.
            </h2>
            <p style={{ margin: 0, fontSize: 19, color: 'var(--deep-brown)', maxWidth: 580, marginInline: 'auto', fontWeight: 500 }}>
              Three packages, designed to meet you wherever your brand happens to be.
              Mix, match, or take a different shape — we'll figure it out on the call.
            </p>
          </div>

          <div className="services-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
            alignItems: 'stretch',
          }}>
            {packages.map((p, i) => (
              <PackageCard key={p.name} pkg={p} idx={i} />
            ))}
          </div>

          <div style={{
            marginTop: 36, textAlign: 'center',
            fontSize: 14, color: 'var(--deep-brown)', fontStyle: 'italic',
            display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center', width: '100%',
          }}>
            <GroovyFlower size={16} v={3} />
            Pricing finalised on the discovery call — every business needs slightly different things.
            <GroovyFlower size={16} v={6} />
          </div>
        </div>
      </div>

    </section>
  );
};

const PackageCard = ({ pkg, idx }) => {
  const [hover, setHover] = useState(false);
  const popular = pkg.popular;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: popular ? 'linear-gradient(180deg, #FFF9EF 0%, #FBDCE3 100%)' : '#FFF9EF',
        borderRadius: 32,
        padding: '36px 30px 32px',
        boxShadow: popular
          ? '0 30px 60px -20px rgba(234, 130, 154, 0.45), 0 0 0 3px var(--sunset-pink)'
          : '0 20px 40px -20px rgba(206, 101, 20, 0.22)',
        transform: `translateY(${hover ? -6 : 0}px) ${popular ? 'scale(1.02)' : ''}`,
        transition: 'transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 8,
        background: popular
          ? 'linear-gradient(90deg, var(--sunset-pink), var(--peach), var(--coral), var(--peach), var(--sunset-pink))'
          : 'linear-gradient(90deg, var(--peach-soft), var(--peach), var(--peach-soft))',
      }} />

      {popular && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          padding: '6px 12px',
          background: 'var(--burnt-orange)', color: 'var(--warm-white)',
          borderRadius: 999, fontSize: 11, fontWeight: 800,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Sparkle size={11} color="#FFF1D4" /> Most popular
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        <GroovyFlower size={28} v={(idx % 7) + 1} />
        <span className="font-caveat" style={{
          color: 'var(--brown-mid)', fontSize: 18, fontWeight: 600,
        }}>
          package {idx + 1}
        </span>
      </div>

      <h3 className="font-display" style={{
        margin: '10px 0 8px',
        fontSize: 34, fontWeight: 700, fontStyle: 'italic',
        color: 'var(--espresso)', letterSpacing: '-0.02em', lineHeight: 1,
      }}>
        {pkg.name}
      </h3>

      <p style={{ margin: '0 0 22px', color: 'var(--brown)', fontSize: 15, lineHeight: 1.5 }}>
        {pkg.sub}
      </p>

      <div style={{
        padding: '14px 16px', marginBottom: 22,
        background: popular ? 'rgba(234, 130, 154, 0.18)' : 'rgba(247, 135, 98, 0.14)',
        borderRadius: 16,
        border: '1.5px dashed rgba(206, 101, 20, 0.35)',
        display: 'flex', alignItems: 'baseline', gap: 8,
      }}>
        <span style={{ fontSize: 13, color: 'var(--brown-mid)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          starting from
        </span>
        <span className="font-display" style={{ fontSize: 24, fontWeight: 800, color: 'var(--burnt-orange)', fontStyle: 'italic' }}>
          {pkg.price}
        </span>
        <span style={{ fontSize: 13, color: 'var(--brown-mid)', fontWeight: 600 }}>/ mo</span>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
        {pkg.features.map((f, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '10px 0',
            borderBottom: i < pkg.features.length - 1 ? '1px dashed rgba(206, 101, 20, 0.18)' : 'none',
            fontSize: 15, color: 'var(--brown)',
            lineHeight: 1.45,
          }}>
            <GroovyFlower size={20} v={((idx * 3 + i) % 7) + 1} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={popular ? 'mm-btn mm-btn-primary' : 'mm-btn mm-btn-secondary'}
        style={{ justifyContent: 'center', width: '100%' }}
      >
        Get started
        <IconChevron size={16} color="currentColor" style={{ transform: 'rotate(-90deg)' }} />
      </a>
    </div>
  );
};

// ============== PROMISE BAND ==============
const Promise = () => (
  <section style={{
    position: 'relative',
    background: 'linear-gradient(135deg, #F78762 0%, #F1732D 45%, #EA829A 100%)',
    padding: '100px 32px',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.14, pointerEvents: 'none',
      mixBlendMode: 'screen',
    }}>
      <WavyStripes opacity={1} />
    </div>

    <Sparkle size={48} color="#FFF1D4" style={{ position: 'absolute', top: '20%', left: '8%', animation: 'twinkle 3s ease-in-out infinite' }} />
    <Sparkle size={36} color="#FFF1D4" style={{ position: 'absolute', bottom: '24%', right: '10%', animation: 'twinkle 3.5s ease-in-out infinite 0.6s' }} />
    <StarSparkle size={28} color="#FBDCE3" style={{ position: 'absolute', top: '32%', right: '18%' }} />
    <StarSparkle size={22} color="#FFF1D4" style={{ position: 'absolute', bottom: '32%', left: '20%' }} />
    <GroovyFlower size={48} v={4} style={{ position: 'absolute', top: 36, right: '32%' }} />
    <GroovyFlower size={36} v={1} style={{ position: 'absolute', bottom: 36, left: '36%' }} />
    <Mushroom size={72} cap="#FFF1D4" stem="#FBDCE3" spot="#F1732D" shade="#A84E0A" style={{ position: 'absolute', bottom: 26, right: 60, opacity: 0.85 }} />

    <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <div className="font-caveat" style={{
        color: '#FFF9EF', fontSize: 28, fontWeight: 600, marginBottom: 8, opacity: 0.95,
      }}>
        a professional promise ✦
      </div>
      <h2 className="font-display" style={{
        margin: 0,
        fontSize: 'clamp(36px, 5.2vw, 72px)',
        lineHeight: 1.1,
        fontWeight: 700,
        color: '#FFF9EF',
        letterSpacing: '-0.02em',
        textWrap: 'balance',
      }}>
        "I may keep things mellow,
        <br />
        but I take your <em style={{ color: '#FFE7C2', fontStyle: 'italic' }}>business</em> seriously."
      </h2>
      <p style={{
        margin: '32px auto 0', maxWidth: 640,
        fontSize: 19, lineHeight: 1.6, color: 'rgba(255, 249, 239, 0.95)',
      }}>
        I pride myself on clear communication, meeting deadlines, and being the most
        reliable partner in your inbox.
      </p>
    </div>
  </section>
);

// ============== TESTIMONIALS (3-up sliding carousel) ==============
const TestimonialCard = ({ t, i }) => (
  <div style={{
    padding: '32px 28px 28px',
    background: i % 3 === 1
      ? 'linear-gradient(160deg, #FFF9EF 0%, #FBDCE3 100%)'
      : i % 3 === 2
        ? 'linear-gradient(160deg, #FFF9EF 0%, #FFE7C2 100%)'
        : '#FFF9EF',
    borderRadius: 28,
    boxShadow: '0 18px 40px -20px rgba(206, 101, 20, 0.2)',
    border: '1.5px solid rgba(234, 130, 154, 0.28)',
    display: 'flex', flexDirection: 'column',
    height: '100%', boxSizing: 'border-box',
  }}>
    <div className="font-display" style={{
      fontSize: 64, lineHeight: 0.5,
      color: 'var(--sunset-pink)', opacity: 0.7,
      marginBottom: 12, userSelect: 'none',
    }}>"</div>
    <p className="font-display" style={{
      margin: '0 0 auto',
      fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.45,
      color: 'var(--espresso)', fontStyle: 'italic', fontWeight: 500,
      textWrap: 'balance', flex: 1,
    }}>{t.quote}</p>
    <div style={{
      marginTop: 24, paddingTop: 16,
      borderTop: '1px dashed rgba(206, 101, 20, 0.22)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
        background: i % 3 === 1 ? 'var(--sunset-pink)' : 'rgba(247, 135, 98, 0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <GroovyFlower size={24} v={(i % 7) + 1} />
      </div>
      <div>
        <div style={{ fontWeight: 800, color: 'var(--espresso)', fontSize: 14 }}>{t.who}</div>
        <div style={{ fontSize: 12, color: 'var(--brown-mid)', marginTop: 1 }}>{t.biz}</div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const items = [
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
    { quote: 'Testimonial coming soon — watch this space ✦', who: 'A delighted client', biz: 'Coming soon' },
  ];

  // How many cards visible depends on viewport
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = items.length - perView;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const go = (n) => setCurrent(Math.max(0, Math.min(n, maxIndex)));

  const resetTimer = (n) => {
    clearInterval(timerRef.current);
    go(n);
    timerRef.current = setInterval(() => {
      setCurrent(c => c >= maxIndex ? 0 : c + 1);
    }, 3500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => c >= maxIndex ? 0 : c + 1);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [maxIndex]);

  // Swipe support
  const dragStart = useRef(null);
  const onPointerDown = (e) => { dragStart.current = e.clientX; };
  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) < 30) return;
    resetTimer(dx < 0 ? current + 1 : current - 1);
  };

  const cardPct = 100 / perView;

  return (
    <section id="testimonials" style={{
      position: 'relative', padding: '100px 0 110px', background: 'var(--warm-white)',
      overflow: 'hidden',
    }}>
      <GroovyFlower size={64} v={7} style={{ position: 'absolute', top: 60, left: 40, opacity: 0.35, animation: 'gentleFloat 6s ease-in-out infinite' }} />
      <GroovyFlower size={48} v={3} style={{ position: 'absolute', bottom: 80, right: 60, opacity: 0.42, animation: 'gentleFloat 5s ease-in-out infinite 0.8s' }} />
      <Mushroom size={56} cap="#EA829A" stem="#FBC2A4" style={{ position: 'absolute', top: 100, right: 80, opacity: 0.5 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="font-caveat" style={{
            color: 'var(--burnt-orange)', fontSize: 28, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            kind words <Sparkle size={18} color="#EA829A" />
          </div>
          <h2 className="font-display" style={{
            margin: '6px 0 12px',
            fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1,
            fontWeight: 600, color: 'var(--espresso)',
            letterSpacing: '-0.02em', fontStyle: 'italic',
          }}>
            From the people I work with.
          </h2>
          <p style={{ margin: 0, fontSize: 17, color: 'var(--brown-mid)' }}>
            Real quotes coming soon — these spots are warming up.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>
          {/* Arrow buttons */}
          {[{ dir: -1, side: 'left', label: '‹' }, { dir: 1, side: 'right', label: '›' }].map(({ dir, side, label }) => (
            <button key={side}
              onClick={() => resetTimer(current + dir)}
              aria-label={dir === -1 ? 'Previous' : 'Next'}
              style={{
                position: 'absolute', top: '50%', [side]: -24,
                transform: 'translateY(-50%)', zIndex: 4,
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--warm-white)',
                border: '2px solid rgba(234,130,154,0.5)',
                color: 'var(--burnt-orange)', fontSize: 24, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 18px -8px rgba(206,101,20,0.25)',
                transition: 'transform 0.18s, background 0.18s, opacity 0.18s',
                opacity: (dir === -1 ? current === 0 : current >= maxIndex) ? 0.3 : 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FBDCE3'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--warm-white)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
            >{label}</button>
          ))}

          {/* Track — uses percentage slides, gap via padding */}
          <div style={{ overflow: 'hidden', width: '100%' }}
            onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <div style={{
              display: 'flex',
              transition: 'transform 0.5s cubic-bezier(.4,0,.2,1)',
              transform: `translateX(calc(-${current} * (${100 / perView}% + ${20 / perView}px)))`,
            }}>
              {items.map((t, i) => (
                <div key={i} style={{
                  flexShrink: 0,
                  width: `calc(${100 / perView}% - ${20 * (perView - 1) / perView}px)`,
                  marginRight: i < items.length - 1 ? 20 : 0,
                }}>
                  <TestimonialCard t={t} i={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => resetTimer(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? 26 : 10, height: 10, borderRadius: 999,
                  background: i === current ? 'var(--burnt-orange)' : 'rgba(206,101,20,0.25)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 0.3s ease, background 0.25s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============== CONTACT ==============
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', biz: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Tell me your name';
    if (!form.email.trim()) e.email = 'Need an email to reply';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email looks off';
    if (!form.message.trim()) e.message = 'Say a little something';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
    }
  };

  const update = (k) => (ev) => {
    setForm({ ...form, [k]: ev.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  return (
    <section id="contact" style={{
      position: 'relative',
      padding: '120px 0',
      background: 'linear-gradient(180deg, var(--warm-white) 0%, #FBDCE3 100%)',
      overflow: 'hidden',
    }}>
      <GroovyFlower size={84} v={2} style={{ position: 'absolute', top: 60, right: '12%', animation: 'gentleFloat 6s ease-in-out infinite' }} />
      <GroovyFlower size={56} v={6} style={{ position: 'absolute', bottom: 100, left: '8%', animation: 'gentleFloat 5s ease-in-out infinite 1s' }} />
      <StarSparkle size={28} color="#CE6514" style={{ position: 'absolute', top: '18%', left: '15%' }} />
      <Sparkle size={26} color="#CB9626" style={{ position: 'absolute', bottom: '20%', right: '20%' }} />
      <Mushroom size={56} cap="#EA829A" stem="#FBC2A4" style={{ position: 'absolute', bottom: 32, right: '8%' }} />

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center',
      }} className="contact-grid">
        <div>
          <div className="font-caveat" style={{
            color: 'var(--burnt-orange)', fontSize: 30, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            let's chat <Sparkle size={20} color="#EA829A" />
          </div>
          <h2 className="font-display" style={{
            margin: '6px 0 22px',
            fontSize: 'clamp(40px, 5.8vw, 76px)',
            lineHeight: 0.96,
            fontWeight: 700,
            color: 'var(--espresso)',
            letterSpacing: '-0.025em',
            fontStyle: 'italic',
            textWrap: 'balance',
          }}>
            Ready to get mellow?
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--brown)', maxWidth: 480 }}>
            Drop me a message and let's figure out how I can take social media off your plate.
            I reply to every note within a working day — promise.
          </p>

          <div style={{
            marginTop: 32, padding: '22px 24px',
            background: 'rgba(255, 249, 239, 0.7)',
            border: '1.5px dashed rgba(206, 101, 20, 0.35)',
            borderRadius: 22,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <IconCalendar size={20} color="var(--burnt-orange)" />
              <span style={{ fontWeight: 700, color: 'var(--espresso)' }}>Prefer to talk it out?</span>
            </div>
            <p style={{ margin: '0 0 14px', fontSize: 15, color: 'var(--brown)' }}>
              Book a free 20-min consultation. No pitch, no pressure — just a chat about your brand.
            </p>
            <a href="#" className="mm-btn mm-btn-ghost" style={{ padding: '10px 18px', fontSize: 14 }}>
              <IconCalendar size={16} />
              Open calendar
            </a>
          </div>
        </div>

        {/* Form card */}
        <div style={{
          position: 'relative',
          padding: '36px 36px 32px',
          background: '#FFF9EF',
          borderRadius: 30,
          boxShadow: '0 30px 60px -25px rgba(206, 101, 20, 0.32), 0 0 0 1.5px rgba(234, 130, 154, 0.35)',
        }}>
          <GroovyFlower size={36} v={4} style={{ position: 'absolute', top: -16, right: -16 }} />

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 8px' }}>
              <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center', gap: 10 }}>
                <GroovyFlower size={48} v={1} />
                <GroovyFlower size={48} v={5} style={{ marginTop: 8 }} />
                <GroovyFlower size={48} v={7} />
              </div>
              <h3 className="font-display" style={{
                margin: '0 0 12px', fontSize: 32, fontStyle: 'italic',
                color: 'var(--espresso)', fontWeight: 700,
              }}>
                Thanks, {form.name.split(' ')[0]}! ✦
              </h3>
              <p style={{ color: 'var(--brown)', fontSize: 16, margin: 0 }}>
                Your note is on its way. I'll reply within a working day — keep an eye on{' '}
                <strong>{form.email}</strong>.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', biz: '', interest: '', message: '' }); }} className="mm-btn mm-btn-ghost" style={{ marginTop: 22 }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                <Field label="Name" value={form.name} onChange={update('name')} error={errors.name} placeholder="Sunny Bloom" />
                <Field label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} placeholder="hello@yourbrand.com" />
              </div>
              <Field label="Business name" value={form.biz} onChange={update('biz')} placeholder="Daisy & Co." />
              <SelectField label="What are you looking for?" value={form.interest} onChange={update('interest')} />
              <TextareaField label="Tell me about your brand" value={form.message} onChange={update('message')} error={errors.message} placeholder="What you do, where you are, and what you'd love to fix or grow…" />

              <button type="submit" className="mm-btn mm-btn-primary mm-btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                Send it
                <Sparkle size={16} color="currentColor" />
              </button>

              <p style={{ marginTop: 16, fontSize: 12, color: 'var(--brown-mid)', textAlign: 'center', fontStyle: 'italic' }}>
                Your details stay between us — I never share or sell anyone's info.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, type = 'text', value, onChange, error, placeholder }) => (
  <label style={{ display: 'block', marginBottom: 14 }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--espresso)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {label}
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '13px 16px',
        borderRadius: 999,
        border: error ? '1.5px solid var(--burnt-deep)' : '1.5px solid rgba(206, 101, 20, 0.3)',
        background: 'var(--warm-white)',
        fontSize: 15,
        fontFamily: 'inherit',
        color: 'var(--espresso)',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onFocus={(e) => { e.target.style.borderColor = 'var(--burnt-orange)'; e.target.style.boxShadow = '0 0 0 4px rgba(247, 135, 98, 0.22)'; }}
      onBlur={(e) => { e.target.style.borderColor = error ? 'var(--burnt-deep)' : 'rgba(206, 101, 20, 0.3)'; e.target.style.boxShadow = 'none'; }}
    />
    {error && <div style={{ fontSize: 12, color: 'var(--burnt-orange)', marginTop: 4, fontStyle: 'italic' }}>✦ {error}</div>}
  </label>
);

const SelectField = ({ label, value, onChange }) => (
  <label style={{ display: 'block', marginBottom: 14 }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--espresso)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {label}
    </div>
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '13px 42px 13px 16px',
          borderRadius: 999,
          border: '1.5px solid rgba(206, 101, 20, 0.3)',
          background: 'var(--warm-white)',
          fontSize: 15,
          fontFamily: 'inherit',
          color: value ? 'var(--espresso)' : 'var(--brown-mid)',
          outline: 'none',
          appearance: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="">Pick one (or not sure)…</option>
        <option value="basics">Mellow Basics</option>
        <option value="flow">Mellow Flow</option>
        <option value="totally">Totally Mellow</option>
        <option value="not-sure">Not sure yet</option>
      </select>
      <div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--burnt-orange)' }}>
        <IconChevron size={16} />
      </div>
    </div>
  </label>
);

const TextareaField = ({ label, value, onChange, error, placeholder }) => (
  <label style={{ display: 'block', marginBottom: 14 }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--espresso)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {label}
    </div>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      style={{
        width: '100%',
        padding: '13px 16px',
        borderRadius: 22,
        border: error ? '1.5px solid var(--burnt-deep)' : '1.5px solid rgba(206, 101, 20, 0.3)',
        background: 'var(--warm-white)',
        fontSize: 15,
        fontFamily: 'inherit',
        color: 'var(--espresso)',
        outline: 'none',
        resize: 'vertical',
        minHeight: 110,
      }}
      onFocus={(e) => { e.target.style.borderColor = 'var(--burnt-orange)'; e.target.style.boxShadow = '0 0 0 4px rgba(247, 135, 98, 0.22)'; }}
      onBlur={(e) => { e.target.style.borderColor = error ? 'var(--burnt-deep)' : 'rgba(206, 101, 20, 0.3)'; e.target.style.boxShadow = 'none'; }}
    />
    {error && <div style={{ fontSize: 12, color: 'var(--burnt-orange)', marginTop: 4, fontStyle: 'italic' }}>✦ {error}</div>}
  </label>
);

// ============== FOOTER ==============
const Footer = () => (
  <footer style={{
    background: 'linear-gradient(180deg, #3A2618 0%, #1f140a 100%)',
    color: 'var(--cream)',
    padding: '72px 32px 32px',
    position: 'relative', overflow: 'hidden',
  }}>
    <GroovyFlower size={140} v={3} style={{ position: 'absolute', top: -20, right: -30 }} />
    <GroovyFlower size={90} v={6} style={{ position: 'absolute', bottom: -10, left: -20 }} />

    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
      <div className="footer-grid" style={{
        display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 56, alignItems: 'flex-start',
      }}>
        <div>
          <img src="assets/images/logo.png" alt="Mellow Media" style={{ height: 70, width: 'auto', marginBottom: 12, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
          <p className="font-caveat" style={{
            margin: 0, fontSize: 26, fontWeight: 500,
            color: 'var(--peach-soft)',
          }}>
            Making social media feel good again ✦
          </p>
        </div>

        <div>
          <h4 style={{
            margin: '0 0 14px', fontSize: 13, fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '0.16em',
            color: 'var(--peach)',
          }}>
            Wander
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
            {[
              ['About', '#about'],
              ['Services', '#services'],
              ['Kind words', '#testimonials'],
              ['Contact', '#contact'],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} style={{ color: 'var(--cream)', textDecoration: 'none', opacity: 0.85, fontSize: 15 }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{
            margin: '0 0 14px', fontSize: 13, fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '0.16em',
            color: 'var(--peach)',
          }}>
            Find me
          </h4>
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {[
              { icon: <IconInstagram size={20} />, label: 'Instagram' },
              { icon: <IconTikTok size={20} />, label: 'TikTok' },
              { icon: <IconLinkedIn size={20} />, label: 'LinkedIn' },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(247, 135, 98, 0.15)',
                  border: '1.5px solid rgba(247, 135, 98, 0.35)',
                  color: 'var(--peach-soft)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--peach)'; e.currentTarget.style.color = 'var(--espresso)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(247, 135, 98, 0.15)'; e.currentTarget.style.color = 'var(--peach-soft)'; e.currentTarget.style.transform = 'none'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <a href="mailto:hello@mellow.media" style={{ color: 'var(--cream)', textDecoration: 'none', opacity: 0.85, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconMail size={16} /> hello@mellow.media
          </a>
        </div>
      </div>

      <div style={{
        marginTop: 56, paddingTop: 24,
        borderTop: '1px solid rgba(247, 135, 98, 0.22)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
        fontSize: 13, color: 'rgba(255, 241, 212, 0.6)',
      }}>
        <div>© 2025 Mellow Media. All rights reserved.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          Built warm in Dubai <GroovyFlower size={14} v={2} />
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Nav, Hero, About, Services, Promise, Testimonials, Contact, Footer });
