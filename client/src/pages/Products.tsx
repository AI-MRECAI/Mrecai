import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageTransition from '../components/common/PageTransition';

export default function Products() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to June 1, 2026 00:00:00 UTC
  useEffect(() => {
    const targetDate = new Date('2026-06-01T00:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/product-waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        console.error('Failed to join waitlist:', data.message);
        alert('Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to join waitlist. Please try again.');
    }
  };

  const isLive = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <PageTransition>
      <Helmet>
        <title>A.T.L.A.S. ENGINE - Coming June 1, 2026 | MRECAI</title>
        <meta name="description" content="A.T.L.A.S. ENGINE is coming to MRECAI. The fully autonomous revenue engine that hunts, qualifies, enriches, and delivers ready-to-close prospects. Launching June 1, 2026." />
      </Helmet>

      {/* Coming Soon Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white overflow-hidden pt-24 md:pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 168, 232, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container-custom relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 text-primary-300 uppercase"
            >
              DEPLOYING JUNE 1, 2026
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2"
            >
              Your Pipeline Won't Fill Itself.{' '}
              <span className="text-primary-400">Yet.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-8 md:mb-12 px-2"
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-3 md:mb-4">
                <strong className="text-white">A.T.L.A.S. ENGINE</strong> is coming to MRECAI. The fully autonomous revenue engine that hunts, qualifies, enriches, and delivers ready-to-close prospects — while your team focuses on closing, not chasing.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400">
                Access opens June 1. Early waitlist members get priority deployment + locked-in rates.
              </p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 md:mb-12"
            >
              {isLive ? (
                <a
                  href="/products"
                  className="inline-flex items-center text-xl sm:text-2xl md:text-3xl font-bold text-primary-400 hover:text-primary-300 transition-colors px-4"
                >
                  A.T.L.A.S. ENGINE IS LIVE. →
                </a>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-2xl mx-auto px-2">
                  {[
                    { value: timeLeft.days, label: 'DAYS' },
                    { value: timeLeft.hours, label: 'HOURS' },
                    { value: timeLeft.minutes, label: 'MIN' },
                    { value: timeLeft.seconds, label: 'SEC' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 border border-white/10">
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-400 mb-1 md:mb-2">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Early Access Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-xl mx-auto mb-6 md:mb-8 px-2"
            >
              {submitted ? (
                <div className="bg-primary-500/20 border border-primary-500/30 rounded-xl p-4 md:p-6 text-center">
                  <p className="text-base md:text-lg font-semibold text-primary-300">
                    You're in. MRECAI will reach out before June 1.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all text-sm md:text-base"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap text-sm md:text-base"
                  >
                    JOIN THE WAITLIST →
                  </button>
                </form>
              )}
              <p className="text-xs md:text-sm text-gray-400 mt-2 md:mt-3">
                No spam. Priority onboarding for waitlist members.
              </p>
            </motion.div>

            {/* Trust Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto pt-6 md:pt-8 border-t border-white/10 px-2"
            >
              {[
                { label: 'New York Based', sublabel: 'US & Remote' },
                { label: '4.9/5 Rating', sublabel: '180+ Clients' },
                { label: 'Secure & Private', sublabel: 'SOC2 Compliant' }
              ].map((item, index) => (
                <div key={index} className="text-center py-2">
                  <div className="text-sm md:text-base lg:text-lg font-semibold text-white mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    {item.sublabel}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
