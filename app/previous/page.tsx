"use client"
import { db } from "../_db/db"
import { useLiveQuery } from "dexie-react-hooks"
import { Round } from "../_shared/interfaces"
import { useEffect, useState } from "react"
import Scorecard from "../_components/Scorecard"

export default function PreviousRounds() {
    const fetchRounds: Round[] | undefined = useLiveQuery(() => 
        db.rounds.where("inProgress").equals(0).toArray()
    )

    const [rounds, setRounds] = useState<Round[] | null>(null);
    const [error, setError] = useState("");
    useEffect(() => {
        if (fetchRounds && fetchRounds.length > 0) {
            setRounds(fetchRounds)
            setError("")
        } else {
            setError("Please play a round and save it to see previous rounds.")
        }
    }, [fetchRounds])

    return (
        <div className="container-sm flex flex-col gap-5 md: items-center">
            <h1 className="text-3xl">Previous Rounds</h1>
            {error ? <p className="text-red-700">{error}</p> : null}
            {rounds?.map((round) => (
                <div key={round.id}>
                    <h2 className="text-lg underline ml-4">{round.courseName}</h2>
                    <Scorecard roundNumber={round.id ?? 0}/>
                </div>
            ))}
        </div>
        
    )
}