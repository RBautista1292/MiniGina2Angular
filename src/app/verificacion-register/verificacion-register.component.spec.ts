import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionRegisterComponent } from './verificacion-register.component';

describe('VerificacionRegisterComponent', () => {
  let component: VerificacionRegisterComponent;
  let fixture: ComponentFixture<VerificacionRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificacionRegisterComponent]
    });
    fixture = TestBed.createComponent(VerificacionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
