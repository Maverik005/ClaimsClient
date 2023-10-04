import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ClaimService } from "../services/claim.service";

@Component({
  selector: 'app-claim-dialog',
  templateUrl: './claim-dialog.component.html',
  styleUrls: ['./claim-dialog.component.scss']
})
export class ClaimDialogComponent {
  claimId:number;
  private claimsSvc = inject(ClaimService);

  constructor(public dialogRef: MatDialogRef<ClaimDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.claimId = data
    console.log(this.claimId);
  }
  DeleteClaim(){
    this.claimsSvc.DeleteClaim(this.claimId).subscribe(res=> this.dialogRef.close(res));
  }
}
