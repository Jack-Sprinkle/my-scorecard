"use client";
import Scorecard from "../_components/Scorecard";
import AddHole from "../_components/AddHole";
import { LeftArrowIcon, RightArrowIcon } from "../_shared/icons";
import { useState } from "react";

import { Hole } from "../_shared/interfaces";

export default function CurrentRound() {
  const [scorecard, setScorecard] = useState<Hole[]>([]);
  const [currentHole, setCurrentHole] = useState<Hole>({
    holeNumber: 1,
    par: 0,
    strokes: 0,
    score: 0,
    fairway: false,
    green: false,
    putts: 0,
  });

  if (scorecard.length === 0) {
    return (
      <p>Start a new round</p>
    )
  }
  const editHole = (editedHole: Hole) => {
    const editedScorecard = scorecard.map((hole) => {
      if (hole.holeNumber === editedHole.holeNumber) {
        editedHole.score = editedHole.strokes - editedHole.par;
        return editedHole;
      }
      return hole;
    });
    setScorecard(editedScorecard);
  };

  const nextHole = () => {
    const nextHole = { ...currentHole, holeNumber: currentHole.holeNumber + 1 };
    if (nextHole.holeNumber > scorecard.length + 1) {
      return;
    } else {
      setCurrentHole(nextHole);
    }
  };

  const prevHole = () => {
    const prevHoleNumber = currentHole.holeNumber - 1;
    const prevHole = scorecard.find(
      (hole) => hole.holeNumber === prevHoleNumber
    );
    if (!prevHole) {
      return;
    } else {
      setCurrentHole(prevHole);
    }
  };
  return (
    <div className="container-sm flex flex-col gap-5 md: items-center">
      <h1 className="text-3xl">Current Round</h1>
      <Scorecard scorecard={scorecard} setScorecard={setScorecard} />
      <div className="container-sm flex justify-center gap-4">
        <button onClick={prevHole}>
          <LeftArrowIcon />
        </button>
        <button onClick={nextHole}>
          <RightArrowIcon />
        </button>
      </div>
      {currentHole && (
        <AddHole
          currentHole={currentHole}
          setCurrentHole={setCurrentHole}
          editHole={editHole}
        />
      )}
    </div>
  );
}
