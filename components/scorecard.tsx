"use client"
import { useState } from "react"

export default function ScoreCard() {
    const [scorecard, setScorecard] = useState([
        {"hole": 1, "par": 0, "score": 0, "over/under": 0},
        {"hole": 2, "par": 0, "score": 0, "over/under": 0},
        {"hole": 3, "par": 0, "score": 0, "over/under": 0},
        {"hole": 4, "par": 0, "score": 0, "over/under": 0},
        {"hole": 5, "par": 0, "score": 0, "over/under": 0},
        {"hole": 6, "par": 0, "score": 0, "over/under": 0},
        {"hole": 7, "par": 0, "score": 0, "over/under": 0},
        {"hole": 8, "par": 0, "score": 0, "over/under": 0},
        {"hole": 9, "par": 0, "score": 0, "over/under": 0},
        {"hole": 10, "par": 0, "score": 0, "over/under": 0},
        {"hole": 11, "par": 0, "score": 0, "over/under": 0},
        {"hole": 12, "par": 0, "score": 0, "over/under": 0},
        {"hole": 13, "par": 0, "score": 0, "over/under": 0},
        {"hole": 14, "par": 0, "score": 0, "over/under": 0},
        {"hole": 15, "par": 0, "score": 0, "over/under": 0},
        {"hole": 16, "par": 0, "score": 0, "over/under": 0},
        {"hole": 17, "par": 0, "score": 0, "over/under": 0},
        {"hole": 18, "par": 0, "score": 0, "over/under": 0},
    ])
    return(
        <table className="table-auto mx-auto">
            <thead>
                <th className="px-4">Hole</th>
                <th className="px-4">Par</th>
                <th className="px-4">Score</th>
                <th className="px-4">+/-</th>
            </thead>
            <tbody className="text-center">
                {scorecard.map((hole) => (
                    <tr>
                        <td>{hole.hole}</td>
                        <td>{hole.par}</td>
                        <td>{hole.score}</td>
                        <td>{hole["over/under"]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}