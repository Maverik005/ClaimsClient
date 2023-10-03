import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>
  constructor() { }
}
