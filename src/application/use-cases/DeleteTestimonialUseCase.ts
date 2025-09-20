import { ITestimonialRepository } from "@/domain/repositories/ITestimonialRepository";

export class DeleteTestimonialUseCase {
  constructor(private testimonialRepository: ITestimonialRepository) {}

  async execute(id: string) {
    return this.testimonialRepository.delete(id);
  }
}
