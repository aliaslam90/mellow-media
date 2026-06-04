// Mellow Media — root app

const { useState, useEffect } = React;

// Fixed disco balls that hang from the navbar and stay there during scroll.
const HangingBalls = ({ scrolled }) => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isNarrow = vw < 720;
  const isMid    = vw < 960;

  // Top offset matches the nav-bottom line (nav shrinks when scrolled).
  // Pre-scroll nav ≈ ~125px tall; scrolled ≈ ~100px. The string visually
  // attaches to the nav so we anchor a hair below the nav bottom.
  const topOffset = scrolled ? 100 : 124;

  // Match the original hero ball sizes & string lengths
  const mainSize   = isNarrow ? 150 : isMid ? 190 : 230;
  const mainString = isNarrow ? 60  : 120;
  const smallSize    = isMid ? 110 : 130;
  const smallString  = isMid ? 80  : 100;

  return (
    <>
      {/* Smaller ball — upper left (hidden on mobile) */}
      {!isNarrow && (
        <div style={{
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
      )}

      {/* Main ball — right side (centered on mobile) */}
      <div style={{
        position: 'fixed',
        top: topOffset,
        left: isNarrow ? '50%' : isMid ? '90%' : '91%',
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
      <HangingBalls scrolled={scrollY > 40} />
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
