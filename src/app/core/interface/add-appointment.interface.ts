export interface AddAppointment {
    appointmentId?: number,
    patientId: number,
    physicianId:number,
    onCallId: number,
    startDateTime: Date,
    endDateTime: Date,
}
