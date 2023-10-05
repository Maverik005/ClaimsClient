import { Component, Input, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransformModelService } from "../../helper/transform-model.service";
import { ClaimContract } from "../../models/claim-contract";
import { ClaimService } from "../services/claim.service";
import { Observable, Subscription } from 'rxjs';
import { ClaimRelayService } from "../../helper/claim-relay.service";
import { State } from "../../models/state";
import { Country } from "../../models/country";

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent {
  @Input() claimsForm: FormGroup;
  private relaySvc = inject(ClaimRelayService);
  lstCountries$: Observable<Country[]>;
  lstStates$: Observable<State[]>;
  relaySubscription:Subscription;
  private xModelService = inject(TransformModelService)
  private claimSvc = inject(ClaimService);
  claimDataObj: ClaimContract;
  originalClaim: ClaimContract;
  editMode = false;

  constructor(){
    this.relaySubscription = this.relaySvc.Receiver().subscribe(relayObj=> {
      if(relayObj){
        this.editMode = relayObj.editMode;
        this.originalClaim = relayObj.value as ClaimContract;
      }
   });
  }
  SaveClaim() {
    var claimData = this.claimsForm.value;
    this.claimDataObj = this.xModelService.TransformObject(claimData);
    this.claimSvc.AddClaim(this.claimDataObj).subscribe(res => console.log(res));
  }

  UpdateClaim() {
    var claimData = this.claimsForm.value;
    this.claimDataObj = this.xModelService.TransformObject(claimData);
    this.claimDataObj.claimTitle = this.originalClaim.claimTitle;
    this.claimDataObj.id = this.originalClaim.id;
    this.claimDataObj.vehicleId = this.originalClaim.vehicleId;
    this.claimDataObj.userId = this.originalClaim.userId;
    this.claimSvc.UpdateClaim(this.claimDataObj).subscribe(res => console.log(res));
  }
}
