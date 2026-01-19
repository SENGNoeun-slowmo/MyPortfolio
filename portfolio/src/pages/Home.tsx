import React, { type JSX } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPhp,
  FaLaravel,
  FaNodeJs,
  FaPython,
  FaGit,
  FaFacebook,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiTypescript } from "react-icons/si";

import useFetchData from "../Use/useFetchData";
import Experience from "./Experience";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SKILLS_URL = `${API_URL}/api/skills`;

/* ================= TYPES ================= */
type Skill = {
  id: string;
  name: string;
  level?: string;
  created_at?: string | null;
};

/* ================= HELPERS ================= */
const normalizeSkillName = (name: string) =>
  name.trim().toLowerCase();

/* ================= ICON MAP ================= */
const iconMap: Record<string, JSX.Element> = {
  html: <FaHtml5 className="text-orange-500" />,
  css: <FaCss3Alt className="text-blue-500" />,
  javascript: <FaJs className="text-yellow-400" />,
  react: <FaReact className="text-sky-400" />,
  "tailwind css": <SiTailwindcss className="text-sky-400" />,
  php: <FaPhp className="text-purple-600" />,
  laravel: <FaLaravel className="text-red-500" />,
  "node.js": <FaNodeJs className="text-green-600" />,
  mysql: <SiMysql className="text-blue-600" />,
  python: <FaPython className="text-yellow-500" />,
  typescript: <SiTypescript className="text-blue-500" />,
  git: <FaGit className="text-red-500" />,
};

/* ================= COMPONENT ================= */
function Home() {
  const { data, isLoading, isError } = useFetchData(SKILLS_URL);

  const skills: Skill[] = (data || []).sort((a, b) =>
    (a.created_at || "").localeCompare(b.created_at || "")
  );

  const mediaIcons = [
    { icon: <FaFacebook />, name: "Facebook" },
    { icon: <FaTelegram />, name: "Telegram" },
    { icon: <FaInstagram />, name: "Instagram" },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="w-full h-[70vh]">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Mobile Image */}
          <div className="md:hidden h-[45vh]">
            <img
              className="w-full h-full object-cover"
              src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
              alt="profile"
            />
          </div>

          {/* Text */}
          <div className="flex justify-center px-6 md:px-12">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl text-gray-500">
                Hello <span className="text-gray-900 font-semibold">I'm Seng Noeun,</span>
              </h1>

              <h1 className="text-3xl md:text-4xl mt-2 text-gray-900 font-semibold">
                Frontend <span className="text-gray-500 font-normal">Developer</span>
              </h1>

              <h1 className="text-3xl md:text-4xl mt-2 text-gray-500">
                Based In <span className="text-gray-900 font-semibold">Cambodia</span>
              </h1>

              <p className="text-base text-gray-600 mt-6 leading-relaxed">
                Passionate frontend developer focused on building clean,
                scalable and user-friendly interfaces.
              </p>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="hidden md:flex justify-center">
            <img
              className="w-[80%] max-w-lg object-contain"
              src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
              alt="profile"
            />
          </div>
        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      <section className="container mx-auto mt-16 px-6">
        <div className="flex gap-6">
          {mediaIcons.map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center px-6 py-4 border rounded-xl
                         hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="text-2xl mb-1">{m.icon}</div>
              <span className="text-sm font-medium text-gray-700">{m.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="container mx-auto px-6 mt-20 pb-20">
        <h1 className="text-center text-4xl md:text-5xl font-semibold mb-16">
          My Skills
        </h1>

        {isLoading && (
          <div className="text-center py-20 text-gray-500">
            Loading skills...
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-500">
            Failed to load skills
          </div>
        )}

        {!isLoading && !isError && skills.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No skills found
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill) => {
            const key = normalizeSkillName(skill.name);

            return (
              <div
                key={skill.id}
                className="h-40 flex flex-col items-center justify-center
                           bg-white border-4 border-black rounded-xl
                           shadow-sm hover:shadow-lg hover:-translate-y-1
                           transition-all"
              >
                <div className="text-5xl mb-3">
                  {iconMap[key] || "⚡"}
                </div>

                <span className="font-medium text-gray-800">
                  {skill.name}
                </span>

                {skill.level && (
                  <span className="text-xs text-gray-500 mt-1 text-center px-2">
                    {skill.level}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <Experience />
    </>
  );
}

export default Home;
