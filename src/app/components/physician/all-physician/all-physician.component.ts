import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatChipsModule } from '@angular/material/chips'
import { PhysicianService } from '../../../services/physician/physician.service';
import { Physician, PhysicianCreate} from '../../../interfaces';
import { CreateUpdatePhysicianComponent } from '../create-update-physician/create-update-physician.component';
import { MatInput } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-all-physician',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatChipsModule, MatInput, MatFormFieldModule, MatSnackBarModule],
  templateUrl: './all-physician.component.html',
  styleUrl: './all-physician.component.css'
})
export class AllPhysicianComponent implements OnInit {
  physicians: Physician[] = []
  searchedTerm: string = ''
  filteredPhysicians: Physician[] = [] 
  constructor(private service: PhysicianService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  ngOnInit():void{
    this.loadAllPhysicians();
  }
  loadAllPhysicians(){
    this.service.getAllPhysicians().subscribe({
      next:(response) => {
        this.physicians = response,
        this.filteredPhysicians = response
      },
      error: (err) => {
        alert('Error while fetching physicians details!!!')
        console.error("Error occured while fethcing physicians details: ",err);
      }
    })
  }

  searchPhysician(event: Event){
    const searchedInput = event.target as HTMLInputElement
    this.searchedTerm = searchedInput.value
    this.filteredPhysicians = this.physicians.filter(physician => physician.name.toLowerCase().includes(this.searchedTerm.toLowerCase()));
  }

  openPhysicianDialog(physicianData?: Physician):void{
    let dialog = this.dialog.open(CreateUpdatePhysicianComponent,{
      width:'500px',
      data: physicianData
    })
    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.physicianId){
          this.service.updatePhysicianDetails(data).subscribe({
            next:(response) =>{
              if(response.status){
                alert('Physician Details updated successfully')
                this.loadAllPhysicians();
              }
            },
            error:(err)=>{
              alert('Error while updating physician details')
              console.error('Error occured while updating physician details: ',err);
            }
          })
        } else {
          this.service.createNewPhysician(data).subscribe({
            next: (response) => {
              if(response.status){
                alert('New Physician Added successfully');
                this.loadAllPhysicians();
              }
            },
            error: (err) => {
              this.snackBar.open('Error while updating Physician Detail', 'Undo', {
                duration: 3000, 
              });
              console.error('Error while creating physician record: ',err)
            }
          })
        }
      }
    })
  }
  deletePhysician(physicianData: PhysicianCreate){
    if(confirm('Are you sure? You wanted to delete record!')){
      this.service.deletePhysician(physicianData).subscribe({
        next:(response) =>{
          if(response.status === true){
            this.snackBar.open('Physician Record Deleted Successfully.', 'Undo', {
              duration: 3000, 
            });
            this.loadAllPhysicians();
          }
        }
      })
    }
  }
}
