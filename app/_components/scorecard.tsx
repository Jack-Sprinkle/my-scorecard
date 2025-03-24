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
  const [totalScore, setTotalScore] = useState(0)
  const [error, setError] = useState("");

  useEffect(() => {
    if (holes && holes.length > 0) {
      const sortedHoles = holes.sort((a, b) => a.holeNumber - b.holeNumber);
      const totalScore = holes.reduce((total, hole) => total + hole.score, 0);
      setScorecard(sortedHoles);
      setTotalScore(totalScore)
      setError("");
    } else {
      setError("Error fetching your scorecard.");
    }
  }, [holes, roundNumber]);

  if (!scorecard) return <p>Add a hole to start your scorecard.</p>;

  return (
    <div className="container-sm flex flex-col gap-4">
      {error ? <p>{error}</p> : null}
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="px-2">Hole</th>
            <th className="px-2">Par</th>
            <th className="px-2">Strokes</th>
            <th className="px-2">+/-</th>
            <th className="px-2">Fairway</th>
            <th className="px-2">GIR</th>
            <th className="px-2">Putts</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {scorecard?.map((hole, index) => (
            <tr key={index}>
              <td>{hole.holeNumber}</td>
              <td>{hole.par}</td>
              <td>{hole.strokes}</td>
              <td>{hole.score}</td>
              <td className="text-center">
                <div className="flex justify-center">
                  {hole.fairway ? <CheckIcon /> : <XIcon />}
                </div>
              </td>
              <td className="text-center">
                <div className="flex justify-center">
                  {hole.green ? <CheckIcon /> : <XIcon />}
                </div>
              </td>
              <td>{hole.putts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2 className="pl-2">Score: {totalScore}</h2>
      </div>
    </div>
  );
}
