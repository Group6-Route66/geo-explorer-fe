"use client";

import React, { useState, forwardRef } from "react";

const LearningCard = forwardRef(({ card }, ref) => {
  const [flipped, setFlipped] = useState(false);

  // Card Front background style with gradient overlay + image
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
    borderColor: "var(--accent-green)",
    backgroundColor: "var(--accent-green)",
  };

  // Card Back background style with stronger gradient overlay + image
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
    borderColor: "var(--accent-green)",
    backgroundColor: "var(--accent-green)",
  };

  // Back card text style (CSS-in-JS)
  const backTextStyle = {
    height: "90%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
    color: "#FFF",
    fontFeatureSettings: "'dlig' on",
    fontSize: "1.1rem",
    lineHeight: "1.5em",
    padding: "1rem",
    textAlign: "center",
  };

  return (
    <div
      ref={ref}
      style={{
        borderColor: "var(--accent-green)",
      }}
      className="relative w-full h-60 perspective cursor-pointer rounded-lg shadow border"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div
          style={frontBgStyle}
          className="absolute backface-hidden w-full h-full rounded shadow p-0"
        >
          <div className="relative w-full h-full rounded overflow-hidden">
            <img
              src={card.img_url}
              alt={card.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-white p-2 text-center font-semibold">
              {card.title}
            </div>
          </div>
        </div>

        {/* Back side */}
        <div
          style={backBgStyle}
          className=" absolute backface-hidden rotate-y-180 w-full h-full rounded shadow overflow-auto flex items-center justify-center"
        >
          <p style={backTextStyle}>{card.description}</p>
        </div>
      </div>
    </div>
  );
});

export default LearningCard;
