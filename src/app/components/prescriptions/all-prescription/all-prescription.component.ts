import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Prescription } from '../../../core/interface/prescription.interface';
import { PrescriptionService } from '../../../core/services/prescriptions/prescription.service';
import { UpsertPrescriptionsDialogComponent } from '../upsert-prescriptions-dialog/upsert-prescriptions-dialog.component';
import { AddPrescription } from '../../../core/interface/add-prescription.interface';

@Component({
  selector: 'app-all-prescription',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatSnackBarModule, MatTableModule],
  templateUrl: './all-prescription.component.html',
  styleUrl: './all-prescription.component.css'
})
export class AllPrescriptionComponent implements OnInit {

  public dataSource = new MatTableDataSource<Prescription>();
  public displayedColumns: string[] = ['prescribedId', 'patientName','patientPhone', 'physicianName', 'appointmentDate', 'medicationName', 'action'];
  
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private service: PrescriptionService){}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  public loadPrescriptions(){
    this.service.getPrescriptions().subscribe({
      next: (res) => {
        if(res){
          this.dataSource.data = res;
        }
      }, 
      error: (err) => {
        this.snackBar.open('Error while fetching prescription details!','Undo',{ duration: 3000 });
      }
    })
  }

  public openPrescriptionDialog(prescriptionData?: Prescription){
    let dialog = this.dialog.open(UpsertPrescriptionsDialogComponent,{
      width: '600px',
      data: prescriptionData
    })

    dialog.afterClosed().subscribe(inComingData => {

      if(inComingData){
        if(inComingData.id){
          this.service.updatePrescription(inComingData).subscribe({
            next: (res) => {
              if(res.status){
                this.snackBar.open('Record Updated Successfully.','Undo',{ duration: 3000 });
              }
              this.loadPrescriptions();
            },
            error:() => this.snackBar.open('Error while updating!','Undo',{ duration: 3000 })
          })
        }
        else {
          this.service.createPrescription(inComingData).subscribe({
            next: (res) => {
              if(res.status){
                this.snackBar.open('Record Created Successfully.','Undo',{ duration: 3000 });
              }
              this.loadPrescriptions();
            },
            error:() => this.snackBar.open('Error while creating new record!','Undo',{ duration: 3000 })
          })
        }
      }
    })
  }

  public deletePrescription(prescriptionData: Prescription){
    const deletingRecord = {
      id: prescriptionData.prescribedId,
      physician: prescriptionData.physician.physicianId,
      patient: prescriptionData.patientId,
      medication: prescriptionData.medication.medicationId,
      date: prescriptionData.createdOn,
      dose: prescriptionData.dose
    } as AddPrescription;
    this.service.deletePrescription(deletingRecord).subscribe({
      next: (res) => {
        if(res.status){
          this.snackBar.open('Deleted Successfully.','Undo',{ duration: 3000 });
          this.loadPrescriptions();
        }
      },
      error: (err) => this.snackBar.open('Error while deleting','Undo',{ duration: 3000 })
    })
  }
}
