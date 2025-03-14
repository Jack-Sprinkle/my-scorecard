"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Hole, HoleInputsProps } from "../_shared/interfaces";

export default function HoleInputs({ addHole }: HoleInputsProps) {
    const [hole, setHole] = useState<Hole>({
        hole: 1,
        par: 0,
        strokes: 0,
        score: 0,
        fairway: false,
        green: false,
        putts: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setHole((prevHole) => ({
            ...prevHole,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addHole(hole);
        setHole({
            hole: hole.hole + 1,
            par: 0,
            strokes: 0,
            score: 0,
            fairway: false,
            green: false,
            putts: 0,
        });
    };

    return (
        <div className="container-sm flex justify-center">
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
                <label className="mb-2">
                    Par:
                    <input 
                        type="number" 
                        name="par"
                        value={hole.par}
                        onChange={handleChange}
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <label className="mb-2">
                    Strokes:
                    <input 
                        type="number"
                        name="strokes"
                        value={hole.strokes}
                        onChange={handleChange} 
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <label className="mb-2">
                    Hit fairway?
                    <input 
                        type="checkbox"
                        name="fairway"
                        checked={hole.fairway}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </label>
                <label className="mb-2">
                    Green in Regulation?
                    <input 
                        type="checkbox" 
                        name="green"
                        checked={hole.green}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </label>
                <label className="mb-2">
                    Putts:
                    <input 
                        type="number"
                        name="putts"
                        value={hole.putts}
                        onChange={handleChange}
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <button type="submit">Save Hole</button>
            </form>
        </div>
    );
}