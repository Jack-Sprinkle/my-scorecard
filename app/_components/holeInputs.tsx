import { ChangeEvent } from "react";
import { HoleInputsProps } from "../_shared/interfaces";

export default function holeInputs({ currentHole, updateCurrentHole }: HoleInputsProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        updateCurrentHole({ ...currentHole, [name]: newValue });
    };

    return (
        <div className="container-sm flex justify-center">
            <form className="flex flex-col items-start">
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
            </form>
        </div>
    );
}