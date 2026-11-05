"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Building2, 
  DollarSign, 
  Users, 
  MapPin, 
  UploadCloud, 
  Sparkles, 
  Loader2,
  Check
} from "lucide-react";
import { toast } from "@/components/ui/toast";

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

const AMENITY_OPTIONS = [
  "Cyc Wall",
  "Continuous Lighting",
  "Strobe Flashes",
  "Grip Equipment",
  "Acoustic Treatment",
  "Dressing / Green Room",
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Audio Interface / Mics",
  "Props & Backdrops",
  "Freight Elevator",
  "Free On-site Parking",
];

const AddStudioPage = () => {
  const router = useRouter();

  // Mock logged-in user state (Replace with your actual BetterAuth session hook)
  const hostUser = {
    name: "Alex Rivera",
    email: "alex.creative@example.com",
  };

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [overview, setOverview] = useState("");

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
    //   toast.error("ImgBB API key is missing in environment variables.");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        // toast.success("Studio photo uploaded successfully!");
      } else {
        // toast.error(data.error?.message || "Failed to upload image.");
      }
    } catch {
    //   toast.error("Network error while uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !hourlyRate || !securityDeposit || !maxCapacity || !location || !overview) {
    //   toast.error("Please fill in all mandatory fields.");
      return;
    }

    if (!imageUrl) {
    //   toast.error("Please provide or upload a studio image.");
      return;
    }

    if (selectedAmenities.length === 0) {
    //   toast.error("Please select at least one amenity.");
      return;
    }

    setLoading(true);

    const studioPayload = {
      title,
      category,
      hourlyRate: Number(hourlyRate),
      securityDeposit: Number(securityDeposit),
      maxCapacity: Number(maxCapacity),
      location,
      imageUrl,
      amenities: selectedAmenities,
      overview,
      ownerName: hostUser.name,
      ownerEmail: hostUser.email,
    };

    

    const res = await fetch("http://localhost:8000/add-studio", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(studioPayload)
    })

    const data = await res.json()
    console.log(data)


{/*
    try {
      const response = await fetch("http://localhost:5000/api/studios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(studioPayload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to create studio.");
      }

    //   toast.success("Studio space published successfully!");
      router.push("/my-listings");
    } catch (err: any) {
    //   toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
      */}
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Host Dashboard
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">
            List a New Studio Space
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Fill in the production workspace details. Once published, creators can discover and book your space.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm p-6 sm:p-8 space-y-8 backdrop-blur-sm"
        >
          <div className="p-4 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 space-y-1">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Host Identity (Read-Only)
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-zinc-700 dark:text-zinc-300">
              <p>
                <span className="font-semibold text-zinc-900 dark:text-white">Name:</span> {hostUser.name}
              </p>
              <p>
                <span className="font-semibold text-zinc-900 dark:text-white">Email:</span> {hostUser.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Studio Title *</label>
              <input
                type="text"
                placeholder="e.g. Daylight Cyclorama Loft with Strobe Package"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <Building2 className="w-4 h-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max Capacity (Persons) *</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 15"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Users className="w-4 h-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hourly Rate ($ USD) *</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 75"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Security Deposit ($ USD) *</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 150"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location / Full Address *</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 450 Broadway St, Soho, New York, NY 10013"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Studio Primary Photo *</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-indigo-500/60 dark:border-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 cursor-pointer text-sm font-medium transition-colors">
                {uploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UploadCloud className="w-4 h-4" />
                )}
                {uploadingImage ? "Uploading to ImgBB..." : "Upload from Device"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-zinc-500">or enter direct link:</span>

              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

        
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Amenities & Equipment *
              </label>
              <span className="text-xs text-zinc-500">
                {selectedAmenities.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleToggleAmenity(amenity)}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Detailed Overview *</label>
            <textarea
              rows={4}
              placeholder="Describe access instructions, ceiling height, natural light window directions, noise levels, and any special house rules..."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 transition-all"
            >
              {/* {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Publishing Studio..." : "Publish Studio"} */}
              Publish Studio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudioPage;