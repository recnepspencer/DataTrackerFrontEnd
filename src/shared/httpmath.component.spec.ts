import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathComponent } from './httpmath.component';
import { MathService } from './httpmath.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('MathComponent', () => {
  let component: MathComponent;
  let fixture: ComponentFixture<MathComponent>;
  let mathServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    mathServiceMock = {
      addNumbers: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [MathComponent],
      providers: [
        { provide: MathService, useValue: mathServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(MathComponent);
    component = fixture.componentInstance;
  });

  it('should call addNumbers and navigate on success', () => {
    mathServiceMock.addNumbers.mockReturnValue(of({ result: 15 })); // Mocking the service to return a successful observable

    component.performOperation();
    
    expect(mathServiceMock.addNumbers).toHaveBeenCalledWith(5, 10);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/result-page']);
  });

  it('should handle errors and not navigate', () => {
    const errorResponse = new Error('Failed to add numbers');
    mathServiceMock.addNumbers.mockReturnValue(throwError(() => errorResponse)); // Mocking the service to return an error observable

    component.performOperation();

    expect(mathServiceMock.addNumbers).toHaveBeenCalledWith(5, 10);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});