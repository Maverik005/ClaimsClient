import { Component, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {
  private authService = inject(MsalService);
  postLogOutRedirectUrl = "http://localhost:4200/login"
  
  logOut() {
    this.authService.logoutRedirect({postLogoutRedirectUri:this.postLogOutRedirectUrl})
  }
}
