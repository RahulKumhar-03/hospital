import { Component, OnInit } from '@angular/core';
import { ProcedureService } from '../../../services/procedure/procedure.service';
import { MatDialog } from '@angular/material/dialog';
import { Procedure } from '../../../interfaces';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ProcedureDialogComponent } from '../procedure-dialog/procedure-dialog.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-all-procedure',
  imports: [MatTableModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './all-procedure.component.html',
  styleUrl: './all-procedure.component.css'
})
export class AllProcedureComponent implements OnInit {
  procedures: Procedure[] = []
  dataSource = new MatTableDataSource<Procedure>();
  displayedColumns: string[] = ['name', 'cost', 'action'];

  constructor(private service: ProcedureService, private dialog: MatDialog){}

  ngOnInit():void{
    this.loadProcedures();
  }

  loadProcedures(){
    this.service.getAllProcedures().subscribe({
      next:(response) => {
        this.procedures = response;
        this.dataSource.data = this.procedures
      },
      error:(err) => {
        alert("Error while fetching procedure records")
        console.error("Error occurred while fetching procedure records: ", err);
      }
    })
  }

  openProcedureDialog(procedureData?: Procedure){
    let dialog = this.dialog.open(ProcedureDialogComponent,{
      width: '600px',
      data: procedureData
    })

    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.procedureId){
          this.service.updateProcedureRecord(data).subscribe({
            next:(res) => {
              if(res.status){
                alert('Procedure Record Updated Successfully.');
                this.loadProcedures()
              }
            },
            error: (err) => {
              alert('Error while updating procedure record');
              console.error('Error while updating procedure record: ',err)
            }
          })
        } 
        else {
          this.service.createNewProcedureRecord(data).subscribe({
            next:(res) => {
              if(res.status){
                alert('Added new Procedure Record.');
                this.loadProcedures()
              }
            },
            error: (err) => {
              alert('Error while creating new procedure record');
              console.error('Error while creating new procedure record: ',err)
            }
          })
        }
      }
    })
  }

  deleteProcedure(procedureData: Procedure){
    this.service.deleteProcedureRecord(procedureData).subscribe({
      next: (response) => {
        if(response.status){
          alert('Procedure Record Deleted Successfully.')
          this.loadProcedures();
        }
      },
      error:(err) => {
        alert('Error while deleting procedure record!!!');
        console.error("Error in deleting procedure: ",err);
      }
    })
  }
}
