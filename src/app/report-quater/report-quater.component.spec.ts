import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQuaterComponent } from './report-quater.component';

describe('ReportQuaterComponent', () => {
  let component: ReportQuaterComponent;
  let fixture: ComponentFixture<ReportQuaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportQuaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportQuaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
