"use client"
import Scorecard from "@/app/_components/scorecard";
import { useEffect, useState } from "react";
import HoleInputs from "@/app/_components/holeInputs";
import { Hole } from "../_shared/interfaces";
//import { LeftArrowIcon, RightArrowIcon } from "../_shared/icons";

export default function Current() {
  
  const [scorecard, setScorecard] = useState<Hole[]>(() => {
    const savedScorecard = localStorage.getItem("scorecard");
    return savedScorecard ? JSON.parse(savedScorecard) : []
  });

  const [currentHole, setCurrentHole] = useState<Hole>(() => {
    const savedScorecard = localStorage.getItem("scorecard");
    const parsedScorecard = savedScorecard ? JSON.parse(savedScorecard) : [];
    return parsedScorecard.length > 0 ? parsedScorecard[parsedScorecard.length - 1] : {holeNumber: 1, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0};
  });

  useEffect(() => {
    localStorage.setItem("scorecard", JSON.stringify(scorecard));
  }, [scorecard]);

  const addHole = (hole: Hole) => {
    setScorecard((prevScorecard) => [...prevScorecard, hole]);
    setCurrentHole({
      holeNumber: hole.holeNumber + 1,
      par: 0,
      strokes: 0,
      score: 0,
      fairway: false,
      green: false,
      putts: 0,
    });
  };

  // const nextHole = () => {
  //   setCurrentHole((prev) => {
  //     const nextIndex = scorecard.findIndex(hole => hole.holeNumber === prev?.holeNumber) + 1;
  //     return scorecard[nextIndex] || prev;
  //   });
  // };

  // const previousHole = () => {
  //   setCurrentHole((prev) => {
  //     const prevIndex = scorecard.findIndex(hole => hole.holeNumber === prev?.holeNumber) - 1;
  //     return scorecard[prevIndex] || prev;
  //   });
  // };

  return (
    <div className="container-sm flex flex-col gap-5">
      <h1 className="text-3xl">Current Round</h1>
      <Scorecard scorecard={scorecard} setScorecard={setScorecard}/>
      {/* <div className="container-sm flex justify-center gap-4">
        <button onClick={previousHole}>
          <LeftArrowIcon/>
        </button>
        <button onClick={nextHole}>
          <RightArrowIcon/>
        </button>
      </div> */}
      {currentHole && <HoleInputs currentHole={currentHole} setCurrentHole={setCurrentHole} addHole={addHole}/>}
    </div>
  );
}
