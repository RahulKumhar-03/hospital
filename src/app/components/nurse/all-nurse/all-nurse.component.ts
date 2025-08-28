import { Component, OnInit } from '@angular/core';
import { NurseService } from '../../../core/services/nurse/nurse.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateUpdateNurseDialogComponent } from '../create-update-nurse-dialog/create-update-nurse-dialog.component';
import { Nurse } from '../../../core/interface/nurse.interface';

@Component({
  selector: 'app-all-nurse',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './all-nurse.component.html',
  styleUrl: './all-nurse.component.css'
})
export class AllNurseComponent implements OnInit{
  public nurses: Nurse[] = []
  constructor(private service: NurseService, private dialog: MatDialog){}
  
  ngOnInit():void{
    this.loadNurseDetails();
  }
  public loadNurseDetails():void{
    this.service.getNurses().subscribe({
      next:(response) =>{
        this.nurses = response;
      },
      error:(err) => {
        alert('Error while fetching nurse details!!!');
        console.error('Error while fetching nurse details: ',err)
      }
    })
  }

  public openNurseDialog(nurseData?: Nurse){
    const dialog = this.dialog.open(CreateUpdateNurseDialogComponent,{
      width:'500px',
      data: nurseData
    })
    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.nurseId){
          this.service.updateNurse(data).subscribe({
            next:(response) =>{
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
          this.service.createNurse(data).subscribe({
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

  public deleteNurseRecord(nurseData: Nurse){
    if(confirm('Are you sure? You wanted to delete record!')){
      this.service.deleteNurse(nurseData).subscribe({
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
