import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { LoginService } from './authentication/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private msalBroadcastService = inject(MsalBroadcastService);
  private authService = inject(MsalService);
  private loginSvc = inject(LoginService);
  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration){}

  title = 'ClaimsClient';
  isUserLoggedIn: boolean = false;
  private readonly _destroy = new Subject<void>;
  postLogOutRedirectUrl = "http://localhost:4200"

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$.pipe(
      filter((interactionStatus:InteractionStatus) => interactionStatus == InteractionStatus.None),
      takeUntil(this._destroy))
      .subscribe(x=> {
        this.isUserLoggedIn = this.authService.instance.getAllAccounts().length >0
        const userAct = this.authService.instance.getAllAccounts()
        console.log(userAct[0])
        this.loginSvc.isUserLoggedIn.next(this.isUserLoggedIn)   
      })
  }
  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  logIn() {
    if(this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
    }
    else {
      this.authService.loginRedirect()
    }
  }

  logOut() {
    this.authService.logoutRedirect({postLogoutRedirectUri:this.postLogOutRedirectUrl})
  }
}
