"use client";
import { useState, useEffect } from "react";
import { Club } from "../_shared/interfaces";
import BagInputs from "../_components/bagInputs";
import { XIcon } from "../_shared/icons";

export default function Bag() {
  const [bag, setBag] = useState<Club[]>(() => {
    const savedBag = localStorage.getItem("bag");
    return savedBag ? JSON.parse(savedBag) : [];
  });

  useEffect(() => {
      localStorage.setItem("bag", JSON.stringify(bag));
  }, [bag]);

  const [showAddClub, setShowAddClub] = useState(false);
  
  const saveClub = (club: Club) => {
    setBag((prevBag) => [...prevBag, club]);
    setShowAddClub(false);
  }; 

  const deleteClub = (index: number) => {
    const newBag = [...bag];
    newBag.splice(index, 1);
    setBag(newBag);
  }

  return (
    <div className="container-sm flex flex-col gap-4">
      <h1 className="text-3xl">My bag</h1>
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
          {bag.map((club, index) => (
            <tr key={index}>
              <td>{club.name}</td>
              <td>{club.type}</td>
              <td>{club.loft}</td>
              <td>{club.distance}</td>
              <td className="text-center">
                <button onClick={() => deleteClub(index)} className="text-red-500 flex justify-center"><XIcon/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowAddClub(!showAddClub)} className="rounded-lg bg-blue-500 text-white px-2 py-1 mt-4 w-30">Add Club</button>
      {showAddClub && <BagInputs saveClub={saveClub} />}
    </div>
  );
}
