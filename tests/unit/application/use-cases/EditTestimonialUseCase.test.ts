import { EditTestimonialUseCase } from "@/application/use-cases/EditTestimonialUseCase";
import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect, beforeEach } from "vitest";
import { StubTestimonialRepository } from "./StubTestimonialRepository";

describe("EditTestimonialUseCase", () => {
  let testimonialRepository: StubTestimonialRepository;
  let editTestimonialUseCase: EditTestimonialUseCase;

  beforeEach(() => {
    testimonialRepository = new StubTestimonialRepository();
    editTestimonialUseCase = new EditTestimonialUseCase(testimonialRepository);
  });

  it("should edit a testimonial", async () => {
    const testimonial = new Testimonial("1", "John Doe", "Acme Inc.", "This is a great product!");
    await testimonialRepository.add(testimonial);

    const updatedTestimonial = new Testimonial("1", "John Doe Updated", "Acme Inc.", "This is an updated great product!");
    await editTestimonialUseCase.execute(updatedTestimonial);

    const testimonials = await testimonialRepository.findAll();
    expect(testimonials).toHaveLength(1);
    expect(testimonials[0]).toBe(updatedTestimonial);
  });
});
