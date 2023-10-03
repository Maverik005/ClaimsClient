import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss']
})
export class ClaimDetailsComponent implements OnInit {
  claimsForm = this._formBuilder.group({
    userDetails: new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      cellPhoneNo: new FormControl(null, Validators.required),
      houseNo: new FormControl(null, Validators.required),
      streetName: new FormControl(null, Validators.required),
      pincode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
    }),
    vehicleDetails: new FormGroup({
      vehicleFIN: new FormControl(null,Validators.required),
      manufacturer: new FormControl(null,Validators.required),
      vehicleModel:new FormControl(null,Validators.required),
      manufacturingDate: new FormControl(null,Validators.required),
      kilometersDriven: new FormControl(null,Validators.required),
      dateOfPurchase: new FormControl(null,Validators.required),
      purchasePrise: new FormControl(null,Validators.required),
    })
  })

  constructor(private _formBuilder:FormBuilder){}
  ngOnInit(): void {
     
  }

}
