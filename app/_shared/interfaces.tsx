export interface Scorecard {
  id: number;
}

export interface Bag {
  id: number;
}

export interface Hole {
  id?: number;
  holeNumber: number;
  par: number;
  strokes: number;
  score: number;
  fairway: boolean;
  green: boolean;
  putts: number;
}

export interface Club {
  id?: number;
  name: string;
  type: string;
  loft: number;
  distance: number;
}

export interface ScorecardProps {
  scorecard: Hole[];
  setScorecard: React.Dispatch<React.SetStateAction<Hole[]>>;
}

export interface HoleInputsProps {
  currentHole: Hole;
  setCurrentHole: React.Dispatch<React.SetStateAction<Hole>>;
  editHole: (hole: Hole) => void;
}

export interface ClubInputsProps {
  saveClub: (club: Club) => void;
}
