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

  const deleteCurrentRound = async (id: number | undefined) => {
    if (id !== undefined) {
      try {
        await db.holes.where("roundNumber").equals(id).delete();
        await db.rounds.delete(id);
        setCurrentRound(null);
      } catch (err) {
        console.error("Failed to delete round:", err);
      }
    }
  };

  if (!currentRound) {
    return (
      <div className="container-sm flex flex-col gap-5 md: items-center">
        <AddRound />
      </div>
    );
  }

  return (
    <div className="container-sm flex flex-col gap-5 md: items-center">
      <div className="container-sm flex flex-col gap-2 md: items-center">
        <h1 className="text-3xl">Current Round</h1>
        <h2 className="text-2xl">Course: {currentRound.courseName}</h2>
        <button
          onClick={() => deleteCurrentRound(currentRound.id)}
          className="rounded-lg bg-red-500 text-white px-2 py-1 text-xs self-start"
        >
          Discard Round
        </button>
      </div>
      {currentRound.id !== undefined && (
        <AddHole roundNumber={currentRound.id} saveRound={saveRound} />
      )}
      {currentRound.id !== undefined && (
        <Scorecard roundNumber={currentRound.id} />
      )}
    </div>
  );
}
