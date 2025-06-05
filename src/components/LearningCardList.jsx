"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { useFilter } from "../contexts/FilterContext";
import LearningCard from "./LearningCard";
import mockLearningCards from "@/mockData/mockLearningCard";

export default function LearningCardList() {
  const {
    continent,
    subCategoryId,
    cards = [],
    setCards,
    page,
    setPage,
    loading,
    setLoading,
    hasMore,
    setHasMore,
  } = useFilter();

  const observer = useRef();

  const pageSize = 5;

  const fetchCards = useCallback(async () => {
    setLoading(true);

    await new Promise((res) => setTimeout(res, 300));

    // use mock data for pagination
    const startIndex = (page - 1) * pageSize;
    const pagedData = mockLearningCards
      .filter(
        (card) =>
          card.sub_category_id === subCategoryId &&
          (continent === "world" || card.continent === continent)
      )
      .slice(startIndex, startIndex + pageSize);

    if (page === 1) {
      setCards(pagedData);
    } else {
      setCards((prev) => [...prev, ...pagedData]);
    }
    setHasMore(pagedData.length === pageSize);
    setLoading(false);

    // for axios, copied from NC news
    /*
    try {
      const res = await axios.get(
        `/api/learning-cards?sub_category_id=${subCategoryId}&continent=${continent}&page=${page}`
      );
      const data = res.data;
      if (page === 1) {
        setCards(data.learningCards);
      } else {
        setCards((prev) => [...prev, ...data.learningCards]);
      }
      setHasMore(data.learningCards.length > 0);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
    */
  }, [continent, subCategoryId, page, setCards, setHasMore, setLoading]);

  useEffect(() => {
    setPage(1); // when filter chamge, page reset to 1
  }, [continent, subCategoryId, setPage]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );

  return (
    <div className=" container mx-auto px-4 lg:max-w-5xl flex justify-between items-center p-4 shadow-md rounded-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        if (idx === cards.length - 1) {
          return (
            <LearningCard ref={lastCardRef} key={card.card_id} card={card} />
          );
        }
        return <LearningCard key={card.card_id} card={card} />;
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
}
