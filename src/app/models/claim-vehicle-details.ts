export interface ClaimVehicleDetails {
    id?:number;
    claimsId?:number;
    manufacturerId:number;
    modelId:number;
    vehicleFIN:string;
    manufacturingDate:Date;
    kilometersDriven:number;
    dateOfPurchase:Date;
    purchasePrise:number;
}
