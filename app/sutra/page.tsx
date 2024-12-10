"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const closest = visibleEntries.reduce((prev, curr) => {
            const prevBound = prev.boundingClientRect;
            const currBound = curr.boundingClientRect;
            return Math.abs(prevBound.top) < Math.abs(currBound.top) ? prev : curr;
          });
          setActiveSection(closest.target.id);
        }
      },
      {
        rootMargin: '-10% 0px -85% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );

    document.querySelectorAll('h2').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const sections = [
    "经题大意",
    "说法场景",
    "极乐世界",
    "庄严妙音",
    "佛德无量",
    "往生法门",
    "流通分"
  ];

  const MenuButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="fixed left-4 bottom-4 z-50 bg-amber-100 text-[#8B4513] p-3 rounded-full shadow-lg hover:bg-amber-200 transition-colors duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  return (
    <>
      <MenuButton />
      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed left-4 bottom-20 w-64 bg-white/95 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-amber-100 max-h-[70vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-[#8B4513] border-b border-amber-200 pb-2">目录</h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`text-left w-full px-2 py-1 rounded text-sm hover:bg-amber-50 transition-colors duration-200
                      ${activeSection === section ? 'text-[#8B4513] font-bold bg-amber-50' : 'text-[#4A3728]'}`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-20">
    <h2 id={title} className="text-3xl font-bold mb-8 text-[#8B4513] text-center border-b-2 border-[#8B4513] pb-4 max-w-2xl mx-auto scroll-mt-32">{title}</h2>
    <div className="space-y-8">{children}</div>
  </div>
);

export default function Sutra() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-20 text-[#8B4513] tracking-wider relative">
          如来诸经
          <div className="absolute w-32 h-1 bg-amber-400 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/sutra/amitabha" className="group">
            <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold text-center text-[#8B4513] mb-4 group-hover:text-amber-600">阿弥陀经</h2>
              <p className="text-[#4A3728] text-center">佛说阿弥陀经，又称《小无量寿经》，是净土三经之一，为释迦牟尼佛所说之经典。</p>
            </div>
          </Link>
          
          {/* 后续可以添加更多经典 */}
        </div>
      </div>
    </div>
  );
} 