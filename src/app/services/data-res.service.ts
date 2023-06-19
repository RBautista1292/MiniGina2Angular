import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataResService {
  dataRes!: string
  constructor() { }
  
  setDataRes(data: any){
    this.dataRes = data;
  }

  getDataRes(){
    return this.dataRes;
  }
}
