import Dexie, { type EntityTable } from "dexie";
import { Scorecard, Bag, Hole, Club } from "../_shared/interfaces";

const db = new Dexie("myScorecardDB") as Dexie & {
    scorecard: EntityTable<Scorecard, 'id'>;
    bag: EntityTable<Bag, 'id'>;
    holes: EntityTable<Hole, 'id'>;
    club: EntityTable<Club, 'id'>;
};

db.version(1).stores({
    scorecard: '++id',
    bag: '++id',
    holes: '++id',
    club: '++id',
});

export { db };