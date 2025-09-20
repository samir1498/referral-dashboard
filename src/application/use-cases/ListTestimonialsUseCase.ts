import { ITestimonialRepository } from "@/domain/repositories/ITestimonialRepository";

export class ListTestimonialsUseCase {
  constructor(private testimonialRepository: ITestimonialRepository) {}

  async execute() {
    return this.testimonialRepository.findAll();
  }
}
