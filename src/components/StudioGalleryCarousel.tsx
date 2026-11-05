"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface StudioGalleryCarouselProps {
  images: string[];
  title: string;
}

export default function StudioGalleryCarousel({ images, title }: StudioGalleryCarouselProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-2/3 lg:basis-3/4">
              <div className="relative aspect-[16/9] md:aspect-[21/10] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Image
                  src={src}
                  alt={`${title} photo ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <span className="absolute bottom-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {index + 1} / {images.length}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation arrows (shown when more than 1 image) */}
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4 bg-black/60 hover:bg-black/80 text-white border-white/20 backdrop-blur-md" />
            <CarouselNext className="right-4 bg-black/60 hover:bg-black/80 text-white border-white/20 backdrop-blur-md" />
          </>
        )}
      </Carousel>
    </div>
  );
}