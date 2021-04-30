import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesPrintComponent } from './supplies-print.component';

describe('SuppliesPrintComponent', () => {
  let component: SuppliesPrintComponent;
  let fixture: ComponentFixture<SuppliesPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliesPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
