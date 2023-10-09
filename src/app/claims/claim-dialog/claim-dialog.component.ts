import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ClaimService } from "../services/claim.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-claim-dialog',
  templateUrl: './claim-dialog.component.html',
  styleUrls: ['./claim-dialog.component.scss']
})
export class ClaimDialogComponent {
  claimId:number;
  private claimsSvc = inject(ClaimService);
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<ClaimDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _snackBar: MatSnackBar) {
    this.claimId = data
  }
  DeleteClaim(){
    this.claimsSvc.DeleteClaim(this.claimId).subscribe(res=> this.dialogRef.close(res),
      error=>{
        if(error.status === 403){
          this._snackBar.open("You are not authorized!","Error", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration:5000
          })
        } 
        else
            this._snackBar.open("Application error. Sorry for the incovenience.","Error", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration:5000
            })

        this.dialogRef.close(error)
      }
    );
  }
}
