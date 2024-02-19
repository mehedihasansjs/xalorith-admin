import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanOrSearchComponent } from './scan-or-search.component';

describe('ScanOrSearchComponent', () => {
  let component: ScanOrSearchComponent;
  let fixture: ComponentFixture<ScanOrSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanOrSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanOrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
