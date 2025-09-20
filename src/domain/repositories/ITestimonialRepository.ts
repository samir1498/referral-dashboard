import { Testimonial } from "../entities/Testimonial";

export interface ITestimonialRepository {
  findAll(): Promise<Testimonial[]>;
  findById(id: string): Promise<Testimonial | null>;
  add(testimonial: Testimonial): Promise<void>;
  update(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial | null>;
  delete(id: string): Promise<void>;
}
