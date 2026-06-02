// Mellow Media — root app

const { useState, useEffect, useRef } = React;

const App = () => {
  const [scrollY, setScrollY]       = useState(0);
  const [loaded, setLoaded]         = useState(false);
  const [dropping, setDropping]     = useState(false);   // balls currently animating
  const [hasDropped, setHasDropped] = useState(false);   // only trigger once per page-load
  const heroRef = useRef(null);

  // Scroll tracker
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    requestAnimationFrame(() => setLoaded(true));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver: trigger drop once when hero exits viewport from the top
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0 && !hasDropped) {
          setDropping(true);
          setHasDropped(true);
        }
      },
      { threshold: 0 }
    );
    obs.observe(hero);
    // Expose manual trigger for testing (dev only)
    window.__triggerDrop = () => { setDropping(true); setHasDropped(true); };
    return () => { obs.disconnect(); delete window.__triggerDrop; };
  }, [hasDropped]);

  // Ball configs — responsive positions matching the hero balls
  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 720;
  const ballConfigs = isMobileView
    ? [
        // On mobile only the main ball dropped — centered
        { left: '50%', size: 150, delay: 0, dropDist: '70vh' },
      ]
    : [
        // Desktop: small ball upper-left, large ball right
        { left: '10%', size: 120, delay: 100, dropDist: '66vh' },
        { left: '91%', size: 220, delay: 0,   dropDist: '72vh' },
      ];

  return (
    <>
      <Nav scrolled={scrollY > 40} />
      <div
        ref={heroRef}
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <Hero scrollY={scrollY} />
      </div>
      <About />
      <Services />
      <Promise />
      <Testimonials />
      <Contact />
      <Footer />

      {/* Falling balls portal — renders above everything */}
      {dropping && (
        <FallingBalls
          balls={ballConfigs}
          onDone={() => setDropping(false)}
        />
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
