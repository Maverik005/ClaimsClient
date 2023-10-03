import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manufacturer } from "../models/manufacturer";
import { VehicleModels } from "../models/vehicle-models";
import { Observable, shareReplay } from "rxjs";
import { apiConfig } from "../api-config";

@Injectable({
  providedIn: 'root'
})
export class VehicleConfigService {
  private httpClient = inject(HttpClient)
  lstVehicleModels$: Observable<VehicleModels[]>;
  lstManufacturer$: Observable<Manufacturer[]>;

  constructor() { }

  GetManufacturers() {
    if(!this.lstManufacturer$)
      this.lstManufacturer$ = this.httpClient
                                          .get<Manufacturer[]>(apiConfig.Api_Base_Uri + apiConfig.getManufacturers)
                                          .pipe(shareReplay(1));
    return this.lstManufacturer$;
  }
  GetVehicleModels(manufacturerId: number){
    this.lstVehicleModels$ = this.httpClient
                              .get<VehicleModels[]>(apiConfig.Api_Base_Uri + apiConfig.getVehicleModels + "/" + manufacturerId);
    return this.lstVehicleModels$;
  }
}
