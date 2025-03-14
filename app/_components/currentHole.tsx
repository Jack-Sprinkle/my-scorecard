import Inputs from "./holeInputs";
import { CheckIcon, XIcon } from "../_shared/icons";
import { CurrentHoleProps } from "../_shared/interfaces";

export default function CurrentHole({ currentHole, updateCurrentHole }: CurrentHoleProps) {
    return (
        <div className="container-sm flex flex-col items-start gap-5">
            <h2 className="text-2xl underline">Hole: {currentHole.hole}</h2>
            <div className="flex flex-col justify-center gap-6 md:flex-row md:gap-12">
                <div className="flex justify-center">
                    <ul className="flex flex-col items-start">
                        <li>Par: {currentHole.par}</li>
                        <li>Strokes: {currentHole.strokes}</li>
                        <li>Score: {currentHole.score}</li>
                        <li className="flex gap-2 items-center">Hit fairway: {currentHole.fairway ? <CheckIcon /> : <XIcon />}</li>
                        <li className="flex gap-2 items-center">Green in Regulation: {currentHole.green ? <CheckIcon /> : <XIcon />}</li>
                    </ul>
                </div>
                <Inputs currentHole={currentHole} updateCurrentHole={updateCurrentHole} />
            </div>
        </div>
    );
}