"use client";

import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

//mock
const categories = [
  { id: 1, category_name: "Nature" },
  { id: 2, category_name: "Territories" },
];

export const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState(
    categories[0].category_name
  );

  return (
    <CategoryContext.Provider
      value={{ activeCategory, setActiveCategory, categories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
