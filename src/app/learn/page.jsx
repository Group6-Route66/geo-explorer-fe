"use client";

import React from "react";
import { FilterProvider } from "@/contexts/FilterContext";
import FilterBar from "@/components/FilterBar";
import LearningCardList from "@/components/LearningCardList";

export default function LearnPage() {
  return (
    <FilterProvider>
      <FilterBar showCategories={false} showSubCategories={true} />
      <LearningCardList />
    </FilterProvider>
  );
}
