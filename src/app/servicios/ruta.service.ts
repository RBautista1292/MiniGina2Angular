import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private _booleanSubject = new Subject<boolean>();
  boolean$ = this._booleanSubject.asObservable();

  changeBoolean() {
    this._booleanSubject.next(true);
  }
  

  constructor() { }
}
