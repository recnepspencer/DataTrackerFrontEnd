import { MathClass } from "./learn";
import { MathService } from "./learn.service";

jest.mock('./learn.service', () => {
    return {
        MathService: jest.fn().mockImplementation(() => {
            return {
                getNumbers: jest.fn().mockReturnValue(JSON.stringify({ a: 10, b: 5 }))
            };
        })
    };
});

describe('test math class', () => {
    let mathClass: MathClass;
    const mockMathService = new MathService();

    beforeEach(() => {
        // Mock the implementation if needed
        mathClass = new MathClass(mockMathService);
    });

    it('should add two numbers', () => {
        expect(mathClass.add()).toBe(15);
    });

    it('should subtract two numbers', () => {
        expect(mathClass.subtract()).toBe(5);
    });

    it('should multiply two numbers', () => {
        expect(mathClass.performOperation('multiply')).toBe(50);
    });

    it('should divide two numbers', () => {
        expect(mathClass.performOperation('divide')).toBe(2);
    });

    it('should throw an error when dividing by zero', () => {
        jest.spyOn(mockMathService, 'getNumbers').mockReturnValue(JSON.stringify({ a: 10, b: 0 }));
        expect(() => mathClass.performOperation('divide')).toThrow('Cannot divide by zero');
    });
});



// Test before running the service
// describe('test math class', () => {
//     let mathClass: MathClass;
//     let var1: number = 10;
//     let var2: number = 5;
//     beforeEach(() => {
//         mathClass = new MathClass();
//     }
//     );
//     it('should add two numbers', () => {
//         expect(mathClass.add(var1, var2)).toBe(15);
//     });
//     it('should subtract two numbers', () => {
//         expect(mathClass.subtract(var1, var2)).toBe(5);
//     });
//     it('should multiply two numbers', () => {
//         expect(mathClass.performOperation('multiply', var1, var2)).toBe(50);
//     });
//     it('should divide two numbers', () => {
//         expect(mathClass.performOperation('divide', var1, var2)).toBe(2);
//     });
//     it('should throw an error when dividing by zero', () => {
//         expect(() => mathClass.performOperation('divide', var1, 0)).toThrow('Cannot divide by zero');
//     });
// });