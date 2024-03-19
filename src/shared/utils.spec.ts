// The jest method is already declared globally
import { TestBed } from '@angular/core/testing';
import { range, pluck } from './utils';
import { AuthService } from '../app/auth/auth.service';

describe('utils', () => {
    describe('range', () => {
        it('returns correct range from 1 to 5', () => {
            expect(range(1, 5)).toEqual([1, 2, 3, 4]);
        });
    });
    describe('pluck', () => {
        it('return correct result', () => {
            const data = [
                {id: 1, name: 'John'},
                {id: 2, name: 'Doe'},
                {id: 3, name: 'Smith'}
            ]
            expect(pluck(data, 'name')).toEqual(['John', 'Doe', 'Smith']);
        });
    })
})

// Notes:
// describe('AuthService', () => {
//     let authService: AuthService;
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             // use providers, declarations, imports, etc. here
//             //ex providers: [AuthService]
//         })
//         authService = TestBed.inject(AuthService);
//         // use this method at the beginning for any code you want to run before all of your tests 
//     })

//     // after this inital setup, we can run a test:
//     it('creates a service', () => {
//         expect(authService).toBeTruthy();
//     });
// });
