import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceBathsComponent } from './ice-baths.component';

describe('IceBathsComponent', () => {
  let component: IceBathsComponent;
  let fixture: ComponentFixture<IceBathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IceBathsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IceBathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
