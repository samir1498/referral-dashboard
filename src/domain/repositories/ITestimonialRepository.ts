import { Testimonial } from "../entities/Testimonial";

export interface ITestimonialRepository {
  findAll(): Promise<Testimonial[]>;
  findById(id: string): Promise<Testimonial | null>;
  add(testimonial: Testimonial): Promise<void>;
  update(testimonial: Testimonial): Promise<void>;
  delete(id: string): Promise<void>;
}
