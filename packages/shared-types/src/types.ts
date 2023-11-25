export interface SpreadsheetEntry {
    date: string,
    bodyWeight: number,
    exerciseName: string,
    repetitions: number,
    liftedWeight: number
}

export interface Set {
    liftedWeight: number,
    repetitions: number
}
export interface Lift {
    exerciseName: string,
    sets: Set[]
}

export interface LiftingDay {
    date: string,
    bodyWeight: number,
    lifts: Lift[]
}
