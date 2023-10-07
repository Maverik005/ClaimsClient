import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClaimRelayService {
  relayMessage = new BehaviorSubject({value:{},editMode:false});

  constructor() { }

  Sender(relayObject: any, editMode:boolean) {
    this.relayMessage.next({value: relayObject, editMode:editMode});
  }

  ClearQueue() {
    this.relayMessage.next({value:{},editMode:false});
  }

  Receiver(){
    return this.relayMessage.asObservable();
  }


}
