// Mellow Media — root app

const { useState, useEffect } = React;

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

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
