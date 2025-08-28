import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Block } from '../../../core/interface/block.interface';

@Component({
  selector: 'app-block-dialog',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-edit-block-dialog.component.html',
  styleUrl: './add-edit-block-dialog.component.css',
})
export class BlockDialogComponent {
  public isEditMode: boolean = false;
  public blockForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<BlockDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Block){
    this.blockForm = this.fb.group({
      blockFloor: [null,Validators.required],
      blockCode:[null,Validators.required],
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

  public submitForm(){
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

  public onClose(){
    this.dialogRef.close();
  }
}
