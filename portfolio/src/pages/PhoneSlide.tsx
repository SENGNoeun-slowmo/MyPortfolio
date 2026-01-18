import React from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaLaravel,
  FaNodeJs,
  FaPython,
  FaGit,
} from "react-icons/fa"

export default function PhoneSlide() {
  return (
    <div className="mx-auto max-w-[500px] w-full mt-24 pb-32">
      {tech.map((item, i) => (
        <Card key={i} {...item} />
      ))}
    </div>
  )
}

interface CardProps {
  icon: React.ReactNode
  name: string
  hueA: number
  hueB: number
}

function Card({ icon, name, hueA, hueB }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

  return (
    <motion.div
      className="relative flex justify-center items-center pt-5 mb-[-120px] overflow-hidden"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8, once: true }}
    >
      {/* splash */}
      <div
        className="absolute inset-0"
        style={{
          background,
          clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        }}
      />

      {/* card */}
      <motion.div
        variants={cardVariants}
        className="
          w-[300px] h-[430px]
          flex flex-col items-center justify-center gap-4
          border-4 border-black
          bg-gray-100
          shadow-md
          origin-[10%_60%]
        "
      >
        <div className="text-[120px] text-gray-800">{icon}</div>
        <span className="text-lg font-semibold">{name}</span>
      </motion.div>
    </motion.div>
  )
}

/* ================= ANIMATION ================= */

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

/* ================= HELPERS ================= */

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/* ================= DATA ================= */

const tech = [
  {
    icon: <FaHtml5 className="text-orange-500" />,
    name: "HTML",
    hueA: 340,
    hueB: 10,
  },
  {
    icon: <FaCss3Alt className="text-blue-500" />,
    name: "CSS",
    hueA: 200,
    hueB: 230,
  },
  {
    icon: <FaJs className="text-yellow-400" />,
    name: "JavaScript",
    hueA: 45,
    hueB: 65,
  },
  {
    icon: <FaReact className="text-cyan-400" />,
    name: "React",
    hueA: 190,
    hueB: 220,
  },
  {
    icon: <FaLaravel className="text-red-600" />,
    name: "Laravel",
    hueA: 350,
    hueB: 10,
  },
  {
    icon: <FaNodeJs className="text-green-600" />,
    name: "Node.js",
    hueA: 110,
    hueB: 140,
  },
  {
    icon: <FaPython className="text-yellow-500" />,
    name: "Python",
    hueA: 50,
    hueB: 80,
  },
  {
    icon: <FaGit className="text-orange-600" />,
    name: "Git",
    hueA: 5,
    hueB: 25,
  },
]
