import { Testimonial } from "@/domain/entities/Testimonial";
import { ITestimonialRepository } from "@/domain/repositories/ITestimonialRepository";

export class EditTestimonialUseCase {
  constructor(private testimonialRepository: ITestimonialRepository) {}

  async execute(testimonial: Testimonial) {
    return this.testimonialRepository.update(testimonial);
  }
}
