"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  DollarSign,
  Users,
  Trash2,
  Pencil,
  Plus,
  Sparkles,
  Check,
  Loader2,
} from "lucide-react";
import { Studio } from "@/types/studio";

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

interface EditStudioProps {
  studio: Studio;
}

const EditStudioDialog = ({ studio }: EditStudioProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states pre-filled with studio data
  const [title, setTitle] = useState(studio.title || "");
  const [category, setCategory] = useState(studio.category || CATEGORIES[0]);
  const [hourlyRate, setHourlyRate] = useState(String(studio.hourlyRate || ""));
  const [securityDeposit, setSecurityDeposit] = useState(String(studio.securityDeposit || ""));
  const [maxCapacity, setMaxCapacity] = useState(String(studio.maxCapacity || ""));
  const [location, setLocation] = useState(studio.location || "");
  const [overview, setOverview] = useState(studio.overview || "");

  const [images, setImages] = useState<string[]>(
    studio.images && studio.images.length > 0
      ? studio.images
      : studio.imageUrl
      ? [studio.imageUrl]
      : []
  );
  const [currentImageUrlInput, setCurrentImageUrlInput] = useState("");

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    studio.amenities || []
  );

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleAddImageUrl = () => {
    if (!currentImageUrlInput.trim()) return;
    if (
      !currentImageUrlInput.startsWith("http://") &&
      !currentImageUrlInput.startsWith("https://")
    ) {
      toast.add({ type: "error", description: "Provide a valid HTTP/HTTPS image address" });
      return;
    }
    setImages((prev) => [...prev, currentImageUrlInput.trim()]);
    setCurrentImageUrlInput("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !hourlyRate || !securityDeposit || !maxCapacity || !location || !overview) {
      toast.add({ type: "error", description: "Fill up all required fields" });
      return;
    }

    if (images.length === 0) {
      toast.add({ type: "error", description: "Provide at least one image URL" });
      return;
    }

    if (selectedAmenities.length === 0) {
      toast.add({ type: "error", description: "Select at least one amenity" });
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
      images,
      imageUrl: images[0],
      amenities: selectedAmenities,
      overview,
    };

      const response = await fetch(`http://localhost:8000/mystudios/${studio._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioPayload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update studio.");
      }

      toast.add({ type: "success", description: "Studio updated successfully!" });
      setOpen(false); // Close dialog
      router.refresh(); // Refresh current page data
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* asChild avoids <button><button> nesting */}
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all"
          title="Edit Studio Details"
        >
          <Pencil className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </DialogTrigger>

      {/* max-h and overflow-y-auto solve screen cutoff */}
      <DialogContent className="w-[95vw] max-w-2xl max-h-[88vh] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-zinc-900 dark:text-white">
            Edit Studio Space
          </DialogTitle>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Make changes to your studio specifications and pricing below.
          </p>
        </DialogHeader>

        {/* Form is placed directly as a sibling to Header, avoiding <p><form> invalid nesting */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Studio Title *
              </label>
              <input
                type="text"
                placeholder="Daylight Cyclorama Loft"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Category *
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <Building2 className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Max Capacity (Persons) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  placeholder="15"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Users className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Hourly Rate ($ USD) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  placeholder="75"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                  className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <DollarSign className="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Security Deposit ($ USD) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  placeholder="150"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  required
                  className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <DollarSign className="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Location / Address *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="450 Broadway St, Soho, NY"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full pl-8 pr-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <MapPin className="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Image Gallery URL Inputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Studio Photos (URLs) *
              </label>
              <span className="text-[11px] text-zinc-500">{images.length} added</span>
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={currentImageUrlInput}
                onChange={(e) => setCurrentImageUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
                className="flex-1 px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button
                type="button"
                onClick={handleAddImageUrl}
                variant="secondary"
                className="px-3.5 py-2 text-xs font-medium shrink-0"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add
              </Button>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video bg-zinc-100 dark:bg-zinc-800"
                  >
                    <Image
                      src={img}
                      alt={`Upload ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 rounded-md bg-black/70 hover:bg-red-600 text-white transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Amenities & Equipment *
              </label>
              <span className="text-[11px] text-zinc-500">{selectedAmenities.length} selected</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {AMENITY_OPTIONS.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleToggleAmenity(amenity)}
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Detailed Overview *
            </label>
            <textarea
              rows={3}
              placeholder="Describe access instructions, ceiling height, noise levels..."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-5"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudioDialog;