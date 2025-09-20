export class Testimonial {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly clientName: string,
    public readonly companyName: string,
    public readonly content: string,
    public readonly rating: number,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
