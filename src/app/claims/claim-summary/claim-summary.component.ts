import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransformModelService } from "../../helper/transform-model.service";
import { ClaimContract } from "../../models/claim-contract";
import { ClaimService } from "../services/claim.service";
import { AddressConfigService } from "../../helper/address-config.service";
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ClaimRelayService } from "../../helper/claim-relay.service";
import { State } from "../../models/state";
import { Country } from "../../models/country";
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { VehicleConfigService } from "../../helper/vehicle-config.service";
import { Manufacturer } from 'src/app/models/manufacturer';
import { VehicleModels } from 'src/app/models/vehicle-models';

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent implements OnInit {
  @Input() claimsForm: FormGroup;
  private relaySvc = inject(ClaimRelayService);
  private vehicleCfgSvc = inject(VehicleConfigService);
  private router = inject(Router)
  private addrService = inject(AddressConfigService);
  lstCountries$: Observable<Country[]>;
  lstStates$: Observable<State[]>;
  setCountry:number;
  setState:number;
  setManufacturer:number = 0;
  setVehicleModel:number;
  relaySubscription:Subscription;
  private xModelService = inject(TransformModelService)
  private claimSvc = inject(ClaimService);
  claimDataObj: ClaimContract;
  originalClaim: ClaimContract;
  editMode = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private manufacturerSubject = new BehaviorSubject<number>(0);
  manufacturerSelectedAction$ = this.manufacturerSubject.asObservable();
  lstManufacturer$: Observable<Manufacturer[]>;
  
  constructor(private _snackBar: MatSnackBar){
    this.relaySubscription = this.relaySvc.Receiver().subscribe(relayObj=> {
      if(relayObj){
        this.editMode = relayObj.editMode;
        this.originalClaim = relayObj.value as ClaimContract;
      }
   });
  }
  
  ngOnInit(): void {
    this.lstManufacturer$ = this.vehicleCfgSvc.GetManufacturers();
    this.lstCountries$ = this.addrService.GetCountries().pipe(
      tap((countries) => {        
        this.setCountry = countries[0].id
        this.lstStates$ = this.addrService.GetStates(this.setCountry);
      })
    );

    // Initialize all dropdowns selected value to form values
    this.claimsForm.valueChanges.subscribe(data=>{
      this.setState = data.userDetails.state;
      this.setManufacturer = data.vehicleDetails.manufacturer;
      this.manufacturerSubject.next(this.setManufacturer);
      if(this.lstVehicleModels$)
        this.setVehicleModel = data.vehicleDetails.vehicleModel;
    })

    if(this.editMode === true) {
      this.setState = this.claimsForm.get('userDetails')!.get('state')!.value;
      this.setManufacturer = this.claimsForm.get('vehicleDetails')!.get('manufacturer')!.value;
      this.manufacturerSubject.next(this.setManufacturer);
      this.setVehicleModel = this.claimsForm.get('vehicleDetails')!.get('vehicleModel')!.value;
    } 
  }
  ngOnDestroy(): void {
    this.relaySubscription.unsubscribe();
  }

  lstVehicleModels$: Observable<VehicleModels[]> = this.manufacturerSelectedAction$.pipe(
    switchMap(manufacturerId => this.vehicleCfgSvc.GetVehicleModels(manufacturerId))
  )
  
  SaveClaim() {
    var claimData = this.claimsForm.value;
    let loggedInUser= "";
    this.claimDataObj = this.xModelService.TransformObject(claimData);
    if(sessionStorage.length > 0){
      let sessionObj = sessionStorage.getItem("authResponse")?.toString() || "";
      loggedInUser = JSON.parse(sessionObj).account.username;
    }
    this.claimDataObj.claimManager = loggedInUser;
    this.claimSvc.AddClaim(this.claimDataObj).subscribe(res =>{ 
      this.claimDataObj.id = +res
      this.relaySvc.Sender(this.claimDataObj,false);
      this._snackBar.open("Succesfully added the claim!!!","Success",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:5000
      })
      this.router.navigate(['master/claims']);
    },
      error=>{
        if(error.status === 403){
          this._snackBar.open("You are not authorized!","Error", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration:5000
          })
        } 
        else
            this._snackBar.open("Application error. Sorry for the incovenience.","Error", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration:5000
            })
      });  
  }

  UpdateClaim() {
    var claimData = this.claimsForm.value;
    this.claimDataObj = this.xModelService.TransformObject(claimData);
    this.claimDataObj.claimTitle = this.originalClaim.claimTitle;
    this.claimDataObj.id = this.originalClaim.id;
    this.claimDataObj.vehicleId = this.originalClaim.vehicleId;
    this.claimDataObj.userId = this.originalClaim.userId;
    console.log(this.claimDataObj)
    this.claimSvc.UpdateClaim(this.claimDataObj).subscribe(() => {
      this.relaySvc.Sender(this.claimDataObj,true);
      this._snackBar.open("Succesfully updated the claim!!!","Success",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:5000
      })
      this.router.navigate(['master/claims']);
    },
    error=> {
      if(error.status === 403){
        this._snackBar.open("You are not authorized!","Error",{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration:5000
        })
      } 
      else
          this._snackBar.open("Application error. Sorry for the incovenience.","Error",{
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration:5000
          })
    });
  }
}
