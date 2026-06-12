// Mellow Media — root app

const { useState, useEffect } = React;

// Disco balls that hang from the navbar while scrolling, but "park" just above
// the packages (Services) section: once they would overlap it, they anchor to
// the page and scroll away with the content, leaving the cards unobstructed.
const HangingBalls = ({ scrolled, scrollY }) => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [servicesTop, setServicesTop] = useState(Infinity);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Measure where the Services section starts (re-measure on resize,
  // and once shortly after mount in case images/fonts shift layout).
  useEffect(() => {
    const measure = () => {
      const svc = document.getElementById('services');
      if (svc) setServicesTop(svc.getBoundingClientRect().top + window.scrollY);
    };
    measure();
    const t = setTimeout(measure, 800);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, [vw]);

  const isNarrow = vw < 720;
  const isMid    = vw < 960;

  // No hanging balls on mobile
  if (isNarrow) return null;

  // Top offset matches the nav-bottom line (nav shrinks when scrolled).
  // Pre-scroll nav ≈ ~125px tall; scrolled ≈ ~100px. The string visually
  // attaches to the nav so we anchor a hair below the nav bottom.
  const topOffset = scrolled ? 100 : 124;

  // Ball sizes scale gently with viewport width (230px at 1920 down to ~175px at 960)
  const mainSize   = Math.round(Math.min(230, Math.max(175, vw * 0.12)));
  const mainString = isNarrow ? 60  : 120;
  const smallSize    = Math.round(Math.min(130, Math.max(100, vw * 0.068)));
  const smallString  = isMid ? 80  : 100;

  return (
    <BallLayer
      topOffset={topOffset}
      servicesTop={servicesTop}
      isMid={isMid}
      mainSize={mainSize} mainString={mainString}
      smallSize={smallSize} smallString={smallString}
    />
  );
};

// Renders the two balls and moves them imperatively on scroll (no React
// re-render per frame) so the parking effect stays perfectly smooth.
const BallLayer = ({ topOffset, servicesTop, isMid, mainSize, mainString, smallSize, smallString }) => {
  const smallRef = React.useRef(null);
  const mainRef  = React.useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      // A ball parks when its bottom would touch the Services section top.
      const shift = (size, stringLen) => {
        const ballBottom = topOffset + stringLen + size + 16;
        return Math.max(0, y - (servicesTop - ballBottom));
      };
      if (smallRef.current) {
        smallRef.current.style.transform =
          `translateX(-50%) translateY(${-shift(smallSize, smallString)}px)`;
      }
      if (mainRef.current) {
        mainRef.current.style.transform =
          `translateX(-50%) translateY(${-shift(mainSize, mainString)}px)`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [topOffset, servicesTop, mainSize, mainString, smallSize, smallString]);

  return (
    <>
      {/* Smaller ball — upper left */}
      <div ref={smallRef} style={{
        position: 'fixed',
        top: topOffset,
        left: isMid ? '9%' : '10%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
        transition: 'top 0.3s ease',
      }}>
        <DiscoBall
          size={smallSize}
          scrollY={0}
          dropMax={0}
          stringLength={smallString}
        />
      </div>

      {/* Main ball — right side */}
      <div ref={mainRef} style={{
        position: 'fixed',
        top: topOffset,
        left: isMid ? '90%' : '91%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
        transition: 'top 0.3s ease',
      }}>
        <DiscoBall
          size={mainSize}
          scrollY={0}
          dropMax={0}
          stringLength={mainString}
        />
      </div>
    </>
  );
};

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    requestAnimationFrame(() => setLoaded(true));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Nav scrolled={scrollY > 40} />
      <HangingBalls scrolled={scrollY > 40} scrollY={scrollY} />
      <div style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <Hero scrollY={scrollY} />
      </div>
      <About />
      <Services />
      <Promise />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
