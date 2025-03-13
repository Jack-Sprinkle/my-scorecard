interface Hole {
    hole: number,
    par: number,
    strokes: number,
    score: number,
    fairway: boolean,
    green: boolean,
    putts: number
}

interface ScorecardProps {
    scorecard: Hole[]
    setScorecard: React.Dispatch<React.SetStateAction<Hole[]>>
}

interface CurrentHoleProps {
    currentHole: Hole,
    setCurrentHole: React.Dispatch<React.SetStateAction<Hole>>
    updateCurrentHole: (updatedHole: Hole) => void
}

interface InputsProps {
    currentHole: Hole;
    updateCurrentHole: (updatedHole: Hole) => void;
}

