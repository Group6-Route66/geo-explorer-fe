"use client";

import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [continent, setContinent] = useState("world");
  const [subCategoryId, setSubCategoryId] = useState(1);
  const [cards, setCards] = useState([]); // add this
  const [page, setPage] = useState(1); // pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  return (
    <FilterContext.Provider
      value={{
        continent,
        setContinent,
        subCategoryId,
        setSubCategoryId,
        cards,
        setCards,
        page,
        setPage,
        loading,
        setLoading,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used inside FilterProvider");
  }
  return context;
};
