import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OnCallService } from '../../../core/services/onCall/on-call.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddEditOnCallDialogComponent } from '../add-edit-on-call-dialog/add-edit-on-call-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { OnCall } from '../../../core/interface/on-call.interface';
import { AddOnCall } from '../../../core/interface/add-on-call.interface';

@Component({
  selector: 'app-all-on-calls',
  imports: [MatTableModule,MatDialogModule, MatIconModule,MatSnackBarModule, MatButtonModule],
  templateUrl: './all-on-calls.component.html',
  styleUrl: './all-on-calls.component.css'
})
export class AllOnCallsComponent implements OnInit {
  public dataSource = new MatTableDataSource<OnCall>();
  public displayedColumns: string[] = ['nurseId','nurseName','blockId','blockFloor','blockCode','onCallStart','onCallEnd','action']

  constructor(private service: OnCallService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnInit(){
    this.loadOnCallDetails();
  }

  public loadOnCallDetails(){
    this.service.getOnCalls().subscribe({
      next:(res) => {
        this.dataSource.data = res
      },
      error:(err) => {
        this.snackBar.open('Error while fetching onCall records!!!','Undo',{
          duration: 3000,
        })
        console.error('Error occurred while fetching onCall Details: ',err)
      }
    })
  }

  public openOnCallDialog(onCallData?: AddOnCall ){
    let dialog = this.dialog.open(AddEditOnCallDialogComponent,{
      width:'600px',
      data: onCallData
    })
    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.onCallId){
          this.service.updateOnCall(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('OnCall Record updated successfully.','Undo',{
                  duration: 3000,
                })
                this.loadOnCallDetails();
              }
            },
            error:(err) => {
              this.snackBar.open('Error while updating onCall records!!!','Undo',{
                duration: 3000,
              })
              console.error('Error occurred while updating record!!!: ',err);
            }
          })
        }
        else{
          this.service.createOnCall(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('OnCall Record created successfully.','Undo',{
                  duration: 3000,
                })
                this.loadOnCallDetails();
              }
            },
            error:(err) => {
              this.snackBar.open('Error while creating new onCall records!!!','Undo',{
                duration: 3000,
              })
              console.error('Error occurred while creating record!!!: ',err);
            }
          })
        }
      }
    })
  }

  public deleteOnCallRecord(onCallData: OnCall){
    const deletingRecord = {
      onCallId: onCallData.onCallId,
      nurseId: onCallData.nurse.nurseId!,
      blockId:onCallData.block.blockId,
      onCallStart: onCallData.onCallStart,
      onCallEnd: onCallData.onCallEnd,
    }
    if(confirm('Are You Sure, you want to delete record?')){
      this.service.deleteOnCall(deletingRecord).subscribe({
        next:(res) => {
          if(res.status){
            this.snackBar.open('OnCall Record deleted Successfully.','Undo',{
              duration: 3000,
            })
            this.loadOnCallDetails();
          }
        },
        error:(err) => {
          this.snackBar.open('Error while deleting record!!!','Undo',{
            duration: 3000,
          });
          console.error('Error while deleting record: ',err);
        }
      })
    }
  }
}
