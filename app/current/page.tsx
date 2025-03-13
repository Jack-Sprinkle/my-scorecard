"use client"
import Scorecard from "@/app/_components/scorecard";
import { useState } from "react";
import CurrentHole from "../_components/currentHole";

export default function Current() {
  
  const [scorecard, setScorecard] = useState<Hole[]>([
    { hole: 1, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 2, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 3, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 4, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 5, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 6, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 7, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 8, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 9, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 10, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 11, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 12, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 13, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 14, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 15, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 16, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 17, par: 0, strokes: 0, score: 0, fairway: false, green: false },
    { hole: 18, par: 0, strokes: 0, score: 0, fairway: false, green: false },
  ]);

  const [currentHole, setCurrentHole] = useState(scorecard[0]);

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
    <div className="container-lg text-center">
      <h1 className="text-3xl">Current Round</h1>
      <p>Course Name: The Links at Sup</p>
      <Scorecard scorecard={scorecard} setScorecard={setScorecard}/>
      <div className="container-sm">
        <button onClick={previousHole} className="btn btn-primary mr-2">Previous Hole</button>
        <button onClick={nextHole} className="btn btn-primary">Next Hole</button>
      </div>
      <CurrentHole currentHole={currentHole} setCurrentHole={setCurrentHole}/>
    </div>
  );
}
