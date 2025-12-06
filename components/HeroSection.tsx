'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, Copy, Check, Twitter } from 'lucide-react';

interface Skill {
  _id: string;
  name: string;
  category: string;
}

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const email = "ronaksarvaya@gmail.com"; // Assuming email based on context, placeholder if unknown

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skills: Skill[] = [
    { _id: '1', name: 'HTML', category: 'Frontend' },
    { _id: '2', name: 'CSS', category: 'Frontend' },
    { _id: '3', name: 'JavaScript', category: 'Frontend' },
    { _id: '4', name: 'React', category: 'Frontend' },
    { _id: '5', name: 'Next.js', category: 'Frontend' },
    { _id: '6', name: 'TailwindCSS', category: 'Frontend' },
    { _id: '7', name: 'Node.js', category: 'Backend' },
    { _id: '8', name: 'Express', category: 'Backend' },
    { _id: '9', name: 'MongoDB', category: 'Backend' },
    { _id: '10', name: 'SQL', category: 'Backend' },
    { _id: '11', name: 'Java', category: 'Backend' },
    { _id: '12', name: 'C++', category: 'Backend' },
    { _id: '13', name: 'Git', category: 'Tools' },
    { _id: '14', name: 'GitHub', category: 'Tools' },
    { _id: '15', name: 'VS Code', category: 'Tools' },
    { _id: '16', name: 'Postman', category: 'Tools' },
  ];

  // Grouping logic removed as per request to flatten the list
  /* 
  const groupedSkills = skills.reduce((acc, skill) => {
    ...
  }, {} as Record<string, Skill[]>);
  */

  const categoryColors: Record<string, string> = {
    'Frontend': '#667eea',
    'Backend': '#764ba2',
    'Tools': '#667eea',
    'Other': '#764ba2',
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8 gap-6 max-w-3xl mx-auto w-full">
      {/* Intro Block (Name & Image) */}
      <div className="flex flex-col-reverse lg:flex-row gap-6 items-center w-full justify-between">
        {/* Left Side - Text */}
        <div className="flex-1 text-center lg:text-left space-y-3">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-400">
            Hello, I'm
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
            Ronak Sarvaya
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            A passionate full-stack developer focused on delivering premium, high-performance web app experiences through clean architecture and innovative design.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex-shrink-0">
          <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full blur-2xl opacity-30"></div>
            <Image
              src="/ronakimg.png"
              alt="Ronak Sarvaya"
              fill
              className="object-cover rounded-full border-2 border-[#1e1e1e] shadow-xl hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </div>

      {/* Skills & Connect Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* Skills Column */}
        <Card className="bg-[#1e1e1e] border-gray-700">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-1.5 bg-[#667eea]/10 rounded-lg">
                <svg className="w-6 h-6 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Skills
              </h2>
            </div>

            {/* Flattened Skills List */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill._id}
                  variant="secondary"
                  className="px-2.5 py-1 text-sm bg-transparent border hover:bg-transparent transition-all duration-300 pointer-events-none"
                  style={{
                    borderColor: categoryColors[skill.category] || '#667eea',
                    color: categoryColors[skill.category] || '#667eea',
                  }}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connect Column */}
        <Card className="bg-[#1e1e1e] border-gray-700 h-full">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-1.5 bg-[#764ba2]/10 rounded-lg">
                <svg className="w-6 h-6 text-[#764ba2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.57 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Let's Connect
              </h2>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              {/* Social Buttons */}
              <div className="flex gap-4 justify-start">
                <Button
                  asChild
                  size="icon"
                  className="bg-transparent border border-gray-700 text-gray-400 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] w-12 h-12 rounded-lg transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <a href="https://www.linkedin.com/in/ronak-sarvaya" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="icon"
                  className="bg-transparent border border-gray-700 text-gray-400 hover:text-black hover:bg-white hover:border-white w-12 h-12 rounded-lg transition-all duration-300"
                  aria-label="GitHub"
                >
                  <a href="https://github.com/ronaksarvaya" target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="icon"
                  className="bg-transparent border border-gray-700 text-gray-400 hover:text-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] w-12 h-12 rounded-lg transition-all duration-300"
                  aria-label="Twitter"
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-6 h-6" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="icon"
                  className="bg-transparent border border-gray-700 text-gray-400 hover:text-white hover:bg-black hover:border-white w-12 h-12 rounded-lg transition-all duration-300"
                  aria-label="X"
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </Button>
              </div>

              {/* Email Section */}
              <div className="mt-auto space-y-3">
                <div className="p-4 rounded-xl bg-black/20 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Email Address</span>
                    {copied ? (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">Click to copy</span>
                    )}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="w-full text-left flex items-center justify-between group"
                  >
                    <span className="text-lg sm:text-xl font-mono text-gray-200 group-hover:text-[#667eea] transition-colors truncate">
                      {email}
                    </span>
                    <Copy className="w-5 h-5 text-gray-500 group-hover:text-[#667eea] transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
