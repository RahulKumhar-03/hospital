export interface Physician {
    physicianId: number,
    name: string,
    position: string,
    createdOn: Date,
    appointments: [
      {
        appointmentId: number,
        starDateTime: Date,
        endDateTime: Date,
        patient: {
          patientId: number,
          name: string,
          address: string,
          phone: string,
          createdOn: Date,
        }
      }
    ],
    trainedIn: TrainedIn[]
}
export interface Nurse{
    nurseId?: number,
    name: string,
    position: string,
    registered: true,
    createdOn: Date,
}
export interface TrainedIn{
    trainedInId: number,
    physicianId: number,
    physcianName: string,
    certificationDate: Date
    certificationExpires: Date,
    createdOn:Date,
    treatment: Procedure
}
export interface Procedure{
    procedureId: number,
    name: string,
    cost: number,
    createdOn: Date
}
export interface PhysicianCreate{
    physicianId?: number,
    name: string,
    position: string
}
export interface ResponseModel{
    status: boolean,
    message: string
}
export interface PhysicianUpdate{
    physicianId: number,
    name: string,
    position: string
}