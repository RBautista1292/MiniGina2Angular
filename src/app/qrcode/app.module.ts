import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QRCodeComponent } from './qrcode.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [
    QRCodeComponent
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [QRCodeComponent]
})
export class QRModule { }
