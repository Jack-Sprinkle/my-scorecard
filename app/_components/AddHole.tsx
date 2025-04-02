"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AddHoleProps, Hole } from "../_shared/interfaces";
import { db } from "../_db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { LeftArrowIcon, RightArrowIcon } from "../_shared/icons";

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
        roundNumber: roundNumber,
        holeNumber: mostRecentHole.holeNumber + 1,
        par: 0,
        strokes: 0,
        score: 0,
        fairway: 0,
        green: 0,
        putts: 0,
        id: undefined,
      });
    } else {
      setCurrentHole({
        roundNumber: roundNumber,
        holeNumber: 1,
        par: null,
        strokes: null,
        score: null,
        fairway: null,
        green: null,
        putts: null,
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
          score: (currentHole.strokes ?? 0) - (currentHole.par ?? 0),
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const id = await db.holes.add(updatedHole);
        setCurrentHole({
          roundNumber: roundNumber,
          holeNumber: currentHole.holeNumber + 1,
          par: null,
          strokes: null,
          score: null,
          fairway: null,
          green: null,
          putts: null,
        });
      } else {
        setError(`Failed to add hole.`);
      }
    } catch (err) {
      setError(`Failed to add hole: ${err}`);
    }
  };

  const editHole = async () => {
    try {
      if (currentHole) {
        // Calculate the score before adding the hole
        const updatedHole = {
          ...currentHole,
          score: (currentHole.strokes ?? 0) - (currentHole.par ?? 0),
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const id = await db.holes.put(updatedHole);
        setCurrentHole({
          roundNumber: roundNumber,
          holeNumber: currentHole.holeNumber + 1,
          par: null,
          strokes: null,
          score: null,
          fairway: null,
          green: null,
          putts: null,
        });
      } else {
        setError(`Failed to add hole.`);
      }
    } catch (err) {
      setError(`Failed to add hole: ${err}`);
    }
  };

  const goPrevHole = () => {
    if (holes && currentHole) {
      const prevHoleNumber = currentHole.holeNumber - 1;
      const prevHoleIndex = holes.findIndex(
        (hole) => hole.holeNumber === prevHoleNumber
      );
      if (prevHoleIndex >= 0) {
        setCurrentHole(holes[prevHoleIndex]); // Update with the previous hole's data
      }
    }
  };

  const goNextHole = () => {
    if (holes && currentHole) {
      const nextHoleNumber = currentHole.holeNumber + 1;
      const nextHoleIndex = holes.findIndex(
        (hole) => hole.holeNumber === nextHoleNumber
      );

      if (nextHoleIndex >= 0) {
        setCurrentHole(holes[nextHoleIndex]); // Update with the previous hole's data
      } else {
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
      }
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
      <div className="flex justify-center gap-2">
        <button
          onClick={goPrevHole}
          disabled={currentHole.holeNumber === 1}
          className="disabled:opacity-50"
        >
          <LeftArrowIcon />
        </button>
        <button
          onClick={goNextHole}
          disabled={holes && currentHole.holeNumber > holes.length}
          className="disabled:opacity-50"
        >
          <RightArrowIcon />
        </button>
      </div>
      {error ? <p className="text-red-700">{error}</p> : null}
      <form className="flex flex-col items-start" onSubmit={addHole}>
        {currentHole.holeNumber < 19 && (
          <>
            <label className="mb-2">
              Par:
              <input
                type="number"
                name="par"
                value={currentHole?.par ?? ""}
                onChange={handleChange}
                className="ml-2 border rounded p-1 w-20"
              />
            </label>
            <label className="mb-2">
              Strokes:
              <input
                type="number"
                name="strokes"
                value={currentHole?.strokes ?? ""}
                onChange={handleChange}
                className="ml-2 border rounded p-1 w-20"
              />
            </label>
            <label className="mb-2">
              Hit fairway?
              <select
                name="fairway"
                value={currentHole?.fairway ?? 0}
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
                value={currentHole?.green ?? 0}
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
                value={currentHole?.putts ?? 0}
                onChange={handleChange}
                className="ml-2 border rounded p-1 w-20"
              />
            </label>
          </>
        )}

        <div className="flex w-full">
          {currentHole.holeNumber < 19 ? (
            <>
              {holes && currentHole.holeNumber > holes.length ? (
                <>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-500 text-white px-2 py-1 mt-4"
                  >
                    Add Hole
                  </button>
                  {currentHole.holeNumber === 10 ? (
                    <button
                      onClick={saveRound}
                      className="rounded-lg bg-green-500 text-white px-2 py-1 mt-4 ml-4"
                    >
                      Save Round
                    </button>
                  ) : null}
                </>
              ) : (
                <button
                  type="button"
                  onClick={editHole}
                  className="rounded-lg bg-yellow-500 text-white px-2 py-1 mt-4"
                >
                  Save Edit
                </button>
              )}
            </>
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
