import { Medication } from "./medication.interface";
import { Physician } from "./physician.interface";

export interface Prescription {
    prescribedId?: number,
    patientId: number,
    patientName: string,
    phone: string,
    appointmentDate: Date,
    dose: string,
    createdOn: Date,
    physician: Physician,
    medication: Medication
}
