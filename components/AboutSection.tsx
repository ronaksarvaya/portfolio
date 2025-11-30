'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const aboutText = `🚀 Hey there! Excited to dive into coding and sprinkle some magic in our world! 💻 As a budding Front-End Developer, I will weave wonders with HTML, CSS, a dash of JavaScript, and rocking the coding scene with C, C++, SQL, and JAVA skills. 🌟 Patience and persistence are my secret weapons for conquering challenges with clarity and determination! 💪💰 While big salaries and startups sound cool, my real joy comes from a burning passion for coding. Let's keep the thrill alive, building skills and smashing obstacles on this exciting journey! 🔥🚀

POV- A die hard Marvel Fan`;

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px',
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasAnimated]);

  // Typing animation - only starts when section is in view
  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const typingSpeed = 20;

    const typeCharacter = () => {
      if (index < aboutText.length) {
        setDisplayedText(aboutText.substring(0, index + 1));
        index++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        setShowCursor(false);
      }
    };

    const timer = setTimeout(typeCharacter, 500);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="about opacity-0 py-16 px-4 sm:px-6 lg:px-8" id="about">
      <div className="flex flex-col lg:flex-row gap-8 items-center max-w-6xl mx-auto">
        {/* Left Side - Spider-Man Image */}
        <div className="about-left w-full lg:w-auto flex justify-center lg:block">
          <Image
            src="/spidy.png"
            alt="Spider-Man"
            width={300}
            height={300}
            className="object-contain rounded-2xl w-full max-w-[250px] sm:max-w-[300px] h-auto"
          />
        </div>
        
        {/* Right Side - Terminal About */}
        <div className="about-right flex-1 w-full">
          <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal Header */}
            <div className="bg-[#323233] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-gray-400 text-sm ml-4 font-mono">about.txt</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[300px] text-gray-300">
              <div className="mb-4">
                <span className="text-[#4EC9B0]">$ cat about.txt</span>
              </div>
              <div className="mb-4">
                <span className="text-[#C586C0]">## About Me</span>
              </div>
              <div className="whitespace-pre-wrap break-words">
                {displayedText}
                {showCursor && (
                  <span className="inline-block w-2 h-4 bg-[#00ff00] ml-1 animate-pulse"></span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
