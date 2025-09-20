import { DeleteTestimonialUseCase } from "@/application/use-cases/DeleteTestimonialUseCase";
import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect, beforeEach } from "vitest";
import { StubTestimonialRepository } from "./StubTestimonialRepository";

describe("DeleteTestimonialUseCase", () => {
  let testimonialRepository: StubTestimonialRepository;
  let deleteTestimonialUseCase: DeleteTestimonialUseCase;

  beforeEach(() => {
    testimonialRepository = new StubTestimonialRepository();
    deleteTestimonialUseCase = new DeleteTestimonialUseCase(testimonialRepository);
  });

  it("should delete a testimonial", async () => {
    const testimonial = new Testimonial("1", "John Doe", "Acme Inc.", "This is a great product!");
    await testimonialRepository.add(testimonial);

    await deleteTestimonialUseCase.execute("1");

    const testimonials = await testimonialRepository.findAll();
    expect(testimonials).toHaveLength(0);
  });
});
