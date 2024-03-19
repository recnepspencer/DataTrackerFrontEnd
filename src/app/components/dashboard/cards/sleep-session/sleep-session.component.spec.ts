import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepSessionComponent } from './sleep-session.component';

describe('SleepSessionComponent', () => {
  let component: SleepSessionComponent;
  let fixture: ComponentFixture<SleepSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
