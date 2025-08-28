import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PatientService } from '../../../core/services/patient/patient.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdatePatientDialogComponent } from '../create-update-patient-dialog/create-update-patient-dialog.component';
import { Patient } from '../../../core/interface/patient.interface';

@Component({
  selector: 'app-all-patient',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './all-patient.component.html',
  styleUrl: './all-patient.component.css',
})
export class AllPatientComponent implements OnInit {
  public patients: Patient[] = [];

  constructor(
    private service: PatientService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPatientRecords();
  }
  public loadPatientRecords() {
    this.service.getPatient().subscribe({
      next: (res) => {
        this.patients = res;
      },
      error: (err) => {
        this.snackBar.open('Error while fetching patient records!!!', 'Undo', {
          duration: 3000,
        });
        console.error('Error while fetching patient records: ', err);
      },
    });
  }

  public openPatientDialog(patientData?: Patient) {
    let dialog = this.dialog.open(CreateUpdatePatientDialogComponent, {
      width: '600px',
      data: patientData,
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        if (data.patientId) {
          this.service.updatePatient(data).subscribe({
            next: (response) => {
              if (response.status) {
                this.snackBar.open(
                  'Patient Record Updated Successfully',
                  'Undo',
                  {
                    duration: 3000,
                  }
                );
                this.loadPatientRecords();
              }
            },
            error: (err) => {
              this.snackBar.open(
                'Error while updating patient records!!!',
                'Undo',
                {
                  duration: 3000,
                }
              );
              console.error(
                'Error occured while updating patient details: ',
                err
              );
            },
          });
        } else {
          this.service.createPatient(data).subscribe({
            next: (response) => {
              if (response.status) {
                this.snackBar.open(
                  'Patient record successfully created.',
                  'Undo',
                  {
                    duration: 3000,
                  }
                );
                this.loadPatientRecords();
              }
            },
            error: (err) => {
              this.snackBar.open(
                'Error while creating Patient Detail',
                'Undo',
                {
                  duration: 3000,
                }
              );
              console.error('Error while creating patient record: ', err);
            },
          });
        }
      }
    });
  }

  public deletepatient(patient: Patient) {
    if(confirm('Are you sure? You wanted to delete record!')){
      this.service.deletePatient(patient).subscribe({
        next:(response) =>{
          if(response.status){
            this.snackBar.open('Patient Record Deleted Successfully.', 'Undo', {
              duration: 3000, 
            });
            this.loadPatientRecords();
          }
        }
      })
    }
  }
}
