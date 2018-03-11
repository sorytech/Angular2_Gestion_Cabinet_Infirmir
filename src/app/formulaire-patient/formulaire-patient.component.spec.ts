import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePatientComponent } from './formulaire-patient.component';

describe('FormulairePatientComponent', () => {
  let component: FormulairePatientComponent;
  let fixture: ComponentFixture<FormulairePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulairePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulairePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
