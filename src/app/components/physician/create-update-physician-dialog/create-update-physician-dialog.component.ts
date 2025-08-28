import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PhysicianCreate } from '../../../core/interface/physician-create.interface';
@Component({
  selector: 'app-create-update-physician',
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './create-update-physician-dialog.component.html',
  styleUrl: './create-update-physician-dialog.component.css'
})
export class CreateUpdatePhysicianDialogComponent implements OnInit{
  public isEditMode:boolean = false;
  public physicianForm : FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateUpdatePhysicianDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PhysicianCreate){
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

  public submitForm(){
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
  public onClose():void{
    this.dialogRef.close();
  }
}
