"use client"
import Scorecard from "@/app/_components/scorecard";
import { LeftArrowIcon, RightArrowIcon } from "../_shared/icons";
import { useEffect, useState } from "react";
import HoleInputs from "@/app/_components/holeInputs";
import { Hole } from "../_shared/interfaces";

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

  const addHole = (newHole: Hole) => {
    const duplicateHole = scorecard.find((hole) => hole.holeNumber === newHole.holeNumber);
    if (duplicateHole) {
      return;
    } else {
      setScorecard((prevScorecard) => [...prevScorecard, newHole]);
      setCurrentHole({
        holeNumber: newHole.holeNumber + 1,
        par: 0,
        strokes: 0,
        score: 0,
        fairway: false,
        green: false,
        putts: 0,
      });
    }
  };

  const editHole = (editedHole: Hole) => {
    const editedScorecard = scorecard.map((hole) => {
      if (hole.holeNumber === editedHole.holeNumber) {
        editedHole.score = editedHole.strokes - editedHole.par;
        return editedHole;
      }
      return hole;
    })
    setScorecard(editedScorecard);
  }

  const nextHole = () => {
    const nextHole = {...currentHole, holeNumber: currentHole.holeNumber + 1};
    if (nextHole.holeNumber > scorecard.length + 1) {
      return;
    } else {
      setCurrentHole(nextHole)
    }
    
  }

  const prevHole = () => {
    const prevHoleNumber = currentHole.holeNumber - 1;
    const prevHole = scorecard.find((hole) => hole.holeNumber === prevHoleNumber);
    if (!prevHole) {
      return;
    } else {
      setCurrentHole(prevHole)
    }
  }
  return (
    <div className="container-sm flex flex-col gap-5 md: items-center">
      <h1 className="text-3xl">Current Round</h1>
      <Scorecard scorecard={scorecard} setScorecard={setScorecard}/>
      <div className="container-sm flex justify-center gap-4">
        <button onClick={prevHole}>
          <LeftArrowIcon/>
        </button>
        <button onClick={nextHole}>
          <RightArrowIcon/>
        </button>
      </div>
      {currentHole && <HoleInputs currentHole={currentHole} setCurrentHole={setCurrentHole} addHole={addHole} editHole={editHole}/>}
    </div>
  );
}
