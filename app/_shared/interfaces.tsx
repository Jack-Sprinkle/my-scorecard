export interface Hole {
    holeNumber: number,
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

export interface HoleInputsProps {
    scorecard: Hole[];
    currentHole: Hole | null;
    addHole: (hole: Hole) => void;
}

export interface ClubInputsProps {
    saveClub: (club: Club) => void;
}

