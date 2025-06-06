"use client";

import React, { useState, forwardRef } from "react";
import styles from "./LearningCard.module.css";

// default fallback image
const fallbackImage =
  "https://media.istockphoto.com/id/1456098439/photo/reflection-canyon.jpg?s=612x612&w=0&k=20&c=pvF8LGI9p4ouvI1gd1grAvUoDBtWBx0yh35iVMKXpP4=";

const LearningCard = forwardRef(({ card }, ref) => {
  const [flipped, setFlipped] = useState(false);
  const [imgSrc, setImgSrc] = useState(card.img_url);

  const handleImgError = () => {
    setImgSrc(fallbackImage);
  };

  // Tailwind not avaliable - Card Front background style with gradient overlay + image - dynamic css stay in jsx only
  const frontBgStyle = {
    backgroundImage: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.36) 99.99%,
      rgba(0, 0, 0, 0.00) 100%,
      rgba(0, 0, 0, 0.10) 100%,
      rgba(0, 0, 0, 0.00) 100%
    ), url(${card.img_url})`,
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderColor: "var(--color-green)",
    backgroundColor: "var(--color-green)",
  };

  //  Card Back
  const backBgStyle = {
    backgroundImage: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.54) 99.99%,
      rgba(0, 0, 0, 0.00) 100%,
      rgba(0, 0, 0, 0.10) 100%,
      rgba(0, 0, 0, 0.00) 100%
    ), url(${card.img_url})`,
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderColor: "var(--color-green)",
    backgroundColor: "var(--color-green)",
  };

  return (
    <div
      ref={ref}
      className={`relative w-full h-60 ${styles.perspective} border-[var(--color-green)] cursor-pointer  bg-[var(--color-green)] rounded-lg shadow`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style ${
          styles["preserve-3d"]
        } ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* Front side */}
        <div
          style={frontBgStyle}
          className={`${styles["backface-hidden"]} absolute w-full h-full rounded shadow p-0`}
        >
          <div className="relative w-full h-full rounded overflow-hidden">
            <img
              src={imgSrc}
              alt={card.title}
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute bottom-0 left-0 right-0 bg-opacity-50 text-white p-2 text-center font-semibold ${styles.titleShadow}`}
            >
              {card.title}
            </div>
          </div>
        </div>

        {/* Back side */}
        <div
          style={backBgStyle}
          className={`${styles["backface-hidden"]} ${styles["rotate-y-180"]} absolute w-full h-full rounded shadow overflow-auto flex items-center justify-center`}
        >
          <p className={`${styles.backText}`}>{card.description}</p>
        </div>
      </div>
    </div>
  );
});

export default LearningCard;
