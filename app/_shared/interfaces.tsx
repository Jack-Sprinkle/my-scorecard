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

export interface Club {
  id?: number;
  name: string;
  type: string;
  loft: number;
  distance: number;
}

export interface AddHoleProps {
  roundNumber: number;
  saveRound: () => void;
}

export interface ScorecardProps {
  roundNumber: number;
}

export interface ClubInputsProps {
  saveClub: (club: Club) => void;
}
