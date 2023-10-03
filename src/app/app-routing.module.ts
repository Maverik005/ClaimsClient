import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ClaimsListComponent } from "./claims/claims-list/claims-list.component";
import { ClaimDetailsComponent } from "./claims/claim-details/claim-details.component";
const routes: Routes = [
  {
    path: 'claims',
    component: ClaimsListComponent,
    canActivate:[MsalGuard]
  },
  {
    path:'claimDetails',
    component:ClaimDetailsComponent 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation:'enabledBlocking'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
