import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Angular Material*/
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from "./claimUserDetails/user-details/user-details.component";
import { VehicleDetailsComponent } from './claimVehicleDetails/vehicle-details/vehicle-details.component';
import { ClaimsListComponent } from './claims/claims-list/claims-list.component';
import { ClaimDetailsComponent } from './claims/claim-details/claim-details.component';
import { ClaimSummaryComponent } from './claims/claim-summary/claim-summary.component';
import { ClaimDialogComponent } from './claims/claim-dialog/claim-dialog.component';
import { LoginComponent } from './authentication/login/login.component';
import { MasterComponent } from './master/master.component';
import { LoginService } from './authentication/login.service';
import { ClaimRelayService } from './helper/claim-relay.service';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    VehicleDetailsComponent,
    ClaimsListComponent,
    ClaimDetailsComponent,
    ClaimSummaryComponent,
    ClaimDialogComponent,
    LoginComponent,
    MasterComponent,
  ],
  imports: [ BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'22c2129b-f3eb-4ebe-b467-14c4a2e5c95a',
            redirectUri:'http://localhost:4200',
            authority:'https://login.microsoftonline.com/1b1ec18b-f7b3-4a2e-8b20-d9fa580f1f75'
          },
          cache:{
            cacheLocation:'localStorage',
            storeAuthStateInCookie:true
          }
        }
      ),
      {
        interactionType: InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.read']],
            ['localhost',['api://4cf06491-d930-4c37-9f02-ecec5bd5deb6/api.scope']]
          ]
        )
      }
    )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi:true
  }, MsalGuard,LoginService, ClaimRelayService, MatDatepickerModule],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
