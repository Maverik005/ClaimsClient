import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, RedirectRequest } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private router = inject(Router)
  private authService = inject(MsalService);
  private loginSvc = inject(LoginService);
  subscription: Subscription;
  title = 'ClaimsClient';
  isUserLoggedIn: boolean = false;

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration){
  }

  ngOnInit(): void {
    this.subscription = this.authService.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult) => {
        console.log(result)
        if(result && result.accessToken){
          sessionStorage.setItem("authResponse", JSON.stringify(result))
          this.isUserLoggedIn = true;
          this.loginSvc.isUserLoggedIn.next(this.isUserLoggedIn)
          this.router.navigate(['master/claims'])
        } else {
          this.isUserLoggedIn = false;
          this.loginSvc.isUserLoggedIn.next(this.isUserLoggedIn)
        }
      },
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logIn() {
    if(this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
    }
    else {
      this.authService.loginRedirect()
    }
  }
}
