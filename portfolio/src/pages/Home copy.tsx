import React, { useEffect, useState, type JSX } from "react";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaLaravel, 
  FaNodeJs, FaPython, FaGit, FaFacebook, FaTelegram, FaInstagram 
} from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiTypescript } from "react-icons/si";
import axios from "axios";
import Experience from "./Experience";
import fetchDtat from "../Use/FetchData";
// import PhoneSlide from "./PhoneSlide";

const iconMap: Record<string, JSX.Element> = {
  HTML: <FaHtml5 className="text-orange-500" />,
  CSS: <FaCss3Alt className="text-blue-500" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  React: <FaReact className="text-blue-400" />,
  Tailwind: <SiTailwindcss className="text-sky-400" />,
  PHP: <FaPhp className="text-purple-700" />,
  Laravel: <FaLaravel className="text-red-600" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  MySQL: <SiMysql className="text-blue-700" />,
  Python: <FaPython className="text-yellow-600" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  Git: <FaGit className="text-red-500" />,
  // Add more as needed
};

interface Skill {
  id: string;
  name: string;
  level?: string;       // optional - you can show this later
  created_at?: string | null;
}
const url="http://localhost:5000/api/skills";
function Home() {
  const {data,iserror ,isloading}=fetchData(url)
  const list = data?.data || [];


  const mediaIcons = [
    { icon: <FaFacebook />, name: "Facebook" },
    { icon: <FaTelegram />, name: "Telegram" },
    { icon: <FaInstagram />, name: "Instagram" },
  ];

  return (
    <>
      {/* Hero section - keeping your original */}
      <div className="w-full h-[70vh] px-0">
        {/* ... your existing hero code ... */}
      </div>

      {/* Social Media */}
      <div className="container mx-auto mt-16 px-4">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {mediaIcons.map((media, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="text-3xl mb-1">{media.icon}</div>
              <span className="text-sm font-medium">{media.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section - Now using real data */}
      <div className="container mx-auto px-4 mt-20">
        <h1 className="text-center font-mono text-4xl mb-12">My Skills</h1>

        {loading ? (
          <div className="text-center py-12 text-xl">Loading skills...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : skills.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xl">
            No skills added yet
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="group relative h-48 flex flex-col items-center justify-center bg-white 
                         shadow-md rounded-xl border-2 border-black overflow-hidden
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {iconMap[skill.name] || "⚡"}
                </div>
                <span className="text-lg font-semibold text-center px-3">
                  {skill.name}
                </span>

                {/* Optional: show level when you start using it */}
                {skill.level && skill.level !== "test description" && (
                  <span className="absolute bottom-2 text-xs text-gray-500">
                    {skill.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="phoneslide mt-20">
        {/* <PhoneSlide /> */}
      </div>

      <Experience />
    </>
  );
}

export default Home;