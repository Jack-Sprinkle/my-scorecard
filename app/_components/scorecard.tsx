
export default function Scorecard({ scorecard }: ScorecardProps) {
    return(
        <table className="table-auto mx-auto">
            <thead>
                <tr>
                    <th className="px-4">Hole</th>
                    <th className="px-4">Par</th>
                    <th className="px-4">Score</th>
                    <th className="px-4">+/-</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {scorecard.map((hole, index) => (
                    <tr key={index}>
                        <td>{hole.hole}</td>
                        <td>{hole.par}</td>
                        <td>{hole.strokes}</td>
                        <td>{hole.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}