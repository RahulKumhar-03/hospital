import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Physician, PhysicianCreate } from '../../../interfaces';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-create-update-physician',
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './create-update-physician.component.html',
  styleUrl: './create-update-physician.component.css'
})
export class CreateUpdatePhysicianComponent implements OnInit{
  isEditMode:boolean = false;
  physicianForm : FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateUpdatePhysicianComponent>, @Inject(MAT_DIALOG_DATA) public data: PhysicianCreate){
    this.physicianForm = this.fb.group({
      name: ['', Validators.required],
      position:['', Validators.required]
    })
  }

  ngOnInit():void{
    if(this.data){
      this.isEditMode = true;
      this.physicianForm.patchValue({
        name: this.data.name,
        position: this.data.position,
      })
    }
  }

  submitForm(){
    if(this.physicianForm.valid){
      const newPhysicianData = {
        name: this.physicianForm.value.name,
        position: this.physicianForm.value.position,
      }
      if(this.isEditMode && this.data.physicianId){
        const updatedPhysicianData = {
          physicianId: this.data.physicianId,
          name: this.physicianForm.value.name,
          position: this.physicianForm.value.position
        }
        this.isEditMode = false
        this.dialogRef.close(updatedPhysicianData)
      }
      else{
        this.dialogRef.close(newPhysicianData)
      }
    }
  }
  onClose():void{
    this.dialogRef.close();
  }
}
