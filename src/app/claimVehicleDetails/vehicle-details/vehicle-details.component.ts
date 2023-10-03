import { AfterContentChecked, Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { Manufacturer } from "../../models/manufacturer";
import { VehicleModels } from "../../models/vehicle-models";
import { VehicleConfigService } from "../../helper/vehicle-config.service";

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit{
  @Input() claimsForm: FormGroup;
  private vehicleCfgSvc = inject(VehicleConfigService);
  private manufacturerSubject = new Subject<number>;
  manufacturerSelectedAction$ = this.manufacturerSubject.asObservable();
  
  lstManufacturer$: Observable<Manufacturer[]>;
  selectedManufacturer:number;

  ngOnInit(): void {
    this.lstManufacturer$ = this.vehicleCfgSvc.GetManufacturers()
                                    .pipe(tap(mf =>{
                                      this.selectedManufacturer = mf[0].id;
                                      this.manufacturerSubject.next(this.selectedManufacturer);
                                    }));
  }

  SelectedManufacturerChanged(): void{
    this.manufacturerSubject.next(this.selectedManufacturer);
  }

  lstVehicleModels$: Observable<VehicleModels[]> = this.manufacturerSelectedAction$.pipe(
    switchMap(manufacturerId => this.vehicleCfgSvc.GetVehicleModels(manufacturerId))
  )
}
