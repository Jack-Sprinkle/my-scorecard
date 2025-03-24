export interface Round {
  id?: number;
  courseName: string;
  inProgress: number;
}

export interface Hole {
  id?: number;
  roundNumber?: number;
  holeNumber: number;
  par: number;
  strokes: number;
  score: number;
  fairway: number;
  green: number;
  putts: number;
}

export interface Bag {
  id: number;
}

export interface Club {
  id: number;
  name: string;
  type: string;
  loft: number;
  distance: number;
}

export interface AddHoleProps {
  roundNumber: number;
}

export interface ScorecardProps {
  scorecard: Hole[];
  setScorecard: React.Dispatch<React.SetStateAction<Hole[]>>;
}

export interface ClubInputsProps {
  saveClub: (club: Club) => void;
}
