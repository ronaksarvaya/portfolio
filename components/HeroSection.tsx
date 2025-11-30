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
      text: 'LinkedIn: linkedin.com/in/ronak-sarvaya', 
      link: 'https://www.linkedin.com/in/ronak-sarvaya',
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
