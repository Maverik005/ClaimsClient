import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClaimContract } from 'src/app/models/claim-contract';
import { ClaimRelayService } from "../../helper/claim-relay.service";
@Component({
  selector: 'app-claim-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss']
})
export class ClaimDetailsComponent implements OnInit, OnDestroy{
  private relaySvc = inject(ClaimRelayService);
  relaySubscription:Subscription;
  claimFormObj:any;
  claimsForm: FormGroup;
  
  constructor(private _formBuilder:FormBuilder ){
    this.relaySubscription = this.relaySvc.Receiver()
    .subscribe(relayObj=> {
      if(relayObj)
        this.claimFormObj = relayObj.value as ClaimContract;
   });
  }
  ngOnDestroy(): void {
    this.relaySubscription.unsubscribe();
    this.relaySvc.relayMessage.next({value:{},editMode:false});
  }
  ngOnInit(): void {
    this.claimsForm = this._formBuilder.group({
      userDetails: new FormGroup({
        claimtitle:new FormControl(this.claimFormObj.claimTitle,Validators.required), 
        firstName: new FormControl(this.claimFormObj.firstName,Validators.required),
        lastName: new FormControl(this.claimFormObj.lastName,Validators.required),
        email: new FormControl(this.claimFormObj.email,Validators.required),
        cellPhoneNo: new FormControl(this.claimFormObj.cellPhoneNo, Validators.required),
        houseNo: new FormControl(this.claimFormObj.houseNo, Validators.required),
        streetName: new FormControl(this.claimFormObj.streetName, Validators.required),
        pincode: new FormControl(this.claimFormObj.pincode, Validators.required),
        city: new FormControl(this.claimFormObj.city, Validators.required),
        state: new FormControl(this.claimFormObj.stateId, Validators.required),
        country: new FormControl(this.claimFormObj.countryId, Validators.required),
      }),
      vehicleDetails: new FormGroup({
        vehicleFIN: new FormControl(this.claimFormObj.vehicleFIN,Validators.required),
        manufacturer: new FormControl(this.claimFormObj.manufacturerId,Validators.required),
        vehicleModel:new FormControl(this.claimFormObj.modelId,Validators.required),
        manufacturingDate: new FormControl(this.claimFormObj.manufacturingDate,Validators.required),
        kilometersDriven: new FormControl(this.claimFormObj.kilometersDriven,Validators.required),
        dateOfPurchase: new FormControl(this.claimFormObj.dateOfPurchase,Validators.required),
        purchasePrise: new FormControl(this.claimFormObj.purchasePrise,Validators.required),
      })
    })
  }
}
