import React, { useState } from "react";
import "../styles/gallery3.css";

const images = [
  "../slider/bulk-embroidery-services-los-angeles.webp",
  "../slider/wholesale-embroidery-los-angeles.webp",
  "../slider/custom-fashion-embroidey-services-los-angeles.webp",
  "../slider/bulk-embroidery-services-los-angeles.webp",
  "../slider/high-end-embroidery-los-angeles.webp",
  "../slider/high-volume-embroidery-los-angeles.webp",
  "../slider/high-end-screen-printing-los-angeles.webp",
  "../slider/deni-jacket-embroidery-los-angeles.webp",
  "../slider/custom-embroidery-patches-los-angeles.webp",
];

const captions = [
  "Bulk Embroidery Services in Los Angeles",
  "Wholesale Custom Embroidery in Los Angeles",
  "Custom Fashion Embroidery Services",
  "Bulk Embroidery Services",
  "High-End Embroidery for Custom Designs",
  "High-Volume Embroidery in Los Angeles",
  "High-End Screen Printing in Los Angeles",
  "Denim Jacket Embroidery Services",
  "Custom Embroidery Patches in LA",
];

export const Gallery3 = () => {
  const [currentIndex, setCurrentIndex] = useState(3);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="gallery-container">
      <button onClick={handlePrev} className="arrow-button left">❮</button>
      <div className="image-slider">
        {images.map((src, index) => {
          const relativeIndex = (index - currentIndex + images.length) % images.length;
          let zIndex = 0, scale = 1, opacity = 1, translateX = "translateX(0%)";

          if (relativeIndex === 0) {
            zIndex = 10;
            scale = 1.2;
          } else if (relativeIndex <= 3) {
            zIndex = 10 - relativeIndex;
            scale = 1 - relativeIndex * 0.1;
            opacity = 1 - relativeIndex * 0.2;
            translateX = `translateX(${relativeIndex * 50}%)`;
          } else if (relativeIndex >= images.length - 3) {
            const distanceFromEnd = images.length - relativeIndex;
            zIndex = 10 - distanceFromEnd;
            scale = 1 - distanceFromEnd * 0.1;
            opacity = 1 - distanceFromEnd * 0.3;
            translateX = `translateX(-${distanceFromEnd * 50}%)`;
          } else {
            opacity = 0;
          }

          return (
            <div
              key={index}
              className="image-wrapper"
              style={{ transform: `${translateX} scale(${scale})`, zIndex, opacity }}
            >
              <img src={src} alt={captions[index]} loading="lazy" className="gallery-image" />
              {relativeIndex === 0 && <div className="caption">{captions[index]}</div>}
            </div>
          );
        })}
      </div>
      <button onClick={handleNext} className="arrow-button right">❯</button>
    </div>
  );
};

export default Gallery3;
