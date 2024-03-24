import { MathService } from "./learn.service";

export class MathClass {
    constructor(private mathService: MathService) { }


    public add(): number {
        const { a, b } = JSON.parse(this.mathService.getNumbers());
        return a + b;
    }

    public subtract(): number {
        const { a, b } = JSON.parse(this.mathService.getNumbers());
        return a - b;
    }

    private multiply(): number {
        const { a, b } = JSON.parse(this.mathService.getNumbers());
        return a * b;
    }
    
    private divide(): number {
        const { a, b } = JSON.parse(this.mathService.getNumbers());
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        return a / b;
    }

    // The performOperation method would similarly use JSON.parse

    public performOperation(operation: string): number {
        const { a, b } = JSON.parse(this.mathService.getNumbers());
    
        switch (operation) {
            case 'multiply':
                return this.multiply(); // Assuming multiply uses numbers from MathService
            case 'divide':
                return this.divide(); // Assuming divide uses numbers from MathService
            default:
                throw new Error('Operation not supported');
        }
    }
}

