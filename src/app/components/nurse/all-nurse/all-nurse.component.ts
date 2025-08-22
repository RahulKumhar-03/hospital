import { Component, OnInit } from '@angular/core';
import { Nurse } from '../../../interfaces';
import { NurseService } from '../../../services/nurse/nurse.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateUpdateNurseComponent } from '../create-update-nurse/create-update-nurse.component';

@Component({
  selector: 'app-all-nurse',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './all-nurse.component.html',
  styleUrl: './all-nurse.component.css'
})
export class AllNurseComponent implements OnInit{
  nurses: Nurse[] = []
  constructor(private service: NurseService, private dialog: MatDialog){}
  
  ngOnInit():void{
    this.loadNurseDetails();
  }
  loadNurseDetails():void{
    this.service.getAllNurseDetails().subscribe({
      next:(response) =>{
        this.nurses = response;
      },
      error:(err) => {
        alert('Error while fetching nurse details!!!');
        console.error('Error while fetching nurse details: ',err)
      }
    })
  }

  openNurseDialog(nurseData?: Nurse){
    const dialog = this.dialog.open(CreateUpdateNurseComponent,{
      width:'500px',
      data: nurseData
    })
    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.nurseId){
          this.service.updateNurseDetails(data).subscribe({
            next:(response) =>{
              console.log(response.status);
              if(response.status){
                alert('Nurse Details updated successfully')
                this.loadNurseDetails();
              }
            },
            error:(err)=>{
              alert('Error while updating nurse details')
              console.error('Error occured while updating nurse details: ',err);
            }
          })
        } else {
          this.service.createNewNurse(data).subscribe({
            next: (response) => {
              if(response.status){
                alert('New Nurse Added successfully');
                this.loadNurseDetails();
              }
            },
            error: (err) => {
              alert('Error while creating new nurse record');
              console.error('Error while creating nurse record: ',err)
            }
          })
        }
      }
    })
  }

  deleteNurseRecord(nurseData: Nurse){
    if(confirm('Are you sure? You wanted to delete record!')){
      this.service.deleteNurseRecord(nurseData).subscribe({
        next:(response) => {
          if(response.status){
            alert('Nurse Record deleted successfully');
            this.loadNurseDetails()
          }
        },
        error: (err) => {
          alert('Error occurred while deleting nurse record!!!');
          console.error('Error while deleting nurse record: ',err)
        }
      })
    }
  }
}
