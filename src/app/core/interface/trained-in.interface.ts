import { Procedure } from "./procedure.interface"

export interface TrainedIn {
    trainedInId: number,
        physicianId: number,
        physcianName: string,
        certificationDate: Date
        certificationExpires: Date,
        createdOn:Date,
        treatment: Procedure
}
