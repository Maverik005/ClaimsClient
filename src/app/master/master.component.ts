import { Component, OnInit, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit{
  loggedInUser:string;
  userRole: string;
  ngOnInit(): void {
    if(sessionStorage.length > 0){
      let sessionObj = sessionStorage.getItem("authResponse")?.toString() || "";
      this.loggedInUser = JSON.parse(sessionObj).account.name;
      this.userRole = JSON.parse(sessionObj).account.idTokenClaims.roles[0];
    }
  }
  private authService = inject(MsalService);
  postLogOutRedirectUrl = "http://localhost:4200/login"
  
  logOut() {
    sessionStorage.clear();
    this.authService.logoutRedirect({postLogoutRedirectUri:this.postLogOutRedirectUrl})
  }
}
