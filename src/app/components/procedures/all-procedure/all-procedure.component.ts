import { Component, OnInit } from '@angular/core';
import { ProcedureService } from '../../../core/services/procedure/procedure.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ProcedureDialogComponent } from '../create-update-procedure-dialog/create-update-procedure-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { Procedure } from '../../../core/interface/procedure.interface';
@Component({
  selector: 'app-all-procedure',
  imports: [MatTableModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './all-procedure.component.html',
  styleUrl: './all-procedure.component.css'
})
export class AllProcedureComponent implements OnInit {
  public procedures: Procedure[] = []
  public dataSource = new MatTableDataSource<Procedure>();
  public displayedColumns: string[] = ['name', 'cost', 'action'];

  constructor(private service: ProcedureService, private dialog: MatDialog){}

  ngOnInit():void{
    this.loadProcedures();
  }

  public loadProcedures(){
    this.service.getProcedures().subscribe({
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

  public openProcedureDialog(procedureData?: Procedure){
    let dialog = this.dialog.open(ProcedureDialogComponent,{
      width: '600px',
      data: procedureData
    })

    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.procedureId){
          this.service.updateProcedure(data).subscribe({
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
          this.service.createProcedure(data).subscribe({
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

  public deleteProcedure(procedureData: Procedure){
    this.service.deleteProcedure(procedureData).subscribe({
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
