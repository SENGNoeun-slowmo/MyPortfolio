// src/pages/Home.tsx
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

import useFetchData from "../Use/useFetchData"; // adjust path
import Profile from "./Profile";
import Skills from "../pages/Skills";     // ← renamed for clarity (was Skill)
import Experiences from "../pages/Experience";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SKILLS_URL      = `${API_URL}/api/skills`;
const EXPERIENCES_URL = `${API_URL}/api/experiences`;
const PROFILE_URL     = `${API_URL}/api/profiles`;

/* ================= TYPES ================= */
type Skill = {
  id: string;
  name: string;
  level?: string;
  created_at?: string | null;
};

type Experience = {
  id: string;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
};

type  Profiles ={
  id: string;
  full_name: string;
  title: string;
  bio: string;
  profile_image_: string;
}

/* ================= HELPERS ================= */
const normalizeSkillName = (name: string) => name.trim().toLowerCase();

const iconMap: Record<string, JSX.Element> = {
  html:           <FaHtml5       className="text-orange-500 text-5xl" />,
  css:            <FaCss3Alt     className="text-blue-500 text-5xl" />,
  javascript:     <FaJs          className="text-yellow-400 text-5xl" />,
  react:          <FaReact       className="text-sky-400 text-5xl" />,
  "tailwind css": <SiTailwindcss className="text-sky-400 text-5xl" />,
  php:            <FaPhp         className="text-purple-600 text-5xl" />,
  laravel:        <FaLaravel     className="text-red-500 text-5xl" />,
  "node.js":      <FaNodeJs      className="text-green-600 text-5xl" />,
  mysql:          <SiMysql       className="text-blue-600 text-5xl" />,
  python:         <FaPython      className="text-yellow-500 text-5xl" />,
  typescript:     <SiTypescript  className="text-blue-500 text-5xl" />,
  git:            <FaGit         className="text-red-500 text-5xl" />,
};

/* ================= SOCIAL LINKS ================= */
const socialLinks = [
  {
    icon: <FaFacebook className="text-blue-600 text-4xl" />,
    name: "Facebook",
    url: "https://facebook.com/sengnoeun", // ← UPDATE WITH YOUR REAL LINKS!
  },
  {
    icon: <FaTelegram className="text-sky-500 text-4xl" />,
    name: "Telegram",
    url: "https://t.me/sengnoeun",
  },
  {
    icon: <FaInstagram className="text-pink-600 text-4xl" />,
    name: "Instagram",
    url: "https://instagram.com/sengnoeun",
  },
];

/* ================= MAIN COMPONENT ================= */
function Home() {
  // Fetch profile (assuming API returns single profile object)
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useFetchData<Profiles[]>(PROFILE_URL); // ← single object

  // Fetch skills
  const {
    data: skillsData,
    isLoading: skillsLoading,
    isError: skillsError,
  } = useFetchData<Skill[]>(SKILLS_URL);

  // Fetch experiences
  const {
    data: experiencesData,
    isLoading: expLoading,
    isError: expError,
  } = useFetchData<Experience[]>(EXPERIENCES_URL);

  // Derived & sorted data
  const profile: Profiles | null = profileData?.[0] || null;
  const skills = (skillsData || []).sort((a, b) =>
    (a.created_at || "").localeCompare(b.created_at || "")
  );
  const experiences = experiencesData || [];

  return (
    <main className="min-h-screen bg-blue-50">
      {/* ================= HERO / PROFILE ================= */}
      <Profile
        isLoading={profileLoading}
        isError={profileError}
        profile={profile}
      />

      {/* ================= SOCIAL LINKS ================= */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Connect with Me
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-md 
                         hover:shadow-xl hover:-translate-y-2 transition-all duration-300 min-w-[140px]"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </div>
              <span className="text-lg font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </section>
       
      {/* ================= SKILLS ================= */}
      <Skills
        isLoading={skillsLoading}
        isError={skillsError}
        skills={skills}
        normalizeSkillName={normalizeSkillName}
        iconMap={iconMap}
      />

      {/* ================= EXPERIENCE ================= */}
      <Experiences
        isLoading={expLoading}
        isError={expError}
        experiences={experiences}
      />
    </main>
  );
}

export default Home;