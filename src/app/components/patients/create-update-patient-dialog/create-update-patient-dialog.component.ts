import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from '../../../core/interface/patient.interface';

@Component({
  selector: 'app-patient-dialog',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-update-patient-dialog.component.html',
  styleUrl: './create-update-patient-dialog.component.css'
})
export class CreateUpdatePatientDialogComponent {
  public isEditMode:boolean = false;
  public patientForm : FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateUpdatePatientDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Patient){
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

  public submitForm(){
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
  public onClose():void{
    this.dialogRef.close();
  }
}
