import { CheckIcon, XIcon } from "../_shared/icons"
import { ScorecardProps } from "../_shared/interfaces"

export default function Scorecard({ scorecard }: ScorecardProps) {

    return(
        <table className="table-auto mx-auto">
            <thead>
                <tr>
                    <th className="px-2">Hole</th>
                    <th className="px-2">Par</th>
                    <th className="px-2">Strokes</th>
                    <th className="px-2">+/-</th>
                    <th className="px-2">Fairway</th>
                    <th className="px-2">GIR</th>
                    <th className="px-2">Putts</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {scorecard.map((hole, index) => (
                    <tr key={index}>
                        <td>{hole.hole}</td>
                        <td>{hole.par}</td>
                        <td>{hole.strokes}</td>
                        <td>{hole.score}</td>
                        <td className="text-center">
                            <div className="flex justify-center">
                                {hole.fairway ? <CheckIcon /> : <XIcon />}
                            </div>
                        </td>
                        <td className="text-center">
                            <div className="flex justify-center">
                                {hole.green ? <CheckIcon /> : <XIcon />}
                            </div>
                        </td>
                        <td>{hole.putts}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}