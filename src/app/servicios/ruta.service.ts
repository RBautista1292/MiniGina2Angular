import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  sharedData: string = "";

  setSharedData(data: string) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }
  

  constructor() { }
}
