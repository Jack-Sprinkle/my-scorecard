export interface Hole {
    holeNumber: number,
    par: number,
    strokes: number,
    score: number,
    fairway: boolean,
    green: boolean,
    putts: number,
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
    currentHole: Hole;
    setCurrentHole: React.Dispatch<React.SetStateAction<Hole>>;
    addHole: (hole: Hole) => void;
    editHole: (hole: Hole) => void;
}

export interface ClubInputsProps {
    saveClub: (club: Club) => void;
}

