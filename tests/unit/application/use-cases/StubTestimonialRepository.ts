import { Testimonial } from "@/domain/entities/Testimonial";
import { ITestimonialRepository } from "@/domain/repositories/ITestimonialRepository";

export class StubTestimonialRepository implements ITestimonialRepository {
  private testimonials: Testimonial[] = [];

  constructor(initialTestimonials: Testimonial[] = []) {
    this.testimonials = initialTestimonials;
  }

  async findAll(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  async findById(id: string): Promise<Testimonial | null> {
    return this.testimonials.find((t) => t.id === id) || null;
  }

  async add(testimonial: Testimonial): Promise<void> {
    this.testimonials.push(testimonial);
  }

  async update(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial | null> {
    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.testimonials[index] = { ...this.testimonials[index], ...testimonial };
      return this.testimonials[index];
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.testimonials.splice(index, 1);
    }
  }
}
