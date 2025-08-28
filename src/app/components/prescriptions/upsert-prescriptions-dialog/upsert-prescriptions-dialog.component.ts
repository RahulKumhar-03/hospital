import { Component, Inject, OnInit } from '@angular/core';
import { Patient } from '../../../core/interface/patient.interface';
import { Physician } from '../../../core/interface/physician.interface';
import { Medication } from '../../../core/interface/medication.interface';
import { Appointment } from '../../../core/interface/appointment.interface';
import { AppointmentService } from '../../../core/services/appointments/appointment.service';
import { MedicationService } from '../../../core/services/medications/medication.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { PhysicianService } from '../../../core/services/physician/physician.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prescription } from '../../../core/interface/prescription.interface';
import { AddPrescription } from '../../../core/interface/add-prescription.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upsert-prescriptions-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [MatSnackBarModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './upsert-prescriptions-dialog.component.html',
  styleUrl: './upsert-prescriptions-dialog.component.css'
})
export class UpsertPrescriptionsDialogComponent implements OnInit {

  public appointments: Appointment[] = [];
  public isEditting: boolean = false;
  public medications: Medication[] = [];
  public patients: Patient[] = [];
  public prescribedForm: FormGroup;
  public physicians: Physician[] = [];
  
  constructor(
    private appointmentService: AppointmentService,
    private medicationService: MedicationService,
    private patientService: PatientService, 
    private physicianService: PhysicianService, 
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpsertPrescriptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prescription,
    private fb: FormBuilder
  ){
     this.prescribedForm = this.fb.group({
      patientId: [null,Validators.required],
      physicianId:[null, Validators.required],
      appointmentId:[null, Validators.required],
      medicationId:[null, Validators.required],
      dose: ['',Validators.required],
      date: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadAppointments();
    this.loadPatients();
    this.loadPhysicians();
    this.loadMedications();
    if(this.data){
      console.log(this.data);
      
      this.isEditting = true;
      this.prescribedForm.patchValue({
        patientId: this.data.patientId,
        physicianId: this.data.physician.physicianId,
        medicationId: this.data.medication.medicationId,
        appointmentId: this.data.physician.appointments[0].appointmentId,
        dose: this.data.dose,
        date: this.data.createdOn
      })
    }
  }

  public loadAppointments(){
    this.appointmentService.getAppointments().subscribe({
      next: (res) =>{
        if(res){
          this.appointments = res;
        }
      },
      error: () => this.snackBar.open('Error while fetching appointments!','Undo',{ duration: 3000 })
    })
  }

  public loadMedications(){
    this.medicationService.getMediactions().subscribe({
      next: (res) =>{
        if(res){
          this.medications = res;
        }
      },
      error: () => this.snackBar.open('Error while fetching medications!','Undo',{ duration: 3000 })
    })
  }

  public loadPhysicians(){
    this.physicianService.getPhysicians().subscribe({
      next: (res) =>{
        if(res){
          this.physicians = res;
        }
      },
      error: () => this.snackBar.open('Error while fetching physicians!','Undo',{ duration: 3000 })
    })
  }

  public loadPatients(){
    this.patientService.getPatient().subscribe({
      next: (res) =>{
        if(res){
          this.patients = res;
        }
      },
      error: () => this.snackBar.open('Error while fetching patients!','Undo',{ duration: 3000 })
    })
  }

  public submitForm(){

    if(this.prescribedForm.valid){
      const newPrescribedData = {
        patient: this.prescribedForm.value.prescribedId,
        physician: this.prescribedForm.value.physicianId,
        medication: this.prescribedForm.value.medicationId,
        appointment: this.prescribedForm.value.appointmentId,
        dose: this.prescribedForm.value.dose,
        date: this.prescribedForm.value.date
      } as AddPrescription

      if(this.isEditting && this.data.prescribedId){
        const updatedPrescribedData = {
          id: this.data.prescribedId,
          patient: this.prescribedForm.value.prescribedId,
          physician: this.prescribedForm.value.physicianId,
          medication: this.prescribedForm.value.medicationId,
          appointment: this.prescribedForm.value.appointmentId,
          dose: this.prescribedForm.value.dose,
          date: this.prescribedForm.value.date
        } as AddPrescription

        this.dialogRef.close(updatedPrescribedData);
      } 
      else {
        this.dialogRef.close(newPrescribedData);
      }
    }
  }

  public onClose(){
    this.dialogRef.close();
  }
}
