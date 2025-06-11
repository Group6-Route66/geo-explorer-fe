"use client";

import React from "react";

const Categories = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="w-full flex justify-center items-center">
      {categories.map(({ category_id, category_name }) => (
        <button
          key={category_id}
          onClick={() => setActiveCategory(category_id)}
          className={`
            w-1/2                
            p-2                 
            border-4 border-transparent 
            border-b-gray-200
            transition-colors duration-200

            ${
              activeCategory === category_id
                ? "border-b-green text-green font-bold"
                : "hover:border-b-green hover:text-green text-[var(--main-text)]"
            }
          `}
          type="button"
        >
          {category_name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
