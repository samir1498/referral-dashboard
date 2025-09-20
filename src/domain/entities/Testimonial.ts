export class Testimonial {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly company: string,
    public readonly testimonial: string,
    public readonly avatar?: string
  ) {}
}
