'use client';

import { useState, useEffect } from 'react';

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency?: number;
  icon?: string;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Define category order/colors if needed, or just iterate
  const categoryColors: Record<string, string> = {
    'Frontend': '#667eea',
    'Backend': '#764ba2',
    'Tools': '#667eea',
    'Other': '#764ba2',
    // Fallbacks
  };

  return (
    <section className="skills opacity-0 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-gray-700 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Skills
            </h2>
          </div>

          {loading ? (
            <div className="text-center text-gray-400">Loading skills...</div>
          ) : (
            Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#9CDCFE] mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill._id}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full border-2 bg-transparent hover:text-white transition-all duration-300 cursor-pointer font-medium`}
                      style={{
                        borderColor: categoryColors[category] || '#667eea',
                        color: categoryColors[category] || '#667eea',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = categoryColors[category] || '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
