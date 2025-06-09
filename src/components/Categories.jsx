"use client";

const Categories = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="w-full flex justify-center items-center">
      {categories.map((category) => (
        <button
          key={category.category_id}
          className={`${
            activeCategory === category.category_id ? "border-b-green" : ""
          } w-1/2 p-2 border-2 border-transparent border-b-gray-200`}
          onClick={() => setActiveCategory(category.category_id)}
        >
          {category.category_name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
