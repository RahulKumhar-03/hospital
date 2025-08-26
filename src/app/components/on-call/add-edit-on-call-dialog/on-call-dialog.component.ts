import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NurseService } from '../../../core/services/nurse/nurse.service';
import { BlockService } from '../../../core/services/blocks/block.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Block } from '../../../core/interface/block.interface';
import { Nurse } from '../../../core/interface/nurse.interface';
import { OnCall } from '../../../core/interface/on-call.interface';

@Component({
  selector: 'app-on-call-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule, MatSelectModule],
  templateUrl: './on-call-dialog.component.html',
  styleUrl: './on-call-dialog.component.css'
})
export class OnCallDialogComponent implements OnInit {
  public isEditting: boolean = false
  public blockData: Block[] = []
  public nurseData: Nurse[] = []

  public onCallForm : FormGroup
  constructor(private fb: FormBuilder, private nurseService: NurseService, private blockService: BlockService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<OnCallDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OnCall){
    this.onCallForm = this.fb.group({
      nurseId: [null,Validators.required],
      blockId:[null,Validators.required],
      onCallStart:[null,Validators.required],
      onCallEnd:[null,Validators.required]
    })
  }

  ngOnInit():void{
    this.loadBlockData();
    this.loadNurseData();
    if(this.data){
      this.isEditting = true;
      this.onCallForm.patchValue({
        nurseId: this.data.nurse.nurseId,
        blockId: this.data.block.blockId,
        onCallStart: this.data.onCallStart,
        onCallEnd: this.data.onCallEnd
      })
    }
  }

  public loadBlockData():void{
    this.blockService.getAllBlockDetails().subscribe({
      next:(res) =>{ 
        this.blockData = res;
      },
      error:(err) =>{
        this.snackBar.open('Error while fetching block details','Undo',{
          duration: 3000,
        });
        console.error('Error occurred while fetching block records: ',err);
      }
    })
  }

  public loadNurseData():void{
    this.nurseService.getAllNurseDetails().subscribe({
      next:(res) => {
        this.nurseData = res;
      },
      error:(err) =>{
        this.snackBar.open('Error while fetching Nurse details','Undo',{
          duration: 3000,
        });
        console.error('Error occurred while fetching Nurse records: ',err);
      }
    })
  }

  public submitForm(){
    if(this.onCallForm.valid){
      const newOnCallRecord = {
        nurseId: this.onCallForm.value.nurseId,
        blockId: this.onCallForm.value.blockId,
        onCallStart: this.onCallForm.value.onCallStart,
        onCallEnd: this.onCallForm.value.onCallEnd
      }
      if(this.isEditting && this.data.onCallId){
        const updatedOnCallrecord = {
          onCallId: this.data.onCallId,
          nurseId: this.onCallForm.value.nurseId,
          blockId: this.onCallForm.value.blockId,
          onCallStart: this.onCallForm.value.onCallStart,
          onCallEnd: this.onCallForm.value.onCallEnd
        }
        this.isEditting = false;
        this.dialogRef.close(updatedOnCallrecord)
      } 
      else{
        this.dialogRef.close(newOnCallRecord);
      }
    }
  }

  public onClose(){
    this.dialogRef.close();
  }
}
