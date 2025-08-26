import { Patient } from "./patient.interface";

export interface PhysicainAppointment {
    appointmentId: number,
    starDateTime: Date,
    endDateTime: Date,
    patient: Patient
}
