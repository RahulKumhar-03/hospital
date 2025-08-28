import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../../core/services/rooms/room.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button';
import { RoomDialogComponent } from '../add-edit-room-dialog/add-edit-room-dialog.component';
import { Room } from '../../../core/interface/room.interface';
import { AddRoom } from '../../../core/interface/add-room.interface';

@Component({
  selector: 'app-all-rooms',
  imports: [MatTableModule, MatIconModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './all-rooms.component.html',
  styleUrl: './all-rooms.component.css'
})
export class AllRoomsComponent implements OnInit {
  public dataSource = new MatTableDataSource<Room>();
  public displayedColumns: string[] = ['roomNo.','roomType', 'availability','blockCode','blockFloor','action'];

  constructor(private service: RoomService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadRoomDetails()
  }

  public loadRoomDetails(){
    this.service.getRooms().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error:(err) => {
        alert('Error while fethcing room details');
        console.error('Error while fetching all room details: ',err);
      } 
    })
  }

  public openRoomDialog(roomData?: AddRoom){
    let dialog = this.dialog.open(RoomDialogComponent,{
      width:'600px',
      data: roomData
    })

    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.roomId){
          this.service.updateRoom(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Room Details Updated Successfully.','Undo',{
                  duration:3000
                })
                this.loadRoomDetails()
              }
            },
            error:(err) => {
              this.snackBar.open('Failed while updating record!!!','Undo',{
                duration:3000
              })
              console.error("Error occurred while updating: ",err)
            }
          })
        }
        else {
          this.service.createRoom(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Added New Room Record.','Undo',{
                  duration:3000
                })
                this.loadRoomDetails()
              }
            },
            error:(err) => {
              this.snackBar.open('Failed while creating record!!!','Undo',{
                duration:3000
              })
              console.error("Error occurred while creating: ",err)
            }
          })
        }
      }
    })
  }

  public deleteRoom(roomData: Room){
    const deletingRoom = {
      roomId: roomData.roomId,
      roomNumber: roomData.roomNumber,
      roomType: roomData.roomType,
      blockId: roomData.block.blockId,
      availability: roomData.availability,
    } as AddRoom
    if(confirm('Are You Sure you wnat to delete this record?')){
      this.service.deleteRoom(deletingRoom).subscribe({
        next:(res) => {
          if(res.status){
            this.snackBar.open('Record Deleted Successfully.','Undo',{
              duration:3000
            })
            this.loadRoomDetails()
          }
        },
        error: (err) => {
          this.snackBar.open('Error while deleting record!','Undo',{
            duration:3000
          })
          console.error('Error occurred while deleting record: ',err)
        }
      })
    }
  }
}
