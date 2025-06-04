"use client";

import { useCategory } from "@/contexts";

const Categories = () => {
  const { activeCategory, setActiveCategory, categories } = useCategory();

  return (
    <div className="w-full flex justify-center items-center">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${
            activeCategory === category.category_name ? "border-b-green" : ""
          } w-1/2 p-2 border-2 border-transparent border-b-gray-200`}
          onClick={() => setActiveCategory(category.category_name)}
        >
          {category.category_name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
