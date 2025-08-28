import { Component} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button';
import { BlockService } from '../../../core/services/blocks/block.service';
import { Block } from '../../../core/interface/block.interface';
import { AddEditBlockDialogComponent } from '../add-edit-block-dialog/add-edit-block-dialog.component';

@Component({
  selector: 'app-all-block',
  imports: [MatTableModule, MatIconModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './all-block.component.html',
  styleUrl: './all-block.component.css'
})
export class AllBlockComponent {
  
  public dataSource = new MatTableDataSource<Block>();
  public displayedColumns: string[] = ['blockCode','blockFloor','action'];

  constructor(private service: BlockService, private dialog: MatDialog, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadBlockDetails()
  }

  public loadBlockDetails(){
    this.service.getBlocks().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error:(err) => {
        alert('Error while fethcing room details');
        console.error('Error while fetching all room details: ',err);
      } 
    })
  }

  public openBlockDialog(blockData?: Block){
    let dialog = this.dialog.open(AddEditBlockDialogComponent,{
      width:'600px',
      data: blockData
    })

    dialog.afterClosed().subscribe(data => {
      if(data){
        if(data.blockId){
          this.service.updateBlock(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Block Details Updated Successfully.')
                this.loadBlockDetails()
              }
            },
            error:(err) => {
              this.snackBar.open('Failed while updating record!!!')
              console.error("Error occurred while updating: ",err)
            }
          })
        }
        else {
          this.service.createBlock(data).subscribe({
            next:(res) => {
              if(res.status){
                this.snackBar.open('Added New Block Record.')
                this.loadBlockDetails()
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

  public deleteBlock(blockData: Block){
    if(confirm('Are You Sure you wnat to delete this record?')){
      this.service.deleteBlock(blockData).subscribe({
        next:(res) => {
          if(res.status){
            this.snackBar.open('Record Deleted Successfully.')
            this.loadBlockDetails()
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
