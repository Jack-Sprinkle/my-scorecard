"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AddHoleProps, Hole } from "../_shared/interfaces";
import { db } from "../_db/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function AddHole({ roundNumber, saveRound }: AddHoleProps) {
  const holes: Hole[] | undefined = useLiveQuery(() =>
    db.holes.where("roundNumber").equals(roundNumber).toArray()
  );

  const [currentHole, setCurrentHole] = useState<Hole | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (holes && holes.length > 0) {
      const sortedHoles = holes.sort((a, b) => b.holeNumber - a.holeNumber);
      const mostRecentHole = sortedHoles[0];
      setCurrentHole({
        ...mostRecentHole,
        holeNumber: mostRecentHole.holeNumber + 1,
        id: undefined,
      });
    } else {
      setCurrentHole({
        roundNumber: roundNumber,
        holeNumber: 1,
        par: 0,
        strokes: 0,
        score: 0,
        fairway: 0,
        green: 0,
        putts: 0,
      });
    }
  }, [holes, roundNumber]);

  const addHole = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      if (currentHole) {
        // Calculate the score before adding the hole
        const updatedHole = {
          ...currentHole,
          score: currentHole.strokes - currentHole.par,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const id = await db.holes.add(updatedHole);
        setCurrentHole({
          roundNumber: roundNumber,
          holeNumber: currentHole.holeNumber + 1,
          par: 0,
          strokes: 0,
          score: 0,
          fairway: 0,
          green: 0,
          putts: 0,
        });
      } else {
        setError(`Failed to add hole.`);
      }
    } catch (err) {
      setError(`Failed to add hole: ${err}`);
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setCurrentHole((prevHole) =>
      prevHole
        ? {
            ...prevHole,
            [name]: value,
          }
        : null
    );
  };

  const handleSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setCurrentHole((prevHole) =>
      prevHole
        ? {
            ...prevHole,
            [name]: value,
          }
        : null
    );
  };
  
  if (!currentHole) return <p>Loading your current hole.</p>;

  return (
    <div className="container-sm flex flex-col gap-4">
      <h3 className="text-xl underline text-center">
        {currentHole.holeNumber < 19
          ? `Hole: ${currentHole.holeNumber}`
          : "Round Complete"}
      </h3>
      {error ? <p className="text-red-700">{error}</p> : null}
      <form className="flex flex-col items-start" onSubmit={addHole}>
        {currentHole.holeNumber < 19 && (
          <>
            <label className="mb-2">
              Par:
              <input
                type="number"
                name="par"
                value={currentHole?.par || 0}
                onChange={handleChange}
                className="ml-2 border rounded p-1 w-20"
              />
            </label>
            <label className="mb-2">
              Strokes:
              <input
                type="number"
                name="strokes"
                value={currentHole?.strokes || 0}
                onChange={handleChange}
                className="ml-2 border rounded p-1 w-20"
              />
            </label>
            <label className="mb-2">
              Hit fairway?
              <select
                name="fairway"
                value={currentHole?.fairway || 0}
                onChange={handleSelectChange}
                className="ml-2"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label className="mb-2">
              Green in Regulation?
              <select
                name="green"
                value={currentHole?.green || 0}
                onChange={handleSelectChange}
                className="ml-2"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </label>
            <label className="mb-2">
              Putts:
              <input
                type="number"
                name="putts"
                value={currentHole?.putts || 0}
                onChange={handleChange}
                className="ml-2 border rounded p-1 w-20"
              />
            </label>
          </>
        )}

        <div className="flex w-full">
          {currentHole.holeNumber < 19 ? (
            <button
              type="submit"
              className="rounded-lg bg-blue-500 text-white px-2 py-1 mt-4"
            >
              Add Hole
            </button>
          ) : (
            <button
              onClick={saveRound}
              className="rounded-lg bg-green-500 text-white px-2 py-1 mt-4"
            >
              Save Round
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
