"use client";

import React from "react";

import FilterBar from "@/components/FilterBar";
import LearningCardList from "@/components/LearningCardList";

export default function LearnPage() {
  return (
    <div>
      <FilterBar showCategories={false} showSubCategories={true} />
      <LearningCardList />
    </div>
  );
}
