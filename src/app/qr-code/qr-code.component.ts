import { Component } from '@angular/core';
import { DataReservationService } from './services/data-reservation.service';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
  constructor(private dataUser: DataReservationService) { }
  elementType=NgxQrcodeElementTypes.URL;
  errorCorrectionLevel=NgxQrcodeErrorCorrectionLevels.HIGH;
  value=this.dataUser.getDataUser();
}
