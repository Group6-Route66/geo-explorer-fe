"use client";

import React, { useEffect, useCallback } from "react";
import { useFilter } from "@/contexts/FilterContext";
import LearningCard from "@/components/LearningCard";
import { getLearningCards } from "@/api";

export default function LearningCardList() {
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

  const pageSize = 5;

  // Fetch cards from API based on filters and current page
  const fetchCards = useCallback(() => {
    setLoading(true);

    getLearningCards(continent.toLowerCase(), subCategoryId, page)
      .then((data) => {
        if (page === 1) {
          setCards(data);
        } else {
          setCards((prev) => {
            // Filter out duplicates before appending
            const newCards = data.filter(
              (newCard) =>
                !prev.some((card) => card.card_id === newCard.card_id)
            );
            return [...prev, ...newCards];
          });
        }
        setHasMore(data.length === pageSize);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setHasMore(false);
        setLoading(false);
      });
  }, [continent, subCategoryId, page, setCards, setHasMore, setLoading]);

  // Reset page to 1 when continent or subcategory changes
  useEffect(() => {
    setPage(1);
  }, [continent, subCategoryId, setPage]);

  // Fetch cards whenever fetchCards function changes (page/filter change)
  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Handler for Load More button to load next page
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Render all loaded cards */}
      {cards.map((card) => (
        <LearningCard key={card.card_id} card={card} />
      ))}

      {/* Show loading text when fetching data */}
      {loading && <p className="text-center col-span-full">Loading...</p>}

      {/* Show Load More button if not loading and more data available */}
      {!loading && hasMore && (
        <button
          onClick={handleLoadMore}
          className="col-span-full bg-[var(--color-green)] hover:[var(--color-gray-900)] text-white font-bold py-2 px-4 rounded mt-4"
        >
          Load More
        </button>
      )}

      {/* Show message if no more data */}
      {!hasMore && !loading && (
        <p className="text-center col-span-full text-gray-500 mt-4">
          No more cards to load.
        </p>
      )}
    </div>
  );
}
