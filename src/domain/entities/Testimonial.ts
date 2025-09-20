export class Testimonial {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly clientName: string,
    public readonly companyName: string,
    public readonly content: string,
    public readonly rating: number,
    public readonly status: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) { }

  static builder() {
    return new TestimonialBuilder();
  }
}

class TestimonialBuilder {
  private id!: string;
  private userId!: string;
  private clientName!: string;
  private companyName!: string;
  private content!: string;
  private rating!: number;
  private status!: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  withId(id: string): this {
    this.id = id;
    return this;
  }

  withUserId(userId: string): this {
    this.userId = userId;
    return this;
  }

  withClientName(clientName: string): this {
    this.clientName = clientName;
    return this;
  }

  withCompanyName(companyName: string): this {
    this.companyName = companyName;
    return this;
  }

  withContent(content: string): this {
    this.content = content;
    return this;
  }

  withRating(rating: number): this {
    this.rating = rating;
    return this;
  }

  withStatus(status: string): this {
    this.status = status;
    return this;
  }

  withCreatedAt(createdAt: Date): this {
    this.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: Date): this {
    this.updatedAt = updatedAt;
    return this;
  }

  build(): Testimonial {
    return new Testimonial(
      this.id,
      this.userId,
      this.clientName,
      this.companyName,
      this.content,
      this.rating,
      this.status,
      this.createdAt,
      this.updatedAt
    );
  }
}
