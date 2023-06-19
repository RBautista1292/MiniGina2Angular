import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataReservationService {
  dataRes!: any;
  constructor() { }

  setDataRes(data: any){
    this.dataRes = data;
  }

  getDataRes(){
    return this.dataRes;
  }
}
