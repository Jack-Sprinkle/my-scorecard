"use client";
import { useState, useEffect } from "react";
import { Club } from "../_shared/interfaces";
import BagInputs from "../_components/bagInputs";

export default function Bag() {
  const [bag] = useState<Club[]>(() => {
    const savedBag = localStorage.getItem("bag");
    return savedBag ? JSON.parse(savedBag) : [];
  });

  useEffect(() => {
      localStorage.setItem("bag", JSON.stringify(bag));
  }, [bag]);

  const [showAddClub, setShowAddClub] = useState(false);
  
  const saveClub = (club: Club) => {
    bag.push(club);
    setShowAddClub(false);
  }; 

  return (
    <div className="container-sm">
      <h1 className="text-3xl">My bag</h1>
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="px-2">Club</th>
            <th className="px-2">Type</th>
            <th className="px-2">Loft</th>
            <th className="px-2">Distance</th>
            
          </tr>
        </thead>
        <tbody className="text-center">
          {bag.map((club, index) => (
            <tr key={index}>
              <td>{club.name}</td>
              <td>{club.type}</td>
              <td>{club.loft}</td>
              <td>{club.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowAddClub(!showAddClub)}>Add Club</button>
      {showAddClub && <BagInputs saveClub={saveClub} />}
    </div>
  );
}
