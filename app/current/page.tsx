"use client"
import Scorecard from "@/app/_components/scorecard";
import { useEffect, useState } from "react";
import CurrentHole from "../_components/currentHole";
import { LeftArrowIcon, RightArrowIcon } from "../_shared/icons";

export default function Current() {
  
  const [scorecard, setScorecard] = useState<Hole[]>(() => {
    const savedScorecard = localStorage.getItem("scorecard");
    return savedScorecard ? JSON.parse(savedScorecard) : [
      { hole: 1, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 2, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 3, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 4, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 5, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 6, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 7, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 8, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 9, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 10, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 11, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 12, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 13, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 14, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 15, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 16, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 17, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
      { hole: 18, par: 0, strokes: 0, score: 0, fairway: false, green: false, putts: 0 },
    ]
  });

  const [currentHole, setCurrentHole] = useState(scorecard[0]);

  useEffect(() => {
    localStorage.setItem("scorecard", JSON.stringify(scorecard));
  }, [scorecard]);

  const updateCurrentHole = (updatedHole: Hole) => {
    updatedHole.score = updatedHole.strokes - updatedHole.par;
    setScorecard((prevScorecard) => 
      prevScorecard.map((hole) => 
        hole.hole === updatedHole.hole ? updatedHole : hole
      )
    );
    setCurrentHole(updatedHole);
  };  

  const nextHole = () => {
    setCurrentHole((prev) => {
      const nextIndex = scorecard.findIndex(hole => hole.hole === prev.hole) + 1;
      return scorecard[nextIndex] || prev;
    });
  };

  const previousHole = () => {
    setCurrentHole((prev) => {
      const prevIndex = scorecard.findIndex(hole => hole.hole === prev.hole) - 1;
      return scorecard[prevIndex] || prev;
    });
  };

  return (
    <div className="container-sm flex flex-col gap-5">
      <h1 className="text-3xl">Current Round</h1>
      <Scorecard scorecard={scorecard} setScorecard={setScorecard}/>
      <div className="container-sm flex gap-2 justify-center">
        <button onClick={previousHole} className="btn btn-primary mr-2"><LeftArrowIcon/></button>
        <button onClick={nextHole} className="btn btn-primary"><RightArrowIcon/></button>
      </div>
      <CurrentHole currentHole={currentHole} setCurrentHole={setCurrentHole} updateCurrentHole={updateCurrentHole}/>
    </div>
  );
}
