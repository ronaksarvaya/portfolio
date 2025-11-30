'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TerminalLine {
  type: string;
  text: string;
  link?: string;
}

export default function HeroSection() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines: (TerminalLine & { delay: number })[] = [
    { type: 'command', text: '$ cat introduction.txt', delay: 300 },
    { type: 'output', text: 'Hi, I\'m Ronak Sarvaya.', delay: 100 },
    { type: 'output', text: 'A passionate Student, trying to revolutionize something. 📍', delay: 50 },
    { type: 'output', text: '', delay: 50 },
    { type: 'command', text: '$ ls skills/', delay: 200 },
    { type: 'output', text: 'HTML  CSS  JavaScript  C  C++  Java  SQL', delay: 100 },
    { type: 'output', text: '', delay: 50 },
    { type: 'command', text: '$ echo $SOCIAL_LINKS', delay: 200 },
    { 
      type: 'output', 
      text: 'LinkedIn: linkedin.com/in/ronak-sarvaya-2a331a223/', 
      link: 'https://www.linkedin.com/in/ronak-sarvaya-2a331a223/',
      delay: 50 
    },
    { 
      type: 'output', 
      text: 'GitHub: github.com/ronaksarvaya', 
      link: 'https://github.com/ronaksarvaya',
      delay: 50 
    },
    { type: 'output', text: '', delay: 50 },
    { type: 'prompt', text: '$ ', delay: 100 },
  ];

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    let charIndex = 0;

    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (charIndex < currentLine.text.length) {
          setCurrentText(currentLine.text.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          
          // Add completed line to lines array
          setLines(prev => [...prev, { 
            type: currentLine.type, 
            text: currentLine.text,
            link: currentLine.link 
          }]);
          setCurrentText('');
          
          // Move to next line after a brief pause
          setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
          }, 100);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    }, currentLine.delay);

    return () => clearTimeout(initialDelay);
  }, [currentLineIndex]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-[#4EC9B0]';
      case 'output':
        return 'text-gray-300';
      case 'prompt':
        return 'text-[#4EC9B0]';
      default:
        return 'text-gray-300';
    }
  };

  const renderLine = (line: TerminalLine, index: number) => {
    if (line.link) {
      return (
        <div key={index} className={`${getLineColor(line.type)} mb-1`}>
          <a 
            href={line.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#667eea] hover:underline cursor-pointer transition-colors duration-200"
          >
            {line.text}
          </a>
        </div>
      );
    }
    
    return (
      <div key={index} className={`${getLineColor(line.type)} mb-1`}>
        {line.text || '\u00A0'}
      </div>
    );
  };

  return (
    <section id="home" className="home min-h-screen flex items-center justify-center px-8 py-20">
      <div className="flex gap-16 items-center max-w-7xl w-full">
        {/* Left Side - Terminal */}
        <div className="flex-1">
          <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal Header */}
            <div className="bg-[#323233] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-gray-400 text-sm ml-4 font-mono">ronak@portfolio:~</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm leading-relaxed min-h-[400px]">
              {/* Completed lines */}
              {lines.map((line, index) => renderLine(line, index))}
              
              {/* Current typing line */}
              {currentText && (
                <div className={`${getLineColor(terminalLines[currentLineIndex]?.type)} mb-1`}>
                  {currentText}
                  {showCursor && (
                    <span className="inline-block w-2 h-4 bg-[#00ff00] ml-1"></span>
                  )}
                </div>
              )}
              
              {/* Blinking cursor on prompt when complete */}
              {isComplete && showCursor && (
                <span className="inline-block w-2 h-4 bg-[#00ff00]"></span>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-6">
            <a 
              href="https://www.linkedin.com/in/ronak-sarvaya-2a331a223/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#667eea] hover:text-[#764ba2] transition-all duration-300 hover:-translate-y-1"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/ronaksarvaya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#667eea] hover:text-[#764ba2] transition-all duration-300 hover:-translate-y-1"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl blur-2xl opacity-30"></div>
            <Image
              src="/ronakimg.png"
              alt="Ronak Sarvaya"
              width={400}
              height={400}
              className="relative rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
             {/* something to write beklow my photo */}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
