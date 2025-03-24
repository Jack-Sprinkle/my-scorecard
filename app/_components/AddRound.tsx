import { db } from "../_db/db";
import { FormEvent, useState } from "react";

export default function AddRound() {
  const [error, setError] = useState("");
  const [courseName, setCourseName] = useState("");

  const addRound = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const roundId = await db.rounds.add({ courseName, inProgress: 1 });
    } catch (err) {
      setError(`Could not start round: ${err}`);
    }
  }

  return (
    <form
      onSubmit={addRound}
      className="container-sm flex flex-col items-start gap-4"
    >
      {error ? <p>{error}</p> : null}
      <label className="mb-2">
        Course Name:
        <input
          className="ml-2 border rounded p-1 w-50"
          type="text"
          value={courseName}
          onChange={(evt) => setCourseName(evt.target.value)}
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-green-500 text-white px-2 py-1 mt-4 w-30"
      >
        Start Round
      </button>
    </form>
  );
}
