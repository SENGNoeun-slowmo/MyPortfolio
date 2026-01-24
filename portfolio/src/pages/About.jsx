import React from 'react';

function About() {
    return (
        <div className='text-9xl'>about see you soon</div>
    );
  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            I'm a passionate developer who loves creating beautiful, functional, and user-friendly digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image / Illustration */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.03] transition-transform duration-500">
              <img
                src="/path/to/your-photo.jpg" // ← Replace with your photo
                alt="Your Name"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Optional decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Hi, I'm Seng 👋
            </h3>

            <p className="text-gray-700 leading-relaxed text-lg">
              I'm a <span className="font-semibold text-blue-600">Frontend Developer</span> based in Phnom Penh, Cambodia, 
              with a strong passion for building modern web applications using React, TypeScript, and Tailwind CSS.
            </p>

            <p className="text-gray-700 leading-relaxed">
              I enjoy turning complex problems into simple, beautiful, and intuitive solutions. 
              When I'm not coding, you can find me exploring new technologies, 
              playing video games, or enjoying a good cup of coffee.
            </p>

            {/* Quick facts / Highlights */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">Phnom Penh, Cambodia</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Focus</p>
                <p className="font-medium text-gray-900">Frontend & UI/UX</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Favorite Stack</p>
                <p className="font-medium text-gray-900">React + TypeScript + Tailwind</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Currently Learning</p>
                <p className="font-medium text-gray-900">Three.js & Framer Motion</p>
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Let's Work Together
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;