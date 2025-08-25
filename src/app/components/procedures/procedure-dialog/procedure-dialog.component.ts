import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Procedure } from '../../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-procedure-dialog',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './procedure-dialog.component.html',
  styleUrl: './procedure-dialog.component.css'
})
export class ProcedureDialogComponent implements OnInit {
  procedureForm: FormGroup
  isEditMode: boolean = false

  constructor(private dialogRef: MatDialogRef<ProcedureDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Procedure, private fb: FormBuilder){
    this.procedureForm = this.fb.group({
      name: ['', Validators.required],
      cost:[10000, Validators.required]
    })
  }
  ngOnInit():void{
    if(this.data){
      this.isEditMode = true
      this.procedureForm.patchValue({
        name:this.data.name,
        cost: this.data.cost
      })
    }
  }

  submitForm(){
    if(this.procedureForm.valid){
      const newProcedureData = {
        name: this.procedureForm.value.name,
        cost: this.procedureForm.value.cost
      }
      if(this.isEditMode && this.data.procedureId){
        const updatedProcedureData = {
          procedureId: this.data.procedureId,
          name: this.procedureForm.value.name,
          cost: this.procedureForm.value.cost
        }
        this.isEditMode = false
        this.dialogRef.close(updatedProcedureData)
      }
      else{
        this.dialogRef.close(newProcedureData)
      }
    }
  }

  onClose(){
    this.dialogRef.close()
  }
}
