import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from "../models/state";
import { Country } from "../models/country";
import { Observable, shareReplay } from "rxjs";
import { apiConfig } from "../api-config";

@Injectable({
  providedIn: 'root'
})
export class AddressConfigService {
  lstStates$: Observable<State[]>;
  lstCountries$: Observable<Country[]>
  private httpClient = inject(HttpClient)
  constructor() { }

  GetStates(countryId:number): Observable<State[]> {
    if(!this.lstStates$)
      this.lstStates$ = this.httpClient.get<State[]>(apiConfig.Api_Base_Uri + apiConfig.getStates + "/" + countryId).pipe(
        shareReplay(1)
      )
    return this.lstStates$;
  }

  GetCountries(): Observable<Country[]> {
    if(!this.lstCountries$)
      this.lstCountries$ = this.httpClient.get<Country[]>(apiConfig.Api_Base_Uri + apiConfig.getCountries).pipe(
        shareReplay(1)
      );
    return this.lstCountries$;
  }

}
