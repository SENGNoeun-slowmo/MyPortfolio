import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProfileFormData {
  full_name: string;
  title: string;
  bio: string;
  avatar?: File | null;
}

const CreateProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    title: '',
    bio: '',
    avatar: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Handle text input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input (avatar)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ text: 'អនុញ្ញាតតែ jpg, png, webp ប៉ុណ្ណោះ!', type: 'error' });
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setMessage({ text: 'រូបភាពធំពេក! អតិបរមា 3MB', type: 'error' });
      return;
    }

    setFormData((prev) => ({ ...prev, avatar: file }));

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      setMessage({ text: 'សូមបញ្ចូលឈ្មោះពេញ (full_name ចាំបាច់)', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('full_name', formData.full_name.trim());
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('bio', formData.bio.trim());

      // Generate temporary UUID for new profile (your backend accepts it)
      const tempId = crypto.randomUUID();
      formDataToSend.append('id', tempId);

      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar);
      }

      const response = await fetch('/api/profiles', {  // ← FIXED: lowercase /profiles
        method: 'POST',
        body: formDataToSend,
        // credentials: 'include', // uncomment if you add auth later
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'បរាជ័យក្នុងការបង្កើត profile');
      }

      setMessage({
        text: `បង្កើត profile ជោគជ័យ! (ID: ${result.id})`,
        type: 'success',
      });

      // Reset form
      setFormData({ full_name: '', title: '', bio: '', avatar: null });
      setPreviewUrl(null);

    } catch (err: any) {
      console.error('Form submit error:', err);
      setMessage({
        text: err.message || 'មានបញ្ហាកើតឡើង សូមព្យាយាមម្ដងទៀត',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        បង្កើត Profile ថ្មី
      </h2>

      {message && (
        <div
          className={`p-4 mb-6 rounded-lg text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ឈ្មោះពេញ (Full Name) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="ឧ. Seng Noeun"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">តួនាទី / ជំនាញ (Title)</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="ឧ. Full-Stack Developer"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">អំពីខ្ញុំ (Bio)</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="សរសេរអំពីខ្លួនអ្នក ឬជំនាញរបស់អ្នក..."
          />
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">រូបភាព Profile (Avatar)</label>
          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar Preview"
                  className="h-24 w-24 object-cover rounded-full border-4 border-indigo-200 shadow-md"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              ជ្រើសរើសរូបភាព
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-500">អនុញ្ញាត: jpg, png, webp (អតិបរមា 3MB)</p>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-10 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'កំពុងបង្កើត...' : 'បង្កើត Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfileForm;