"use client"
import Scorecard from "@/app/_components/scorecard";
import { useEffect, useState } from "react";
import HoleInputs from "@/app/_components/holeInputs";
//import { LeftArrowIcon, RightArrowIcon } from "../_shared/icons";
import { Hole } from "../_shared/interfaces";

export default function Current() {
  
  const [scorecard, setScorecard] = useState<Hole[]>(() => {
    const savedScorecard = localStorage.getItem("scorecard");
    return savedScorecard ? JSON.parse(savedScorecard) : []
  });

  useEffect(() => {
    localStorage.setItem("scorecard", JSON.stringify(scorecard));
  }, [scorecard]);

  const [showAddHole, setShowAddHole] = useState(false);

  const addHole = (hole: Hole) => {
    scorecard.push(hole);
    setShowAddHole(false);
  }

  return (
    <div className="container-sm flex flex-col gap-5">
      <h1 className="text-3xl">Current Round</h1>
      <Scorecard scorecard={scorecard} setScorecard={setScorecard}/>
      <button onClick={() => setShowAddHole(!showAddHole)} className="btn btn-primary">Add Hole</button>
      {showAddHole && <HoleInputs addHole={addHole} />}
    </div>
  );
}
