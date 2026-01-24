import React from "react";

interface Experience {
  id: string;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string;
  responsibilities: string[]|null;
}

interface ExperienceProps {
  isLoading: boolean;
  isError: boolean;
  experiences?: Experience[] | null; // Still allow null/undefined from parent
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // Fallback for invalid dates
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const formatDuration = (start: string, end: string): string => {
  const startFormatted = formatDate(start);
  const endFormatted = end.toLowerCase() === "present" ? "Present" : formatDate(end);
  return `${startFormatted} — ${endFormatted}`;
};

function Experience({
  isLoading,
  isError,
  experiences: rawExperiences = [], // Default if undefined
}: ExperienceProps) {
  // Normalize to array (handles null, undefined, or actual array)
  const experiences = rawExperiences ?? [];

  // Loading state
  if (isLoading) {
    return (
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Professional Experience
        </h2>
        <p className="text-xl text-gray-600">Loading experiences...</p>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Professional Experience
        </h2>
        <p className="text-xl text-red-600 font-medium">
          Failed to load experiences. Please try again later.
        </p>
      </section>
    );
  }

  // Empty state (now safe even if null)
  if (experiences.length === 0) {
    return (
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Professional Experience
        </h2>
        <p className="text-xl text-gray-600">
          No experience data available yet.
        </p>
      </section>
    );
  }

  // Success state
  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
        Professional Experience
      </h2>

      <div className="grid gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group bg-white rounded-2xl shadow-lg p-8 
                       border border-gray-100 hover:shadow-2xl hover:scale-[1.02] 
                       transition-all duration-300"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {exp.role}
            </h3>
            <p className="text-xl font-semibold text-indigo-600 mb-1">
              {exp.company_name}
            </p>
            <p className="text-base text-gray-500 italic mb-6">
              {formatDuration(exp.start_date, exp.end_date)}
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700">
  {(exp.responsibilities ?? []).map((task, i) => (  // ← Add ?? [] here!
    <li key={i} className="leading-relaxed">
      {task}
    </li>
  ))}
</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;