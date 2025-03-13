interface Hole {
    hole: number,
    par: number,
    strokes: number,
    score: number,
    fairway: boolean,
    green: boolean
}

interface ScorecardProps {
    scorecard: Hole[]
    setScorecard: React.Dispatch<React.SetStateAction<Hole[]>>
}

interface CurrentHoleProps {
    currentHole: Hole,
    setCurrentHole: React.Dispatch<React.SetStateAction<Hole>>
}

