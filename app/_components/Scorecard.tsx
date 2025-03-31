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
      const score = holes.reduce((total, hole) => total + Number(hole.score), 0);
      const par = holes.reduce((total, hole) => total + Number(hole.par), 0);
      const strokes = holes.reduce((total, hole) => total + Number(hole.strokes), 0);
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
              <td>{hole.holeNumber}</td>
              <td>{Number(hole.par)}</td>
              <td>{Number(hole.strokes)}</td>
              <td>{Number(hole.score)}</td>
              <td className="text-center">
                <div className="flex justify-center">
                  {Number(hole.fairway) ? <CheckIcon /> : <XIcon />}
                </div>
              </td>
              <td className="text-center">
                <div className="flex justify-center">
                  {Number(hole.green) ? <CheckIcon /> : <XIcon />}
                </div>
              </td>
              <td>{Number(hole.putts)}</td>
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
