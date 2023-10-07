import { Component, Input, OnDestroy, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransformModelService } from "../../helper/transform-model.service";
import { ClaimContract } from "../../models/claim-contract";
import { ClaimService } from "../services/claim.service";
import { Observable, Subscription } from 'rxjs';
import { ClaimRelayService } from "../../helper/claim-relay.service";
import { State } from "../../models/state";
import { Country } from "../../models/country";
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent implements OnDestroy {
  @Input() claimsForm: FormGroup;
  private relaySvc = inject(ClaimRelayService);
  private router = inject(Router)
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
  ngOnDestroy(): void {
    this.relaySubscription.unsubscribe();
  }
  SaveClaim() {
    var claimData = this.claimsForm.value;
    let loggedInUser= "";
    this.claimDataObj = this.xModelService.TransformObject(claimData);
    if(sessionStorage.length > 0){
      let sessionObj = sessionStorage.getItem("authResponse")?.toString() || "";
      loggedInUser = JSON.parse(sessionObj).account.username;
    }
    this.claimDataObj.claimManager = loggedInUser;
    this.claimSvc.AddClaim(this.claimDataObj).subscribe(res =>{ 
      this.claimDataObj.id = +res
      this.relaySvc.Sender(this.claimDataObj,false);
      this.router.navigate(['master/claims']);
    });  }

  UpdateClaim() {
    var claimData = this.claimsForm.value;
    this.claimDataObj = this.xModelService.TransformObject(claimData);
    this.claimDataObj.claimTitle = this.originalClaim.claimTitle;
    this.claimDataObj.id = this.originalClaim.id;
    this.claimDataObj.vehicleId = this.originalClaim.vehicleId;
    this.claimDataObj.userId = this.originalClaim.userId;
    console.log(this.claimDataObj)
    this.claimSvc.UpdateClaim(this.claimDataObj).subscribe(() => {
      console.log(this.claimDataObj)
      this.relaySvc.Sender(this.claimDataObj,true);
      this.router.navigate(['master/claims']);
    });
  }
}
