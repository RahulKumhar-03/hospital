import { PhysicainAppointment } from "./physicain-appointment.interface";
import { TrainedIn } from "./trained-in.interface";

export interface Physician {
    physicianId: number,
    name: string,
    position: string,
    createdOn: Date,
    appointments: PhysicainAppointment[],
    trainedIn: TrainedIn[]
}
