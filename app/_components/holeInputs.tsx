"use client";


export default function HoleInputs() {


    return (
        <div className="container-sm flex flex-col gap-4">
            <h2 className="text-2xl underline text-center">Hole: 1</h2>
            <form className="flex flex-col items-start">
                <label className="mb-2">
                    Par:
                    <input 
                        type="number" 
                        name="par"
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <label className="mb-2">
                    Strokes:
                    <input 
                        type="number"
                        name="strokes" 
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <label className="mb-2">
                    Hit fairway?
                    <input 
                        type="checkbox"
                        name="fairway"
                        className="ml-2"
                    />
                </label>
                <label className="mb-2">
                    Green in Regulation?
                    <input 
                        type="checkbox" 
                        name="green"
                        className="ml-2"
                    />
                </label>
                <label className="mb-2">
                    Putts:
                    <input 
                        type="number"
                        name="putts"
                        className="ml-2 border rounded p-1 w-20"
                    />
                </label>
                <button type="submit">Save Hole</button>
            </form>
        </div>
    );
}