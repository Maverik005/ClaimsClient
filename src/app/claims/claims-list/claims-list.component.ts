import { Component, OnInit, inject } from '@angular/core';
import { ClaimContract } from "../../models/claim-contract";
import { ClaimService } from "../services/claim.service";
import { Observable, Subscription, tap } from 'rxjs';
import { ClaimRelayService } from "../../helper/claim-relay.service";
import { Manufacturer } from "../../models/manufacturer";
import { VehicleModels } from "../../models/vehicle-models";
import { VehicleConfigService } from "../../helper/vehicle-config.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClaimDialogComponent } from "../claim-dialog/claim-dialog.component";

@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.scss']
})
export class ClaimsListComponent implements OnInit{
  private claimsSvc = inject(ClaimService);
  private relaySvc = inject(ClaimRelayService);
  private vehicleCfgSvc = inject(VehicleConfigService);
  claimEditMode = false;
  newClaim:ClaimContract;
  lstClaims$:Observable<ClaimContract[]>;
  lstVehicleModels$: Observable<VehicleModels[]>
  lstManufacturer$: Observable<Manufacturer[]>
  relaySubscription:Subscription;
  displayCoulmns:string[] = ["claimTitle","firstName","lastName","email","cellPhoneNo","city","vehicleFIN","manufacturerId",
                              "manufacturingDate","kilometersDriven","dateOfPurchase","purchasePrise","actions"];
  
  constructor(public dialog: MatDialog){
    this.relaySubscription = this.relaySvc.Receiver().subscribe(relayObj=> {
      if(relayObj){
        this.newClaim = relayObj.value as ClaimContract;
        this.claimEditMode = relayObj.editMode as boolean;
        if(this.lstClaims$){
          this.lstClaims$.pipe(
            tap(claims =>{ 
              if(!this.claimEditMode)
                claims.push(this.newClaim)
              else{
                claims.map( claim => 
                  claim.id === this.newClaim.id ? {...claims, ...this.newClaim}:claim
                );
              }
            })
          )
        }
      }
    });
  }
  ngOnInit(): void {
    this.lstClaims$ = this.claimsSvc.lstClaims$
    this.lstManufacturer$ = this.vehicleCfgSvc.GetManufacturers();
    
  }

  EditClaim(claimObj:any){
    this.relaySvc.Sender(claimObj, true);
  }

  GetVehicleModel(manufacturerId: number): Observable<VehicleModels[]>{
    this.lstVehicleModels$ = this.vehicleCfgSvc.GetVehicleModels(manufacturerId);
    return this.lstVehicleModels$;
  }

  openDialog(claimId:number,enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef: MatDialogRef<ClaimDialogComponent> = this.dialog.open(ClaimDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:claimId
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lstClaims$ = this.claimsSvc.lstClaims$.pipe(
          tap(claimsList => {
            const index = claimsList.findIndex(cl=>cl.id === claimId)
            claimsList.splice(index,1);
          })
        );
      }
  });
  }
}
