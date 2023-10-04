import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
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
  private manufacturerSubject = new BehaviorSubject<number>(0);
  manufacturerSelectedAction$ = this.manufacturerSubject.asObservable();
  
  lstManufacturer$: Observable<Manufacturer[]>;
  selectedManufacturer:number;
  selectedModel:number;

  
  ngOnInit(): void {
    this.lstManufacturer$ = this.vehicleCfgSvc.GetManufacturers()
                            .pipe(tap(mf =>{
                              if(this.claimsForm.get("vehicleDetails")?.get("manufacturer")?.value)
                                this.selectedManufacturer = this.claimsForm.get("vehicleDetails")?.get("manufacturer")?.value
                              else
                                this.selectedManufacturer = mf[0].id;

                              this.manufacturerSubject.next(this.selectedManufacturer);
                              if(this.claimsForm.get("vehicleDetails")?.get("vehicleModel")?.value)
                                this.selectedModel = this.claimsForm.get("vehicleDetails")?.get("vehicleModel")?.value;
                            }));
  }

  SelectedManufacturerChanged(): void{
    this.manufacturerSubject.next(this.selectedManufacturer);
  }

  lstVehicleModels$: Observable<VehicleModels[]> = this.manufacturerSelectedAction$.pipe(
    tap(mf => console.log(mf)),
    switchMap(manufacturerId => this.vehicleCfgSvc.GetVehicleModels(manufacturerId))
  )
}
