"use client";
import { Club, ClubInputsProps } from "../_shared/interfaces";
import { useState, ChangeEvent, FormEvent } from "react";

export default function AddClub({ saveClub }: ClubInputsProps) {
    const [club, setClub] = useState<Club>({
        name: "",
        type: "",
        loft: 0,
        distance: 0,
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setClub((prevClub) => ({
            ...prevClub,
            [name]:
                name === "loft" || name === "distance"
                    ? parseFloat(value)
                    : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveClub(club);
        setClub({
            name: "",
            type: "",
            loft: 0,
            distance: 0,
        });
    };

    return (
        <div className="container-sm flex justify-center">
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <label className="mb-2">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={club.name}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </label>
                <label className="mb-2">
                    Type:
                    <select
                        name="type"
                        value={club.type}
                        onChange={handleChange}
                        className="ml-2"
                    >
                        <option value="">Please Select</option>
                        <option value="Driver">Driver</option>
                        <option value="Wood">Wood</option>
                        <option value="Iron">Iron</option>
                        <option value="Wedge">Wedge</option>
                        <option value="Putter">Putter</option>
                    </select>
                </label>
                <label className="mb-2">
                    Loft:
                    <input
                        type="number"
                        step={0.5}
                        name="loft"
                        value={club.loft}
                        onChange={handleChange}
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <label className="mb-2">
                    Distance:
                    <input
                        type="number"
                        name="distance"
                        value={club.distance}
                        onChange={handleChange}
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <button
                    type="submit"
                    className="rounded-lg bg-blue-500 text-white px-2 py-1 mt-4"
                >
                    Save Club
                </button>
            </form>
        </div>
    );
}
