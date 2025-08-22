import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Nurse } from '../../../interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-update-nurse',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-update-nurse.component.html',
  styleUrl: './create-update-nurse.component.css'
})
export class CreateUpdateNurseComponent implements OnInit {
  isEditMode: boolean = false;
  nurseForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateUpdateNurseComponent>, @Inject(MAT_DIALOG_DATA) public data: Nurse){
    this.nurseForm = this.fb.group({
      name: ['',Validators.required],
      position:['',Validators.required],
    })
  }
  ngOnInit():void{
    if(this.data){
      this.isEditMode = true;
      this.nurseForm.patchValue({
        name: this.data.name,
        position: this.data.position
      })
    }
  }

  submitForm(){
    if(this.nurseForm.valid){
      const newNurseData = {
        name: this.nurseForm.value.name,
        position: this.nurseForm.value.position,
      }
      if(this.isEditMode && this.data.nurseId){
        const updatedNurseData = {
          nurseId: this.data.nurseId,
          name: this.nurseForm.value.name,
          position: this.nurseForm.value.position,
          registered: this.data.registered,
          createdOn: this.data.createdOn,
        }
        this.isEditMode = false
        this.dialogRef.close(updatedNurseData)
      }
      else{
        this.dialogRef.close(newNurseData)
      }
    }
  }

  onClose(){
    this.dialogRef.close();
  }
}
