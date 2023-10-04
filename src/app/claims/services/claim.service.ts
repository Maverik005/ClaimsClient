import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { apiConfig } from "../../api-config";
import { ClaimContract } from 'src/app/models/claim-contract';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private httpClient = inject(HttpClient)
  
  constructor() { }

  AddClaim(claimData: ClaimContract) {
    return this.httpClient.post(apiConfig.Api_Base_Uri + apiConfig.addClaim, claimData);
  }

  lstClaims$:Observable<ClaimContract[]> = this.httpClient.get<ClaimContract[]>(apiConfig.Api_Base_Uri + apiConfig.getAllClaims);

  DeleteClaim(claimId:number){
    return this.httpClient.delete(apiConfig.Api_Base_Uri + apiConfig.deleteClaim + "/" + claimId);
  }

  UpdateClaim(claimData: ClaimContract){
    return this.httpClient.post(apiConfig.Api_Base_Uri + apiConfig.updateClaim, claimData);
  }
}
