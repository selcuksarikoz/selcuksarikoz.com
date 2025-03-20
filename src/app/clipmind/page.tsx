"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  History,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, delay]);

  return (
    <div
      ref={setRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function Climind() {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  className="h-8 w-auto"
                  src="/images/apps/clipmind/clipmind.png"
                  alt="ClipMind"
                  width={32}
                  height={32}
                />
                <span className="ml-2 text-xl font-bold text-blue-500">
                  ClipMind
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/selcuksarikoz/apps-release?tab=readme-ov-file#clipmind"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 !text-white text-sm font-medium hover:opacity-90 transition-all shadow-md"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-70"></div>
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-b from-blue-100 to-transparent rounded-bl-full opacity-60"></div>
        <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-gradient-to-t from-cyan-100 to-transparent rounded-tr-full opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center lg:text-left lg:col-span-6">
              <ScrollReveal className="w-full">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 mb-8 shadow-sm">
                  <span className="mr-2">🚀</span>
                  <span>Now live on Product Hunt</span>
                </div>
                <h1 className="text-5xl tracking-tight font-black text-gray-900 sm:text-6xl md:text-7xl">
                  <span className="block">Never lose</span>
                  <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    what you copy
                  </span>
                </h1>
                <p className="mt-6 text-xl text-gray-600 sm:mt-8 sm:text-2xl font-light sm:max-w-xl sm:mx-auto lg:mx-0 leading-relaxed">
                  ClipMind stores everything you copy, securely within the app.
                  Access your entire clipboard history instantly.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                  <a
                    href="https://github.com/selcuksarikoz/apps-release?tab=readme-ov-file#clipmind"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all md:text-lg"
                    style={{ color: "white" }}
                  >
                    Download Now
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 sm:mt-0 w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-blue-500 transition-all md:text-lg"
                  >
                    <Clipboard size={20} className="mr-2" />
                    How it works
                  </a>
                </div>
              </ScrollReveal>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6 relative">
              <ScrollReveal delay={300} className="w-full">
                <div className="absolute -right-10 -top-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full filter blur-3xl opacity-30"></div>
                <div className="relative mx-auto w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-700">
                  <Image
                    className="w-full"
                    src="/images/apps/clipmind/clipmind-promo.png"
                    alt="ClipMind App Screenshot"
                    width={1024}
                    height={1024}
                  />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-blue-400 to-cyan-300 rounded-full filter blur-2xl opacity-20"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/apps/pattern-grid.png')] opacity-5"></div>
        <div className="absolute -left-20 top-0 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-100 rounded-full filter blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal className="w-full">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                How it{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  works
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 font-light leading-relaxed">
                ClipMind works silently in the background, capturing everything
                you copy with just a simple Cmd/Ctrl+C.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="lg:order-2">
              <ScrollReveal className="w-full" delay={150}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
                  <div className="relative">
                    {/* Slideshow */}
                    <div className="relative overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-${activeSlide * 100}%)`,
                        }}
                      >
                        <div className="w-full flex-shrink-0">
                          <Image
                            src="/images/apps/clipmind/clipmind-preview.png"
                            alt="ClipMind main interface"
                            className="w-full h-auto"
                            width={1200}
                            height={600}
                          />
                        </div>
                        <div className="w-full flex-shrink-0">
                          <Image
                            src="/images/apps/clipmind/clipmind-preview-2.png"
                            alt="ClipMind features showcase"
                            className="w-full h-auto"
                            width={1200}
                            height={600}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Navigation arrows */}
                    <button
                      onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight size={20} className="text-gray-700" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      <button
                        onClick={() => setActiveSlide(0)}
                        className={`w-2 h-2 rounded-full transition-all ${activeSlide === 0 ? "bg-blue-500 w-4" : "bg-gray-300"}`}
                      ></button>
                      <button
                        onClick={() => setActiveSlide(1)}
                        className={`w-2 h-2 rounded-full transition-all ${activeSlide === 1 ? "bg-blue-500 w-4" : "bg-gray-300"}`}
                      ></button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:order-1">
              <div className="space-y-8">
                <ScrollReveal className="w-full" delay={200}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                        <span className="text-lg font-semibold">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Copy with Cmd/Ctrl+C
                        </h3>
                        <p className="mt-2 text-gray-600">
                          Use your normal keyboard shortcut (Cmd/Ctrl+C) and
                          ClipMind automatically saves your copy - no extra
                          steps needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal className="w-full" delay={300}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                        <span className="text-lg font-semibold">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Access Your History
                        </h3>
                        <p className="mt-2 text-gray-600">
                          Press Option+Space (Mac) or Alt+Space (Windows) to
                          instantly access your clipboard history with
                          categories and search.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal className="w-full" delay={400}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                        <span className="text-lg font-semibold">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Paste Anywhere
                        </h3>
                        <p className="mt-2 text-gray-600">
                          Click any item in your history to instantly paste it
                          into your current application - even items you copied
                          days or weeks ago.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="absolute left-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-r from-blue-50 to-transparent rounded-r-full opacity-70"></div>
        <div className="absolute right-0 bottom-1/4 w-1/3 h-1/2 bg-gradient-to-l from-cyan-50 to-transparent rounded-l-full opacity-70"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <ScrollReveal className="w-full">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Your clipboard,{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  supercharged
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 font-light leading-relaxed">
                ClipMind remembers everything you copy so you don't have to.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:translate-y-[-8px] duration-300">
              <ScrollReveal delay={150} className="w-full">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <History size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Complete History
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Never lose important information again. Just press Cmd/Ctrl+C
                  and ClipMind intelligently stores your entire clipboard
                  history with timestamps and source apps.
                </p>
              </ScrollReveal>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:translate-y-[-8px] duration-300">
              <ScrollReveal delay={300} className="w-full">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Lightning Fast Search
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Instantly find what you're looking for with powerful search
                  across all your copied content, even in images with text
                  recognition.
                </p>
              </ScrollReveal>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:translate-y-[-8px] duration-300">
              <ScrollReveal delay={450} className="w-full">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clipboard size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  One-Click Access
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Access your clipboard history with a simple keyboard shortcut
                  (Alt+Space or Option+Space) from any application, and paste
                  with a single click.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Product Hunt Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/apps/pattern-dots.png')] opacity-5"></div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-tl from-amber-200 to-orange-100 rounded-full filter blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-orange-100">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-16">
                <ScrollReveal className="w-full">
                  <div className="inline-flex items-center p-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-8">
                    {/* Replace Product Hunt logo with SVG */}
                    <Image
                      src={"/images/product-hunt.png"}
                      alt={"product hunt logo"}
                      width={20}
                      height={50}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Support ClipMind on Product Hunt!
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    We've just launched ClipMind on Product Hunt. Your upvote
                    helps us reach more people who could benefit from our
                    clipboard manager.
                  </p>
                  {/* Fixed Upvote Now button color */}
                  <a
                    href="https://www.producthunt.com/posts/clipmind?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-clipmind"
                    target="_blank"
                  >
                    <Image
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=940487&theme=light&t=1742474258635"
                      alt="ClipMind - An&#0032;intelligent&#0032;manager&#0032;that&#0032;remembers&#0044;&#0032;so&#0032;you&#0032;don&#0039;t&#0032;have&#0032;to | Product Hunt"
                      width="250"
                      height="54"
                    />
                  </a>
                </ScrollReveal>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-orange-50 to-amber-50 p-10 md:p-16 flex items-center justify-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>
                <ScrollReveal delay={200} className="w-full">
                  <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative border border-orange-100 hover:translate-y-[-4px] transition-all duration-300">
                    <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      FEATURED
                    </div>
                    <div className="flex items-start mb-6">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-gray-200">
                        <Image
                          src="/images/apps/clipmind/clipmind.png"
                          alt="ClipMind"
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-xl text-gray-900">
                          ClipMind
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          Intelligent clipboard manager
                        </p>
                        <div className="flex items-center gap-1">
                          <Star
                            size={14}
                            className="text-amber-400 fill-amber-400"
                          />
                          <Star
                            size={14}
                            className="text-amber-400 fill-amber-400"
                          />
                          <Star
                            size={14}
                            className="text-amber-400 fill-amber-400"
                          />
                          <Star
                            size={14}
                            className="text-amber-400 fill-amber-400"
                          />
                          <Star
                            size={14}
                            className="text-amber-400 fill-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      "An intelligent clipboard manager that tracks everything
                      you copy, storing it securely within the app. Never lose
                      copied text again!"
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/apps/pattern-grid.png')] opacity-5"></div>
        <div className="absolute -left-20 top-0 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-100 rounded-full filter blur-3xl opacity-30"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border border-blue-100">
            <div className="text-center">
              <ScrollReveal className="w-full">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Never miss an{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    update
                  </span>
                </h2>
                <p className="mt-4 text-xl text-gray-600 font-light leading-relaxed">
                  Join our newsletter to get notified about new features and
                  improvements.
                </p>

                {subscribed ? (
                  <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 flex items-center justify-center text-green-800 border border-green-100 shadow-md">
                    <Check size={24} className="mr-3 text-green-500" />
                    <span className="text-lg font-medium">
                      Thank you for subscribing!
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-10">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-grow px-6 py-4 border border-gray-200 shadow-md placeholder-gray-400 focus:ring-blue-500 focus:border-blue-300 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm"
                        placeholder="Enter your email address"
                      />
                      <button
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all hover:opacity-90"
                      >
                        Subscribe
                      </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <Image
                className="h-8 w-auto"
                src="/images/apps/clipmind/clipmind.png"
                alt="ClipMind"
                width={32}
                height={32}
              />
              <span className="ml-2 text-xl font-bold text-blue-500">
                ClipMind
              </span>
            </div>
            <div className="flex space-x-6 mt-6 md:mt-0">
              {/* Updated Twitter link with the requested handle */}
              <a
                href="https://twitter.com/selcuksarikoz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* Updated GitHub link with the requested handle */}
              <a
                href="https://github.com/selcuksarikoz/apps-release"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-base text-gray-400">
              &copy; 2025 ClipMind. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
