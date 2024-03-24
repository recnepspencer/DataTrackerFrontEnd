export class MathService {
  getNumbers(): string {
    const numbers = { a: 10, b: 5 };
    return JSON.stringify(numbers);
  }
}
