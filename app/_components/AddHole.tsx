"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AddHoleProps, Hole } from "../_shared/interfaces";
import { db } from "../_db/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function AddHole({ roundNumber }: AddHoleProps) {
  const holes: Hole[] | undefined = useLiveQuery(() =>
    db.holes.where("roundNumber").equals(roundNumber).toArray()
  );

  const [error, setError] = useState("");
  const [hole, setHole] = useState<Hole | null>(null);

  useEffect(() => {
    if (holes && holes.length > 0) {
      const sortedHoles = holes.sort((a, b) => b.holeNumber - a.holeNumber);
      setHole(sortedHoles[0]);
    }
  }, [holes]);

  const addHole = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      if (hole) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const id = await db.holes.add(hole);

      } else {
        setError(`Failed to add hole.`)
      }
    } catch (err) {
      setError(`Failed to add hole: ${err}`);
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const {name, value} = evt.target
    console.log(name + ": " + value)
  }


  return (
    <div className="container-sm flex flex-col gap-4">
      <h2 className="text-2xl underline text-center">
        Hole: {hole?.holeNumber}
      </h2>
      {error ? <p>{error}</p> : null}
      <form className="flex flex-col items-start" onSubmit={addHole}>
        <label className="mb-2">
          Par:
          <input
            type="number"
            name="par"
            value={hole?.par || 0}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-20"
          />
        </label>
        <label className="mb-2">
          Strokes:
          <input
            type="number"
            name="strokes"
            value={hole?.strokes || 0}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-20"
          />
        </label>
        <label className="mb-2">
          Hit fairway?
          <input
            type="number"
            name="fairway"
            value={hole?.fairway || 0}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
        <label className="mb-2">
          Green in Regulation?
          <input
            type="number"
            name="green"
            value={hole?.green || 0}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
        <label className="mb-2">
          Putts:
          <input
            type="number"
            name="putts"
            value={hole?.putts || 0}
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
