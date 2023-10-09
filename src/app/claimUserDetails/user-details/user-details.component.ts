import { Component, Input, OnInit, inject } from '@angular/core';
import { AddressConfigService } from "../../helper/address-config.service";
import { State } from "../../models/state";
import { Country } from "../../models/country";
import { Observable, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private addrService = inject(AddressConfigService);
  lstCountries$: Observable<Country[]>;
  lstStates$: Observable<State[]>;
  selectedCountry:number;
  selectedState:number;
  @Input() claimsForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.lstCountries$ = this.addrService.GetCountries().pipe(
      tap(countries => {
        this.selectedCountry = countries[0].id
        this.lstStates$ = this.addrService.GetStates(this.selectedCountry);
      })
    );  
  }
}
