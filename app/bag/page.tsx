"use client";
import { useState, useEffect } from "react";
import { Club } from "../_shared/interfaces";
import AddClub from "../_components/AddClub";
import { XIcon } from "../_shared/icons";
import { db } from "../_db/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function Bag() {
  const fetchClubs: Club[] | undefined = useLiveQuery(() => db.clubs.toArray());

  const [clubs, setClubs] = useState<Club[] | null>(null);
  const [showAddClub, setShowAddClub] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (fetchClubs && fetchClubs.length > 0) {
      setClubs(fetchClubs);
      setError("");
    } else {
      setClubs(null);
      setError("Please add a club to your bag.");
    }
  }, [fetchClubs, clubs]);

  const saveClub = async (club: Club) => {
    try {
      if (club) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newClubId = await db.clubs.add(club);
      }
    } catch (err) {
      setError(`${err}`);
    }
  };

  const deleteClub = async (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deletedClub = await db.clubs.delete(id);
  };

  return (
    <div className="container-sm flex flex-col gap-4 md: items-center">
      <h1 className="text-3xl">My bag</h1>
      {error ? <p className="text-red-700">{error}</p> : null}
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="px-4">Club</th>
            <th className="px-4">Type</th>
            <th className="px-4">Loft</th>
            <th className="px-4">Distance</th>
            <th className="px-4"></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {clubs?.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.type}</td>
              <td>{club.loft}</td>
              <td>{club.distance}</td>
              <td className="text-center">
                <button
                  onClick={() => club.id !== undefined && deleteClub(club.id)}
                  className="text-red-500 flex justify-center"
                >
                  <XIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setShowAddClub(!showAddClub)}
        className="rounded-lg bg-blue-500 text-white px-2 py-1 mt-4 w-30"
      >
        Add Club
      </button>
      {showAddClub && <AddClub saveClub={saveClub} />}
    </div>
  );
}
