import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddOnCall, OnCall } from '../../../interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OnCallService } from '../../../services/onCall/on-call.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OnCallDialogComponent } from '../on-call-dialog/on-call-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-all-on-calls',
  imports: [MatTableModule,MatDialogModule, MatIconModule,MatSnackBarModule, MatButtonModule],
  templateUrl: './all-on-calls.component.html',
  styleUrl: './all-on-calls.component.css'
})
export class AllOnCallsComponent implements OnInit {
  dataSource = new MatTableDataSource<OnCall>();
  displayedColumns: string[] = ['nurseId','nurseName','blockId','blockFloor','blockCode','onCallStart','onCallEnd','action']

  constructor(private service: OnCallService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnInit(){
    this.loadOnCallDetails();
  }

  loadOnCallDetails(){
    this.service.getAllOnCallDetails().subscribe({
      next:(res) => {
        this.dataSource.data = res
      },
      error:(err) => {
        alert('Error occurred while fetching onCall Details')
        console.error('Error occurred while fetching onCall Details: ',err)
      }
    })
  }

  openOnCallDialog(onCallData?: AddOnCall){
    let dialog = this.dialog.open(OnCallDialogComponent,{
      width:'600px',
      data: onCallData
    })
  }

  deleteOnCallRecord(onCallData: AddOnCall){
    if(confirm('Are You Sure, you want to delete record?')){
      this.service.deleteOnCallRecord(onCallData).subscribe({
        next:(res) => {
          if(res.status){
            this.snackBar.open('OnCall Record deleted Successfully.')
            this.loadOnCallDetails();
          }
        },
        error:(err) => {
          this.snackBar.open('Error while deleting record!!!');
          console.error('Error while deleting record: ',err);
        }
      })
    }
  }
}
