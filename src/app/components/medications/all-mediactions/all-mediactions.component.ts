import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Medication } from '../../../core/interface/medication.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MedicationService } from '../../../core/services/medications/medication.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpsertMedicationsDialogComponent } from '../upsert-medications-dialog/upsert-medications-dialog.component';

@Component({
  selector: 'app-all-mediactions',
  imports: [MatTableModule, MatIconModule, MatSnackBarModule, MatButtonModule, MatDialogModule],
  templateUrl: './all-mediactions.component.html',
  styleUrl: './all-mediactions.component.css'
})
export class AllMediactionsComponent implements OnInit {

  public dataSource = new MatTableDataSource<Medication>();
  public displayedColumns: string[] = ['medicationId', 'medicationName', 'medicationBrand', 'medicationDescription', 'createdDate', 'action'];

  constructor(private medicationService: MedicationService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnInit(): void {
    this.loadMedications();
  }

  public loadMedications(){
    this.medicationService.getMediactions().subscribe({
      next: (res) => {
        if(res){
          this.dataSource.data = res;
        }
      },
      error: (err) => {
        this.snackBar.open('Error while fetching medication details.', 'Undo',{
          duration: 3000,
        })
      }
    })
  }

  public openMedicationDialog(medicationData?: Medication){
    let dialog = this.dialog.open(UpsertMedicationsDialogComponent,{
      width:'600px',
      data: medicationData
    })

    dialog.afterClosed().subscribe(data => {

      if(data){
        if(data.medicationId){
          this.medicationService.updateMedication(data).subscribe({
            next: (res) => {
              if(res.status){
                this.snackBar.open('Medication Details Updated Successfully.','Undo',{
                  duration: 3000,
                });
                this.loadMedications();
              }
            },
            error: (err) => this.snackBar.open('Error while updating medication details!','Undo',{
              duration: 3000,
            })
          })
        } 
        else {
          this.medicationService.createMedication(data).subscribe({
            next: (res) => {
              if(res.status){
                this.snackBar.open('Added New Medication Successfully.','Undo',{
                  duration: 3000,
                });
                this.loadMedications();
              }
            },
            error: (err) => this.snackBar.open('Error while creating medication!','Undo',{
              duration: 3000,
            })
          })
        }
      }
    })
  }

  public deleteMedication(mediactionData: Medication){
    if(confirm('Are You Sure, you want to delete the details?')){
      this.medicationService.deleteMedication(mediactionData).subscribe({
        next: (res) => {
          if(res.status){
            this.snackBar.open('Medication Details Deleted Successfully.','Undo',{ 
              duration: 3000 
            });
            this.loadMedications();
          }
        },
        error: (err) => this.snackBar.open('Error while deleting medication details!','Undo',{
          duration: 3000,
        })
      })
    }
  }
}
