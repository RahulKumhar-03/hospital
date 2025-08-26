import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Patient } from '../../../interfaces';

@Component({
  selector: 'app-patient-dialog',
  imports: [MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './patient-dialog.component.html',
  styleUrl: './patient-dialog.component.css'
})
export class PatientDialogComponent {
  isEditMode:boolean = false;
  patientForm : FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PatientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Patient){
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      address:['', Validators.required],
      phone:['',Validators.required]
    })
  }

  ngOnInit():void{
    if(this.data){
      this.isEditMode = true;
      this.patientForm.patchValue({
        name: this.data.name,
        address: this.data.address,
        phone: this.data.phone
      })
    }
  }

  submitForm(){
    if(this.patientForm.valid){
      const newPatientData = {
        name: this.patientForm.value.name,
        address: this.patientForm.value.address,
        phone: this.patientForm.value.phone,
      }
      if(this.isEditMode && this.data.patientId){
        const updatedPatientData = {
          patientId: this.data.patientId,
          name: this.patientForm.value.name,
          address: this.patientForm.value.address,
          phone: this.patientForm.value.phone
        }
        this.isEditMode = false
        this.dialogRef.close(updatedPatientData)
      }
      else{
        this.dialogRef.close(newPatientData)
      }
    }
  }
  onClose():void{
    this.dialogRef.close();
  }
}
