import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { BlockService } from '../../../core/services/blocks/block.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { Block } from '../../../core/interface/block.interface';
import { Room } from '../../../core/interface/room.interface';

@Component({
  selector: 'app-room-dialog',
  imports: [MatSlideToggleModule,MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './add-edit-room-dialog.component.html',
  styleUrl: './add-edit-room-dialog.component.css'
})
export class AddEditRoomDialogComponent implements OnInit {
  public isEditMode: boolean = false
  public blockData: Block[] = []
  public blockService = inject(BlockService)
  public roomForm: FormGroup

  constructor(private dailogRef: MatDialogRef<AddEditRoomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Room, private fb: FormBuilder, private snackBar: MatSnackBar){
    this.roomForm = this.fb.group({
      roomNumber:[0,Validators.required],
      blockId: [null, Validators.required],
      roomType:['',Validators.required],
      availability:[true,Validators.required]
    })
  }

  ngOnInit(){
    this.blockService.getBlocks().subscribe({
      next:(res) =>{
        this.blockData = res;
      },
      error: (err) => {
        alert('Error while fetching block details!!!');
        console.error('Error while fetching block details: ',err)
      }
    })
    if(this.data){
      this.isEditMode = true;
      this.roomForm.patchValue({
        roomNumber: this.data.roomNumber,
        blockId: this.data.block.blockId,
        roomType: this.data.roomType,
        availability: this.data.availability,
      })
    }
  }
  public submitForm(){
    if(this.roomForm.valid){
      const newRoomData = {
        roomNumber: this.roomForm.value.roomNumber,
        blockId: this.roomForm.value.blockId,
        roomType: this.roomForm.value.roomType,
        availability: this.roomForm.value.availability,
      }
      if(this.isEditMode && this.data.roomId){
        const updatedRoomData = {
          roomId: this.data.roomId,
          roomNumber: this.roomForm.value.roomNumber,
          blockId: this.roomForm.value.blockId,
          roomType: this.roomForm.value.roomType,
          availability: this.roomForm.value.availability,
        }
        this.dailogRef.close(updatedRoomData);
      } else {
        this.dailogRef.close(newRoomData);
      }
    }
  }
  public onClose(){
    this.dailogRef.close()
  }
}
