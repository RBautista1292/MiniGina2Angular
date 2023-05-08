import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private navItemSelected = new Subject<string>();
  navItemSelected$ = this.navItemSelected.asObservable();

  notifyNavItemSelected(navItem: string) {
    this.navItemSelected.next(navItem);
  }

  constructor() { }
}
