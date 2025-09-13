export class Email {
  private readonly value: string;
  constructor(value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Invalid email");
    this.value = value;
  }
  toString() { return this.value; }
}