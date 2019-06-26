import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribanosComponent } from './escribanos.component';

describe('EscribanosComponent', () => {
  let component: EscribanosComponent;
  let fixture: ComponentFixture<EscribanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscribanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
