import React from 'react';

interface Profiles {
  id: string;
  full_name: string;
  title: string;
  bio: string;
  profile_image: string;
}

interface ProfileProps {
  isLoading: boolean;
  isError: boolean;
  profile?: Profiles | null;
}

function Profile({ isLoading, isError, profile = null }: ProfileProps) {
  // ─── Loading ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="container mx-auto py-12 px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Professional Profile
        </h2>
        <p className="text-lg sm:text-xl text-gray-600">Loading profile...</p>
      </section>
    );
  }

  // ─── Error ──────────────────────────────────────────────────
  if (isError) {
    return (
      <section className="container mx-auto py-12 px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Professional Profile
        </h2>
        <p className="text-lg sm:text-xl text-red-600 font-medium">
          Failed to load profile. Please try again later.
        </p>
      </section>
    );
  }

  // ─── No data ────────────────────────────────────────────────
  if (!profile) {
    return (
      <section className="container mx-auto py-12 px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Professional Profile
        </h2>
        <p className="text-lg sm:text-xl text-gray-600">No profile data available yet.</p>
      </section>
    );
  }

  // ─── Main content ───────────────────────────────────────────
  return (
    <section className="w-full min-h-[70vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center py-12 md:py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16 xl:gap-20">
          {/* Left – Text */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6 md:space-y-8 lg:space-y-10">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Hello, I'm <span className="text-indigo-600">{profile.full_name}</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {profile.title}
              <span className="text-gray-600"> Developer</span>
            </h2>

            <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-700 font-medium">
              Based in <span className="text-gray-900 font-semibold">Cambodia</span>
            </p>

            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto md:mx-0">
              {profile.bio}
            </p>
          </div>

          {/* Right – Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="relative w-64 xs:w-72 sm:w-80 md:w-96 lg:w-[420px] xl:w-[480px] max-w-full">
              <img
                className={`
                  w-full aspect-square object-cover 
                  rounded-2xl sm:rounded-3xl 
                  shadow-2xl 
                  border-8 border-white 
                  transition-transform duration-500 hover:scale-[1.02]
                `}
                src={profile.profile_image}
                alt={`${profile.full_name} – ${profile.title} Developer`}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;