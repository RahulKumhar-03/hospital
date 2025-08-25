import { Component, OnInit } from '@angular/core';
import { AddRoom, Room } from '../../../interfaces';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../../services/rooms/room.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button';
import { RoomDialogComponent } from '../room-dialog/room-dialog.component';

@Component({
  selector: 'app-all-rooms',
  imports: [MatTableModule, MatIconModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './all-rooms.component.html',
  styleUrl: './all-rooms.component.css'
})
export class AllRoomsComponent implements OnInit {
  dataSource = new MatTableDataSource<Room>();
  displayedColumns: string[] = ['roomNo.','roomType','blockCode','blockFloor','action'];

  constructor(private service: RoomService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadRoomDetails()
  }

  loadRoomDetails(){
    this.service.getAllRoomDetails().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error:(err) => {
        alert('Error while fethcing room details');
        console.error('Error while fetching all room details: ',err);
      } 
    })
  }

  openRoomDialog(roomData?: AddRoom){
    let dialog = this.dialog.open(RoomDialogComponent,{
      width:'600px',
      data: roomData
    })

    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.roomId){
          this.service.updateRoomDetail(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Room Details Updated Successfully.')
                this.loadRoomDetails()
              }
            },
            error:(err) => {
              this.snackBar.open('Failed while updating record!!!')
              console.error("Error occurred while updating: ",err)
            }
          })
        }
        else {
          this.service.createNewRoomRecord(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Added New Room Record.')
                this.loadRoomDetails()
              }
            },
            error:(err) => {
              this.snackBar.open('Failed while creating record!!!')
              console.error("Error occurred while creating: ",err)
            }
          })
        }
      }
    })
  }

  deleteRoom(roomData: AddRoom){
    if(confirm('Are You Sure you wnat to delete this record?')){
      this.service.deleteRoomRecord(roomData).subscribe({
        next:(res) => {
          if(res.status){
            this.snackBar.open('Record Deleted Successfully.')
            this.loadRoomDetails()
          }
        },
        error: (err) => {
          this.snackBar.open('Error while deleting record!')
          console.error('Error occurred while deleting record.')
        }
      })
    }
  }
}
