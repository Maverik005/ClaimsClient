import { Component, OnInit, inject } from '@angular/core';
import { ClaimContract } from "../../models/claim-contract";
import { ClaimService } from "../services/claim.service";
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
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
  lstClaims$:Observable<ClaimContract[]>;
  lstVehicleModels$: Observable<VehicleModels[]>
  lstManufacturer$: Observable<Manufacturer[]>
  displayCoulmns:string[] = ["claimTitle","firstName","lastName","email","cellPhoneNo","city","vehicleFIN","manufacturerId",
                              "manufacturingDate","kilometersDriven","dateOfPurchase","purchasePrise","actions"];
  
  constructor(public dialog: MatDialog){}
  ngOnInit(): void {
    this.lstClaims$ = this.claimsSvc.lstClaims$
    this.lstManufacturer$ = this.vehicleCfgSvc.GetManufacturers();
  }

  EditClaim(claimObj:any){
    this.relaySvc.Sender(claimObj);
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
