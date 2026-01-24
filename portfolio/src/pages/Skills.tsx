import React, { type JSX } from 'react';
import loading from "../assets/loading-flash.webp"; // fixed typo

interface SkillsProps {
  isLoading: boolean;
  isError: boolean;
  skills: Array<{ id: string; name: string; level?: string }>;
  normalizeSkillName: (name: string) => string;
  iconMap: Record<string, JSX.Element>;
}

function Skills({
  isLoading,
  isError,
  skills,
  normalizeSkillName,
  iconMap,
}: SkillsProps) {
  return (
    <section className="container mx-auto px-6 mt-20 pb-20">
      <h1 className="text-center text-4xl md:text-5xl font-semibold mb-16">
        My Skills
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <img
            src={loading}
            alt="Loading..."
            className="w-40 h-40 object-contain animate-pulse"
          />
        </div>
      )}

      {isError && (
        <div className="text-center py-20 text-red-600 font-medium">
          Failed to load skills. Please try again later.
        </div>
      )}

      {!isLoading && !isError && skills.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No skills found
        </div>
      )}

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-2">
        {skills.map((skill) => {
          const key = normalizeSkillName(skill.name);

          return (
            <div
              key={skill.id}
              className="h-44 sm:h-48  flex flex-col items-center justify-center
                         bg-white border-4 border-gray-800 rounded-2xl
                         shadow hover:shadow-xl hover:-translate-y-1.5 hover:border-gray-900
                         transition-all duration-300"
            >
              <div className="text-5xl sm:text-6xl mb-3">
                {iconMap[key] || <span className="text-gray-400">?</span>}
              </div>

              <span className="font-semibold text-gray-900 text-base sm:text-lg">
                {skill.name}
              </span>

              {skill.level && (
                <span className="text-xs sm:text-sm text-gray-500 mt-1.5 px-3 text-center">
                  {skill.level}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;