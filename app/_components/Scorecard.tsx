import { CheckIcon, XIcon } from "../_shared/icons";
import { useState, useEffect } from "react";
import { ScorecardProps, Hole } from "../_shared/interfaces";
import { db } from "../_db/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function Scorecard({ roundNumber }: ScorecardProps) {
  const holes: Hole[] | undefined = useLiveQuery(() =>
    db.holes.where("roundNumber").equals(roundNumber).toArray()
  );

  const [scorecard, setScorecard] = useState<Hole[] | null>(null);
  const [coursePar, setCoursePar] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (holes && holes.length > 0) {
      const sortedHoles = holes.sort((a, b) => a.holeNumber - b.holeNumber);
      const score = holes.reduce(
        (total, hole) => total + Number(hole.score),
        0
      );
      const par = holes.reduce((total, hole) => total + Number(hole.par), 0);
      const strokes = holes.reduce(
        (total, hole) => total + Number(hole.strokes),
        0
      );
      setScorecard(sortedHoles);
      setCoursePar(par);
      setTotalScore(score);
      setTotalStrokes(strokes);
      setError("");
    } else {
      setError("Add a hole to start your scorecard.");
    }
  }, [holes, roundNumber]);

  return (
    <div className="container-xs flex flex-col gap-4">
      {error ? <p className="text-red-700">{error}</p> : null}
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="px-1">Hole</th>
            <th className="px-1">Par</th>
            <th className="px-1">Strokes</th>
            <th className="px-1">+/-</th>
            <th className="px-1">Fairway</th>
            <th className="px-1">GIR</th>
            <th className="px-1">Putts</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {scorecard?.map((hole, index) => (
            <tr key={index}>
              <td className="py-2">{hole.holeNumber}</td>
              <td className="py-2">{Number(hole.par)}</td>
              <td className="py-2">{Number(hole.strokes)}</td>
              <td className="py-2">
                {" "}
                {Number(hole.score) === -1 ? (
                  // Birdie: circle
                  <span className="border-2 border-blue-500 rounded-full px-2 inline-block">
                    {Number(hole.score)}
                  </span>
                ) : Number(hole.score) === 1 ? (
                  // Bogey: single square
                  <span className="border-2 border-red-500 rounded-none px-2 inline-block">
                    {Number(hole.score)}
                  </span>
                ) : Number(hole.score) === 2 ? (
                  // Double bogey: double square (nested span)
                  <span className="inline-block p-0.5 border-2 border-red-500 rounded-none">
                    <span className="border-2 border-red-500 rounded-none px-2 inline-block">
                      {Number(hole.score)}
                    </span>
                  </span>
                ) : (
                  // Normal score
                  Number(hole.score)
                )}
              </td>
              <td className="text-center py-2">
                <div className="flex justify-center">
                  {Number(hole.fairway) ? <CheckIcon /> : <XIcon />}
                </div>
              </td>
              <td className="text-center py-2">
                <div className="flex justify-center">
                  {Number(hole.green) ? <CheckIcon /> : <XIcon />}
                </div>
              </td>
              <td
                className={
                  Number(hole.putts) >= 3
                    ? "text-red-600 font-bold py-2"
                    : "py-2"
                }
              >
                {Number(hole.putts)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-sm flex flex-col items-start">
        <h2 className="pl-2">Course Par: {coursePar}</h2>
        <h3 className="pl-2">Total Strokes: {totalStrokes}</h3>
        <h4 className="pl-2">Score: {totalScore}</h4>
      </div>
    </div>
  );
}
