import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppointmentService } from '../../../core/services/appointments/appointment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Appointment } from '../../../core/interface/appointment.interface';
import { AddAppointment } from '../../../core/interface/add-appointment.interface';
import { AppointmentDialogComponent } from '../add-edit-appointment-dialog/add-edit-appointment-dialog.component';

@Component({
  selector: 'app-all-appointments',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './all-appointments.component.html',
  styleUrl: './all-appointments.component.css'
})
export class AllAppointmentsComponent {
  public dataSource = new MatTableDataSource<Appointment>();
  public displayedColumns: string[] = ['appointmentId','patientName','physicianName','onCallNurseName','startDate','endDate','action']

  constructor(private service: AppointmentService, private snackBar: MatSnackBar, private dialog: MatDialog){}

  ngOnInit(){
    this.loadAppointmentsDetails();
  }

  public loadAppointmentsDetails(){
    this.service.getAppointments().subscribe({
      next:(res) => {
        this.dataSource.data = res
      },
      error:(err) => {
        this.snackBar.open('Error while fetching appointment records!!!','Undo',{
          duration: 3000,
        })
        console.error('Error occurred while fetching appointment Details: ',err)
      }
    })
  }

  public openAppointmentDialog(appointmentData?: AddAppointment){
    let dialog = this.dialog.open(AppointmentDialogComponent,{
      width:'600px',
      data: appointmentData
    })
    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.appointmentId){
          this.service.updateAppointment(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Appointment Record updated successfully.','Undo',{
                  duration: 3000,
                })
                this.loadAppointmentsDetails();
              }
            },
            error:(err) => {
              this.snackBar.open('Error while updating appointment records!!!','Undo',{
                duration: 3000,
              })
              console.error('Error occurred while updating record!!!: ',err);
            }
          })
        }
        else{
          this.service.createAppointment(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Appointment Record created successfully.','Undo',{
                  duration: 3000,
                })
                this.loadAppointmentsDetails();
              }
            },
            error:(err) => {
              this.snackBar.open('Error while creating new appointment records!!!','Undo',{
                duration: 3000,
              })
              console.error('Error occurred while creating record!!!: ',err);
            }
          })
        }
      }
    })
  }

  public deleteAppointmentRecord(appointmentData: Appointment){
    const deletingRecord = {
      appointmentId: appointmentData.appointmentId,
      patientId: appointmentData.patient.patientId!,
      physicianId: appointmentData.physician.physicianId!,
      onCallId: appointmentData.prepNurse.onCallId!,
      startDateTime: appointmentData.starDateTime,
      endDateTime: appointmentData.endDateTime,
    }
    console.log(deletingRecord);
    
    if(confirm('Are You Sure, you want to delete record?')){
      this.service.deleteAppointment(deletingRecord).subscribe({
        next:(res) => {
          if(res.status){
            this.snackBar.open('Appointment Record deleted Successfully.','Undo',{
              duration: 3000,
            })
            this.loadAppointmentsDetails();
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
