import { OnCall } from "./on-call.interface";
import { Patient } from "./patient.interface";
import { Physician } from "./physician.interface";

export interface Appointment {
    appointmentId: number,
    starDateTime: Date,
    endDateTime: Date,
    createdOn: Date,
    patient: Patient,
    physician: Physician,
    prepNurse: OnCall,
}
