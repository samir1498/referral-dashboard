import { ListTestimonialsUseCase } from "@/application/use-cases/ListTestimonialsUseCase";
import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect, beforeEach } from "vitest";
import { StubTestimonialRepository } from "./StubTestimonialRepository";

describe("ListTestimonialsUseCase", () => {
  let testimonialRepository: StubTestimonialRepository;
  let listTestimonialsUseCase: ListTestimonialsUseCase;

  beforeEach(() => {
    testimonialRepository = new StubTestimonialRepository();
    listTestimonialsUseCase = new ListTestimonialsUseCase(testimonialRepository);
  });

  it("should list all testimonials", async () => {
    const testimonial1 = new Testimonial("1", "John Doe", "Acme Inc.", "Testimonial 1");
    const testimonial2 = new Testimonial("2", "Jane Doe", "Acme Inc.", "Testimonial 2");

    await testimonialRepository.add(testimonial1);
    await testimonialRepository.add(testimonial2);

    const testimonials = await listTestimonialsUseCase.execute();

    expect(testimonials).toHaveLength(2);
    expect(testimonials[0]).toBe(testimonial1);
    expect(testimonials[1]).toBe(testimonial2);
  });
});
