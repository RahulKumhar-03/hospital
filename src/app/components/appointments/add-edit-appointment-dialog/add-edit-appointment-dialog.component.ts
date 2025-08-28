import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OnCallService } from '../../../core/services/onCall/on-call.service';
import { PhysicianService } from '../../../core/services/physician/physician.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Patient } from '../../../core/interface/patient.interface';
import { OnCall } from '../../../core/interface/on-call.interface';
import { Physician } from '../../../core/interface/physician.interface';
import { Appointment } from '../../../core/interface/appointment.interface';

@Component({
  selector: 'app-appointment-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './add-edit-appointment-dialog.component.html',
  styleUrl: './add-edit-appointment-dialog.component.css',
})
export class AddEditAppointmentDialogComponent implements OnInit {
  public isEditting: boolean = false
  public patientData: Patient[] = [];
  public onCallData: OnCall[] = [];
  public physicianData: Physician[] = [];

  public appointmentForm: FormGroup

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AddEditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private onCallService: OnCallService,
    private physicianService: PhysicianService,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ){
    this.appointmentForm = this.fb.group({
      patientId: [null, Validators.required],
      physicianId: [null, Validators.required],
      onCallId: [null, Validators.required],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required]
    })
  }

  ngOnInit(){
    this.loadOnCallData();
    this.loadPatientData();
    this.loadPhysicianData();

    if(this.data){
      this.isEditting = true;
      
      this.appointmentForm.patchValue({
        patientId: this.data.patient.patientId,
        physicianId: this.data.physician.physicianId,
        onCallId: this.data.prepNurse.onCallId,
        startDateTime: this.data.starDateTime,
        endDateTime: this.data.endDateTime
      })
    }
  }

  public loadOnCallData(){
    this.onCallService.getOnCalls().subscribe({
      next:(res) => this.onCallData = res,
      error:(err) => {
        this.snackBar.open('Error while fetching onCall Records!!!','Undo',{
          duration: 3000
        })
        console.error('Error occurred while fetching onCall records: ',err)
      }
    })
  }

  public loadPatientData(){
    this.patientService.getPatient().subscribe({
      next:(res) => this.patientData = res,
      error:(err) => {
        this.snackBar.open('Error while fetching patient Records!!!','Undo',{
          duration: 3000
        })
        console.error('Error occurred while fetching patient records: ',err)
      }
    })
  }

  public loadPhysicianData(){
    this.physicianService.getPhysicians().subscribe({
      next:(res) => this.physicianData = res,
      error:(err) => {
        this.snackBar.open('Error while fetching physician Records!!!','Undo',{
          duration: 3000
        })
        console.error('Error occurred while fetching physician records: ',err)
      }
    })
  }

  public submitForm(){
    if(this.appointmentForm.valid){
      const newAppointmentData = {
        patientId: this.appointmentForm.value.patientId,
        physicianId: this.appointmentForm.value.physicianId,
        onCallId: this.appointmentForm.value.onCallId,
        startDateTime: this.appointmentForm.value.startDateTime,
        endDateTime: this.appointmentForm.value.endDateTime
      }
      if(this.isEditting && this.data.appointmentId){
        const updatedAppointmentData = {
          appointmentId: this.data.appointmentId,
          patientId: this.appointmentForm.value.patientId,
          physicianId: this.appointmentForm.value.physicianId,
          onCallId: this.appointmentForm.value.onCallId,
          startDateTime: this.appointmentForm.value.startDateTime,
          endDateTime: this.appointmentForm.value.endDateTime
        }
        this.dialogRef.close(updatedAppointmentData);
      }
      else {
        this.dialogRef.close(newAppointmentData)
      }
    }
  }

  public onClose(){
    this.dialogRef.close()
  }
}
