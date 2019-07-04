import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadEscribanoComponent } from './novedad-escribano.component';

describe('NovedadEscribanoComponent', () => {
  let component: NovedadEscribanoComponent;
  let fixture: ComponentFixture<NovedadEscribanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovedadEscribanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadEscribanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
