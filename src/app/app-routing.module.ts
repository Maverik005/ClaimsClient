import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ClaimsListComponent } from "./claims/claims-list/claims-list.component";
import { ClaimDetailsComponent } from "./claims/claim-details/claim-details.component";
import { LoginComponent } from "./authentication/login/login.component";
import { MasterComponent } from "./master/master.component";

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'master',
    component: MasterComponent,
    children: [
      {
        path: 'claims',
        component: ClaimsListComponent,
        canActivate:[MsalGuard]
      },
      {
        path:'claimDetails',
        component:ClaimDetailsComponent,
        pathMatch:'full'
      } 
    ]    
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation:'enabledBlocking'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
