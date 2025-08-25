import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Block } from '../../../interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-block-dialog',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './block-dialog.component.html',
  styleUrl: './block-dialog.component.css'
})
export class BlockDialogComponent {
  isEditMode: boolean = false;
  blockForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<BlockDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Block){
    this.blockForm = this.fb.group({
      blockFloor: [0,Validators.required],
      blockCode:[0,Validators.required],
    })
  }
  ngOnInit():void{
    if(this.data){
      this.isEditMode = true;
      this.blockForm.patchValue({
        blockFloor: this.data.blockFloor,
        blockCode: this.data.blockCode
      })
    }
  }

  submitForm(){
    if(this.blockForm.valid){
      const newBlockData = {
        blockFloor: this.blockForm.value.blockFloor,
        blockCode: this.blockForm.value.blockCode,
      }
      if(this.isEditMode && this.data.blockId){
        const updatedBlockData = {
          blockId: this.data.blockId,
          blockFloor: this.blockForm.value.blockFloor,
          blockCode: this.blockForm.value.blockCode,
          createdOn: this.data.createdOn,
        }
        this.isEditMode = false
        this.dialogRef.close(updatedBlockData)
      }
      else{
        this.dialogRef.close(newBlockData)
      }
    }
  }

  onClose(){
    this.dialogRef.close();
  }
}
