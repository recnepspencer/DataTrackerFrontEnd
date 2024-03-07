import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceBathSessionComponent } from './ice-bath-session.component';

describe('IceBathSessionComponent', () => {
  let component: IceBathSessionComponent;
  let fixture: ComponentFixture<IceBathSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IceBathSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IceBathSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
