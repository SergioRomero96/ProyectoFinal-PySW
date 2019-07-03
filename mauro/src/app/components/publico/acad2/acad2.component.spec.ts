import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Acad2Component } from './acad2.component';

describe('Acad2Component', () => {
  let component: Acad2Component;
  let fixture: ComponentFixture<Acad2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Acad2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Acad2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
