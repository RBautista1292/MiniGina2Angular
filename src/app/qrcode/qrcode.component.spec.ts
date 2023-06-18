import { TestBed } from '@angular/core/testing';
import { QRCodeComponent } from './qrcode.component';

describe('QRCodeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        QRCodeComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QRCodeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'QR'`, () => {
    const fixture = TestBed.createComponent(QRCodeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('QR');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(QRCodeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('QR app is running!');
  });
});
