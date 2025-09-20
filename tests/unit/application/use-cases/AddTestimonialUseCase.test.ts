import { AddTestimonialUseCase } from "@/application/use-cases/AddTestimonialUseCase";
import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect, beforeEach } from "vitest";
import { StubTestimonialRepository } from "./StubTestimonialRepository";

describe("AddTestimonialUseCase", () => {
  let testimonialRepository: StubTestimonialRepository;
  let addTestimonialUseCase: AddTestimonialUseCase;

  beforeEach(() => {
    testimonialRepository = new StubTestimonialRepository();
    addTestimonialUseCase = new AddTestimonialUseCase(testimonialRepository);
  });

  it("should add a testimonial", async () => {
    const testimonial = new Testimonial("1", "John Doe", "Acme Inc.", "This is a great product!");

    await addTestimonialUseCase.execute(testimonial);

    const testimonials = await testimonialRepository.findAll();
    expect(testimonials).toHaveLength(1);
    expect(testimonials[0]).toBe(testimonial);
  });
});
