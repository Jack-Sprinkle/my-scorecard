export interface Hole {
    hole: number,
    par: number,
    strokes: number,
    score: number,
    fairway: boolean,
    green: boolean,
    putts: number
}

export interface Club {
    name: string,
    type: string,
    loft: number,
    distance: number,
}

export interface ScorecardProps {
    scorecard: Hole[]
    setScorecard: React.Dispatch<React.SetStateAction<Hole[]>>
}

export interface CurrentHoleProps {
    currentHole: Hole,
    setCurrentHole: React.Dispatch<React.SetStateAction<Hole>>
    updateCurrentHole: (updatedHole: Hole) => void
}

export interface HoleInputsProps {
    currentHole: Hole;
    updateCurrentHole: (updatedHole: Hole) => void;
}

export interface ClubInputsProps {
    saveClub: (club: Club) => void;
}

