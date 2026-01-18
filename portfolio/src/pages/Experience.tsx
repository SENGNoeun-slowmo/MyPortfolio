import React from "react";

function Experience() {
  // You can add more experiences in this array
  const experiences = [
    {
      role: "Frontend Developer",
      company: "ABC Tech Solutions",
      duration: "Jan 2023 - Present",
      responsibilities: [
        "Developed responsive web applications using React.js and Tailwind CSS.",
        "Collaborated with designers to create UI/UX for multiple projects.",
        "Optimized web pages for performance and SEO.",
      ],
    },
    {
      role: "Web Developer Intern",
      company: "XYZ Digital Agency",
      duration: "Jun 2022 - Dec 2022",
      responsibilities: [
        "Assisted in building websites using HTML, CSS, and JavaScript.",
        "Implemented dynamic UI components using React.",
        "Performed cross-browser testing and debugging.",
      ],
    },
  ];

  return (
    <div className="container mx-auto my-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-8">Experience</h2>
      <div className="grid gap-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-2xl font-semibold">{exp.role}</h3>
            <p className="text-gray-500">{exp.company}</p>
            <p className="text-gray-400 italic mb-4">{exp.duration}</p>
            <ul className="list-disc list-inside space-y-2">
              {exp.responsibilities.map((task, i) => (
                <li key={i} className="text-gray-700">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
