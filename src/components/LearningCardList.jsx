"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { useFilter } from "@/contexts/FilterContext";
import LearningCard from "@/components/LearningCard";
import { getLearningCards } from "@/api";

export default function LearningCardList() {
  // Destructure all needed state and setters from FilterContext
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

  // useRef to keep track of the IntersectionObserver instance
  const observer = useRef();

  // Fixed page size used for pagination requests
  const pageSize = 5;

  // Function to fetch learning cards based on current filters and page
  const fetchCards = useCallback(() => {
    setLoading(true); // Show loading spinner

    // Call API function to get learning cards for current filters & page
    getLearningCards(continent.toLowerCase(), subCategoryId, page)
      .then((data) => {
        console.log("Fetched data length:", data.length, "Page:", page);

        // If this is the first page, replace current cards with fresh data
        if (page === 1) {
          setCards(data);
        } else {
          // Otherwise, append new cards to existing list for infinite scroll
          setCards((prev) => [...prev, ...data]);
        }

        // If number of fetched cards is less than page size, no more data
        setHasMore(data.length === pageSize);

        setLoading(false); // Hide loading spinner
      })
      .catch((err) => {
        console.error("Fetch error:", err);

        setHasMore(false); // Prevent further fetching on error
        setLoading(false); // Hide loading spinner
      });
  }, [continent, subCategoryId, page, setCards, setHasMore, setLoading]);

  // When continent or subCategoryId changes, reset page to 1 to refresh data
  useEffect(() => {
    setPage(1);
  }, [continent, subCategoryId, setPage]);

  // Fetch cards whenever the fetchCards function changes (due to dependencies)
  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Set up IntersectionObserver to detect when last card is visible for infinite scroll
  const lastCardRef = useCallback(
    (node) => {
      // If already loading, don't setup observer again
      if (loading) return;

      // Disconnect previous observer instance if exists
      if (observer.current) observer.current.disconnect();

      // Create new IntersectionObserver with some margin to preload
      observer.current = new IntersectionObserver(
        (entries) => {
          // If last card is intersecting viewport and there is more data
          if (entries[0].isIntersecting && hasMore) {
            console.log("Load next page triggered");
            setPage((prevPage) => prevPage + 1); // Load next page
          }
        },
        { rootMargin: "100px" } // Trigger a bit before it enters viewport
      );

      // Observe the current node (last card)
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );

  return (
    <div className="container mx-auto px-4 lg:max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Render all cards */}
      {cards.map((card, idx) => {
        // Attach the IntersectionObserver ref to the last card only
        if (idx === cards.length - 1) {
          return (
            <LearningCard ref={lastCardRef} key={card.card_id} card={card} />
          );
        }
        return <LearningCard key={card.card_id} card={card} />;
      })}
      {/* Show loading indicator when loading */}
      {loading && <p className="text-center col-span-full">Loading...</p>}
    </div>
  );
}
