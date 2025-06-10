"use client";

import { useState } from "react";
import { ArrowUpDownIcon } from "@/assets/icons/ArrowUpDownIcon";

const Continent = () => {
  const [continent, setContinent] = useState("Global");
  const [isContinentListOpen, setIsContinentListOpen] = useState(false);

  function handleOnclickContinent(event) {
    event.preventDefault();
    const cont = event.target.value;
    setContinent(cont);
    setIsContinentListOpen(false);
  }

  function handleContinentList(event) {
    event.preventDefault();
    setContinent(event.target.value);
    isContinentListOpen
      ? setIsContinentListOpen(false)
      : setIsContinentListOpen(true);
  }

  return (
    <>
      <div className="w-full flex flex-col items-center rounded-lg">
        <button
          className="w-full flex justify-between hover:bg-slate-200 items-center m-2 p-4 rounded-sm border"
          value={continent}
          onClick={handleContinentList}
        >
          <h2 className="text-2xl font-bold">{continent}</h2>
          <ArrowUpDownIcon />
        </button>
        {isContinentListOpen ? (
          <>
            <button
              className="w-full block bg-green hover:bg-green-700 text-white rounded-4xl items-center m-2 p-2"
              value="World"
              onClick={handleOnclickContinent}
            >
              World
            </button>
            <button
              className="w-full block bg-green hover:bg-green-700 text-white rounded-4xl items-center m-2 p-2"
              value="Europe"
              onClick={handleOnclickContinent}
            >
              Europe
            </button>
            <button
              className="w-full block bg-green hover:bg-green-700 text-white rounded-4xl items-center m-2 p-2"
              value="Asia"
              onClick={handleOnclickContinent}
            >
              Asia
            </button>
            <button
              className="w-full block bg-green hover:bg-green-700 text-white rounded-4xl items-center m-2 p-2"
              value="Africa"
              onClick={handleOnclickContinent}
            >
              Africa
            </button>
            <button
              className="w-full block bg-green hover:bg-green-700 text-white rounded-4xl items-center m-2 p-2"
              value="North America"
              onClick={handleOnclickContinent}
            >
              North America
            </button>
            <button
              className="w-full block bg-green hover:bg-green-700 text-white rounded-4xl items-center m-2 p-2"
              value="South America"
              onClick={handleOnclickContinent}
            >
              South America
            </button>
            <button
              className="w-full block bg-green hover:bg-green-700 text-white rounded-4xl items-center m-2 p-2"
              value="Australia/Oceania"
              onClick={handleOnclickContinent}
            >
              Oceania
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Continent;
