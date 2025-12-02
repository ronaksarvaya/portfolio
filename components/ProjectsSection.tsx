'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  github?: string;
  image: string;
  technologies: string[];
}

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Data object as placeholder - you can easily update this
  const projects: Project[] = [
    {
      id: 1,
      title: 'Vote-R',
      description: 'Digital voting platform that lets users host secure voting sessions with real-time results',
      url: 'https://vote-r.vercel.app',
      github: 'https://github.com/ronaksarvaya/voteR',
      image: '/VoteR.png',
      technologies: ['React', 'MongoDB', 'Tailwind CSS', 'Node.js', 'Express.js']
    },
    {
      id: 2,
      title: 'I Code This',
      description: 'An interactive coding platform designed to enhance learning experiences. Features real-time collaboration and code execution.',
      url: 'https://ronaksarvaya.github.io/i_code_this/',
      github: 'https://github.com/ronaksarvaya/i_code_this',
      image: '/Project2.png',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js']
    },
    {
      id: 3,
      title: 'DentTech',
      description: 'A comprehensive dental management system streamlining clinic operations. Includes appointment scheduling and patient records.',
      url: 'https://ronaksarvaya.github.io/DentTech/',
      github: 'https://github.com/ronaksarvaya/DentTech',
      image: '/Project3.png',
      technologies: ['React', 'Firebase', 'Material-UI', 'Express']
    }
  ];

  return (
    <section className="py-20 px-5 bg-[#0a0a0a]" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            Explore my latest work and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Container */}
              <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-[#667eea] transition-all duration-300 h-full flex flex-col">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col relative z-20">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#667eea] group-hover:to-[#764ba2] group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 text-[#667eea] rounded-full border border-[#667eea]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-center rounded-lg font-medium hover:shadow-lg hover:shadow-[#667eea]/50 transition-all duration-300 hover:scale-105"
                    >
                      View Live
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#3a3a3a] transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        title="View on GitHub"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                {hoveredId === project.id && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500 -z-10"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More Section */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/ronaksarvaya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a1a1a] text-white rounded-lg font-medium border border-gray-800 hover:border-[#667eea] hover:shadow-lg hover:shadow-[#667eea]/30 transition-all duration-300 hover:scale-105"
          >
            <span>View More Projects</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
