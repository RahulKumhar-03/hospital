export interface AddPrescription {
    id?: number,
    physician: number,
    patient: number,
    medication: number,
    date: Date,
    appointment: number,
    dose: string
}
