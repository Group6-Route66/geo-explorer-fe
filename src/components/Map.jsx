"use client";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = () => {
  const [country, setCountry] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const mockMapQuestions = [
    { id: 1, question: "Select Ukraine", country: "Ukraine" },
    { id: 2, question: "Select UK", country: "United Kingdom" },
  ];

  useEffect(() => {
    setActiveQuestion(mockMapQuestions[activeQuestionIndex]);
  }, [activeQuestionIndex]);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="w-full flex justify-between">
        <p>{activeQuestion ? activeQuestion.question : null}</p>
        {country && answer && activeQuestion.country === answer ? (
          <p className="text-green-300">Correct!</p>
        ) : country && answer ? (
          <p className="text-red-800">Not correct!</p>
        ) : null}
      </div>

      <div className="flex w-full">
        <div className="flex items-center m-auto gap-4">
          <p>{country}</p>
          {country ? (
            <button
              disabled={answer}
              className="bg-green rounded-4xl p-2 text-white font-bold disabled:bg-gray-100 disabled:cursor-not-allowed"
              onClick={() => {
                setAnswer(country);
              }}
            >
              Confirm
            </button>
          ) : null}
        </div>

        {answer && country ? (
          // todo: change to component
          <button
            onClick={() => {
              if (activeQuestionIndex < mockMapQuestions.length - 1) {
                setActiveQuestionIndex((current) => current + 1);
              }
              setCountry(null);
              setAnswer(null);
            }}
            className="bg-gray-100 px-4 rounded-4xl text-green-300 font-bold"
          >
            next
          </button>
        ) : null}
      </div>

      <ComposableMap disabled>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#F0F2F5",
                    outline: "none",
                    stroke: "black",
                  },
                  hover: {
                    fill: "#6ED788",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#FF5722",
                    outline: "none",
                  },
                }}
                onClick={() => {
                  setCountry(geo.properties.name);
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
