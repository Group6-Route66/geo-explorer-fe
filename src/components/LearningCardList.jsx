// src/components/LearningCardList.jsx
"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useFilter } from "@/contexts/FilterContext";
import LearningCard from "@/components/LearningCard";
import { getLearningCards } from "@/api";
import CustomLoading from "./CustomLoading";
import CustomError from "./CustomError";

export default function LearningCardList() {
  // Destructure needed state + setters from context
  const {
    continent,
    subCategoryId,
    cards,
    setCards,
    page,
    setPage,
    loading,
    setLoading,
    hasMore,
    setHasMore,
  } = useFilter();

  // Local error flag
  const [error, setError] = useState(null);

  // Page size: how many cards per page
  const pageSize = 10;

  // 1. Fetch cards from API based on filters and current page
  const fetchCards = useCallback(() => {
    setError(null);
    setLoading(true);

    getLearningCards(continent.toLowerCase(), subCategoryId, page)
      .then((data) => {
        // Replace on first page, append afterwards
        if (page === 1) {
          setCards(data);
        } else {
          setCards((prev) => {
            // avoid duplicates
            const newOnes = data.filter(
              (card) => !prev.some((c) => c.card_id === card.card_id)
            );
            return [...prev, ...newOnes];
          });
        }
        // if fewer than pageSize, disable further loads
        setHasMore(data.length === pageSize);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
        setHasMore(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [continent, subCategoryId, page, setCards, setHasMore, setLoading]);

  // 2. Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [continent, subCategoryId, setPage]);

  // 3. Fetch whenever page or filters change
  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Retry fetch on error
  const handleRetry = () => {
    fetchCards();
  };

  // Load more handler
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  };

  // 4. Render error screen if fetch failed
  if (error) return <CustomError onRetry={handleRetry} />;

  // 5. Render full‐page spinner on initial load
  if (loading && page === 1) return <CustomLoading />;

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">
      {/* Render all loaded cards */}
      {cards.map((card) => (
        <LearningCard key={card.card_id} card={card} />
      ))}

      {/* In‐line spinner when loading more pages */}
      {loading && page > 1 && (
        <p className="text-center col-span-full">Loading...</p>
      )}

      {/* Load More button */}
      {!loading && hasMore && (
        <button
          onClick={handleLoadMore}
          className="col-span-full bg-[var(--color-green)] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
        >
          Load More
        </button>
      )}

      {/* “No more” only if you've actually paged past page 1 */}
      {!loading && !hasMore && page > 1 && (
        <p className="text-center col-span-full text-gray-500 mt-4 pb-2">
          No more cards to load.
        </p>
      )}
    </div>
  );
}
