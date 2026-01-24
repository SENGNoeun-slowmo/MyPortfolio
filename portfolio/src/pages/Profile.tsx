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
  // Loading state
  if (isLoading) {
    return (
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Professional Profile
        </h2>
        <p className="text-xl text-gray-600">Loading profile...</p>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Professional Profile
        </h2>
        <p className="text-xl text-red-600 font-medium">
          Failed to load profile. Please try again later.
        </p>
      </section>
    );
  }

  // Empty state
  if (!profile) {
    return (
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          Professional Profile
        </h2>
        <p className="text-xl text-gray-600">No profile data available yet.</p>
      </section>
    );
  }

  return (
    <section className="w-full min-h-[80vh] flex items-center py-16 md:py-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Hello, I'm <span className="text-indigo-600">{profile.full_name}</span>
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-3 font-bold text-gray-800">
            {profile.title} <span className="text-gray-600">Developer</span>
          </h2>
          <p className="text-xl md:text-2xl mt-4 text-gray-600">
            Based in <span className="font-semibold text-gray-900">Cambodia</span>
          </p>

          <p className="text-lg md:text-xl text-gray-700 mt-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <img
            className="w-80 md:w-96 lg:w-[450px] rounded-3xl shadow-2xl object-cover border-8 border-white"
            src={profile.profile_image}
            alt={`${profile.full_name} - ${profile.title} Developer`}
          />
        </div>
      </div>
    </section>
  );
}

export default Profile;