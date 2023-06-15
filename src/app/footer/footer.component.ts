import { Component } from '@angular/core';
import { AccService } from '../shared/acc.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(public accService: AccService){}

}
