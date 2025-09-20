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

  async update(testimonial: Testimonial): Promise<void> {
    const index = this.testimonials.findIndex((t) => t.id === testimonial.id);
    if (index !== -1) {
      this.testimonials[index] = testimonial;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.testimonials.splice(index, 1);
    }
  }
}
