"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AddHoleProps, Hole } from "../_shared/interfaces";
import { db } from "../_db/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function AddHole({ roundNumber }: AddHoleProps) {
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
        id: undefined
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

  return (
    <div className="container-sm flex flex-col gap-4">
      <h2 className="text-2xl underline text-center">
        Hole: {currentHole?.holeNumber}
      </h2>
      {error ? <p>{error}</p> : null}
      <form className="flex flex-col items-start" onSubmit={addHole}>
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
        <div className="flex justify-between w-full">
          <button
            type="submit"
            className="rounded-lg bg-green-500 text-white px-2 py-1 mt-4"
          >
            Add Hole
          </button>
        </div>
      </form>
    </div>
  );
}
