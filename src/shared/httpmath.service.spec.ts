import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MathService } from './httpmath.service';

describe('MathService', () => {
  let service: MathService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MathService]
    });
    service = TestBed.inject(MathService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should send a POST request to add numbers', () => {
    service.addNumbers(5, 10).subscribe(response => {
      expect(response).toEqual({ result: 15 });
    });

    const req = httpTestingController.expectOne('/api/add');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ a: 5, b: 10 });
    expect(req.request.headers.get('Custom-Header')).toEqual('value');

    req.flush({ result: 15 }); // Mocking the response
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no outstanding requests
  });
});