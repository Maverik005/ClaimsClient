import { Injectable } from '@angular/core';
import { ClaimContract } from "../models/claim-contract";

@Injectable({
  providedIn: 'root'
})
export class TransformModelService {
  xClaim = {} as ClaimContract;

  constructor() { }

  TransformObject(claimObj:any):ClaimContract{
    this.xClaim.claimTypeId = 1;
    this.xClaim.claimTitle = "Auto Generated"
    //User Info
    this.xClaim.firstName = claimObj.userDetails.firstName;
    this.xClaim.lastName = claimObj.userDetails.lastName;
    this.xClaim.email = claimObj.userDetails.email;
    this.xClaim.cellPhoneNo = claimObj.userDetails.cellPhoneNo;
    this.xClaim.houseNo = claimObj.userDetails.houseNo;
    this.xClaim.streetName = claimObj.userDetails.streetName;
    this.xClaim.city = claimObj.userDetails.city;
    this.xClaim.stateId = claimObj.userDetails.state;
    this.xClaim.countryId = claimObj.userDetails.country;
    //Vehicle Info
    this.xClaim.manufacturerId = claimObj.vehicleDetails.manufacturer;
    this.xClaim.modelId = claimObj.vehicleDetails.vehicleModel;
    this.xClaim.manufacturingDate = claimObj.vehicleDetails.manufacturingDate;
    this.xClaim.dateOfPurchase = claimObj.vehicleDetails.dateOfPurchase;
    this.xClaim.kilometersDriven = claimObj.vehicleDetails.kilometersDriven;
    this.xClaim.purchasePrise = claimObj.vehicleDetails.purchasePrise;
    this.xClaim.vehicleFIN = claimObj.vehicleDetails.vehicleFIN;

    return this.xClaim;
  }

}
