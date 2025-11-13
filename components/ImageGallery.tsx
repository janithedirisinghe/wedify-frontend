"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  columns?: 2 | 3 | 4;
}

export default function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {selectedImage > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {selectedImage < images.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={images[selectedImage]}
              alt={`Gallery image ${selectedImage + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
