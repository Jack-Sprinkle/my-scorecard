"use client";
import { HoleInputsProps } from "../_shared/interfaces";
import { ChangeEvent, FormEvent } from "react";

export default function HoleInputs({ currentHole, setCurrentHole, addHole, editHole }: HoleInputsProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCurrentHole(prevHole => ({
            ...prevHole, [name] : type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const score = currentHole.strokes - currentHole.par;
        currentHole.score = score;
        addHole(currentHole);
    };

    return (
        <div className="container-sm flex flex-col gap-4">
            <h2 className="text-2xl underline text-center">Hole: {currentHole.holeNumber}</h2>
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <label className="mb-2">
                    Par:
                    <input 
                        type="number" 
                        name="par"
                        value={currentHole.par}
                        onChange={handleChange}
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <label className="mb-2">
                    Strokes:
                    <input 
                        type="number"
                        name="strokes"
                        value={currentHole.strokes}
                        onChange={handleChange}
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <label className="mb-2">
                    Hit fairway?
                    <input 
                        type="checkbox"
                        name="fairway"
                        checked={currentHole.fairway}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </label>
                <label className="mb-2">
                    Green in Regulation?
                    <input 
                        type="checkbox" 
                        name="green"
                        checked={currentHole.green}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </label>
                <label className="mb-2">
                    Putts:
                    <input 
                        type="number"
                        name="putts"
                        value={currentHole.putts}
                        onChange={handleChange}
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <div className="flex justify-between w-full">
                    <button type="button" onClick={() => editHole(currentHole)} className="rounded-lg bg-blue-500 text-white px-2 py-1 mt-4">Save Edit</button>
                    <button type="submit" className="rounded-lg bg-green-500 text-white px-2 py-1 mt-4">Add Hole</button>
                </div>
            </form>
        </div>
    );
}