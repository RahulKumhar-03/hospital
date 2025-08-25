import { Component, Inject, inject, OnInit } from '@angular/core';
import { AddRoom, Block} from '../../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { BlockService } from '../../../services/blocks/block.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room-dialog',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule,MatInputModule, MatButtonModule],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.css'
})
export class RoomDialogComponent implements OnInit {
  isEditMode: boolean = false
  blockData: Block[] = []
  blockService = inject(BlockService)
  roomForm: FormGroup

  constructor(private dailogRef: MatDialogRef<RoomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AddRoom, private fb: FormBuilder){
    this.roomForm = this.fb.group({
      roomNumber:[0,Validators.required],
      roomType:['',Validators.required],
      availability:['',Validators.required]
    })
  }

  ngOnInit(){
    this.blockService.getAllBlockDetails().subscribe({
      next:(res) =>{
        this.blockData = res;
        console.log(this.blockData);
      },
      error: (err) => {
        alert('Error while fetching block details!!!');
        console.error('Error while fetching block details: ',err)
      }
    })
    if(this.data){
      this.isEditMode = true;
      this.roomForm
    }
  }
  submitForm(){

  }
  onClose(){
    this.dailogRef.close()
  }
}
