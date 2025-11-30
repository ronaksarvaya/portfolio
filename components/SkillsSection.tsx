'use client';

export default function SkillsSection() {
  const skills = {
    frontend: [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Tailwind' },
    ],
    backend: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Python' },
    ],
    languages: [
      { name: 'C' },
      { name: 'C++' },
      { name: 'Java' },
    ],
    database: [
      { name: 'MySQL' },
      { name: 'SQL' },
    ],
  };

  return (
    <section className="skills opacity-0 py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-gray-700 p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <svg className="w-8 h-8 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Skills
            </h2>
          </div>

          {/* Frontend */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#9CDCFE] mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-3">
              {skills.frontend.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 rounded-full border-2 border-[#667eea] text-[#667eea] bg-transparent hover:bg-[#667eea] hover:text-white transition-all duration-300 cursor-pointer font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#9CDCFE] mb-3">Backend</h3>
            <div className="flex flex-wrap gap-3">
              {skills.backend.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 rounded-full border-2 border-[#764ba2] text-[#764ba2] bg-transparent hover:bg-[#764ba2] hover:text-white transition-all duration-300 cursor-pointer font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Programming Languages */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#9CDCFE] mb-3">Programming Languages</h3>
            <div className="flex flex-wrap gap-3">
              {skills.languages.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 rounded-full border-2 border-[#667eea] text-[#667eea] bg-transparent hover:bg-[#667eea] hover:text-white transition-all duration-300 cursor-pointer font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Database */}
          <div>
            <h3 className="text-lg font-semibold text-[#9CDCFE] mb-3">Database</h3>
            <div className="flex flex-wrap gap-3">
              {skills.database.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 rounded-full border-2 border-[#764ba2] text-[#764ba2] bg-transparent hover:bg-[#764ba2] hover:text-white transition-all duration-300 cursor-pointer font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
