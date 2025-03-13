export default function CurrentHole({ currentHole }: CurrentHoleProps) {
    return (
        <div className="container-sm text-center">
            <p className="underline">Hole: {currentHole.hole}</p>
            <div className="flex justify-center">
                <ul className="flex flex-col items-start">
                    <li>Par: {currentHole.par}</li>
                    <li>Strokes: {currentHole.strokes}</li>
                    <li>Score: {currentHole.score}</li>
                    <li>Hit fairway: {currentHole.fairway ? 'yes' : 'no'}</li>
                    <li>Green in Regulation: {currentHole.green ? 'yes' : 'no'}</li>
                </ul>
            </div>
        </div>
    );
}