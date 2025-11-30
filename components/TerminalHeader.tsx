'use client';

import { useEffect, useState } from 'react';

export default function TerminalHeader() {
  const [displayedLines, setDisplayedLines] = useState<string[]>(['', '']);
  const [showCursor, setShowCursor] = useState(false);

  const lines = [
    '$ cd /portfolio',
    "Hello, I'm Ronak Sarvaya, a Front-End Developer & B.Sc.IT Student."
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    const typingSpeed = 40;

    const typeCharacter = () => {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = lines[lineIndex].substring(0, charIndex + 1);
            return newLines;
          });
          charIndex++;
          setTimeout(typeCharacter, typingSpeed);
        } else {
          lineIndex++;
          charIndex = 0;
          if (lineIndex < lines.length) {
            setTimeout(typeCharacter, typingSpeed * 2);
          } else {
            setShowCursor(true);
          }
        }
      }
    };

    const timer = setTimeout(typeCharacter, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="w-full bg-terminal-bg py-16 px-5 flex justify-center items-center min-h-[200px]">
      <div className="font-inconsolata text-xl text-terminal-text leading-relaxed text-left max-w-3xl w-full">
        {displayedLines.map((line, index) => (
          <div key={index} className="mb-2">
            {line}
            {index === displayedLines.length - 1 && showCursor && (
              <span className="inline-block w-2.5 h-6 bg-terminal-cursor ml-0.5 terminal-cursor"></span>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
