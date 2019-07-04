import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribaniasComponent } from './escribanias.component';

describe('EscribaniasComponent', () => {
  let component: EscribaniasComponent;
  let fixture: ComponentFixture<EscribaniasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscribaniasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
