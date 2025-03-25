"use client";
import { Round } from "../_shared/interfaces";
import { db } from "../_db/db";
import { useLiveQuery } from "dexie-react-hooks";
import AddRound from "../_components/AddRound";
import AddHole from "../_components/AddHole";
import { useState, useEffect } from "react";
import Scorecard from "../_components/Scorecard";

export default function CurrentRound() {
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const rounds: Round[] | undefined = useLiveQuery(() =>
    db.rounds.where("inProgress").equals(1).toArray()
  );

  useEffect(() => {
    if (rounds && rounds.length > 0) {
      setCurrentRound(rounds[0]);
    }
  }, [rounds]);

  const saveRound = async () => {
    if (currentRound && currentRound.id !== undefined) {
      try {
        await db.rounds.update(currentRound.id, { inProgress: 0 });
        setCurrentRound(null);
      } catch (err) {
        console.error("Failed to save round:", err);
      }
    }
  };

  if (!currentRound) {
    return <AddRound />;
  }

  return (
    <div className="container-sm flex flex-col gap-5 md: items-center">
      <h1 className="text-3xl">Current Round</h1>
      <p>{currentRound.courseName}</p>
      {currentRound.id !== undefined && (
        <AddHole roundNumber={currentRound.id} saveRound={saveRound} />
      )}
      {currentRound.id !== undefined && (
        <Scorecard roundNumber={currentRound.id} />
      )}
    </div>
  );
}
