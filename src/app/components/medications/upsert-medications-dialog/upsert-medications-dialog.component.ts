import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Medication } from '../../../core/interface/medication.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-upsert-medications-dialog',
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './upsert-medications-dialog.component.html',
  styleUrl: './upsert-medications-dialog.component.css'
})
export class UpsertMedicationsDialogComponent implements OnInit {

  public isEditting: boolean = false;
  public medicationForm: FormGroup;
  
  constructor(private dialogRef: MatDialogRef<UpsertMedicationsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Medication, private fb: FormBuilder){
    this.medicationForm = this.fb.group({
      medicationName: ['', Validators.required],
      medicationBrand:['', Validators.required],
      medicationDescription: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.data){
      this.isEditting = true;
      this.medicationForm.patchValue({
        medicationName: this.data.name,
        medicationBrand: this.data.brand,
        medicationDescription: this.data.description,
      })
    }
  }

  public submitForm(){
    if(this.medicationForm.valid){
      const newMedicationData = {
        name: this.medicationForm.value.medicationName,
        brand: this.medicationForm.value.medicationBrand,
        description: this.medicationForm.value.medicationDescription
      }

      if(this.isEditting && this.data.medicationId){
        const updatedMedicationData = {
          medicationId: this.data.medicationId,
          name: this.medicationForm.value.medicationName,
          brand: this.medicationForm.value.medicationBrand,
          description: this.medicationForm.value.medicationDescription
        }
        
        this.isEditting = false;
        this.dialogRef.close(updatedMedicationData);
      }
      else {
        this.dialogRef.close(newMedicationData)
      }
    }
  }

  public onClose(){
    this.dialogRef.close();
  }
}
