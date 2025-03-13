"use client"
import Scorecard from "@/app/_components/scorecard";
import { useState } from "react";

export default function Current() {

  const [scorecard, setScorecard] = useState<Hole[]>([
    { hole: 1, par: 0, strokes: 0, score: 0 },
    { hole: 2, par: 0, strokes: 0, score: 0 },
    { hole: 3, par: 0, strokes: 0, score: 0 },
    { hole: 4, par: 0, strokes: 0, score: 0 },
    { hole: 5, par: 0, strokes: 0, score: 0 },
    { hole: 6, par: 0, strokes: 0, score: 0 },
    { hole: 7, par: 0, strokes: 0, score: 0 },
    { hole: 8, par: 0, strokes: 0, score: 0 },
    { hole: 9, par: 0, strokes: 0, score: 0 },
    { hole: 10, par: 0, strokes: 0, score: 0 },
    { hole: 11, par: 0, strokes: 0, score: 0 },
    { hole: 12, par: 0, strokes: 0, score: 0 },
    { hole: 13, par: 0, strokes: 0, score: 0 },
    { hole: 14, par: 0, strokes: 0, score: 0 },
    { hole: 15, par: 0, strokes: 0, score: 0 },
    { hole: 16, par: 0, strokes: 0, score: 0 },
    { hole: 17, par: 0, strokes: 0, score: 0 },
    { hole: 18, par: 0, strokes: 0, score: 0 },
  ]);

  return (
    <div className="container-lg">
      <h1 className="text-3xl text-center">Current Round</h1>
      <Scorecard scorecard={scorecard}/>
    </div>
  );
}
