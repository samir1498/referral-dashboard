import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect } from "vitest";

describe("Testimonial", () => {
  it("should create a testimonial", () => {
    const testimonial = new Testimonial(
      "1",
      "user-123",
      "John Doe",
      "Acme Inc.",
      "This is a great product!",
      5,
      "Approved",
      new Date(),
      new Date()
    );

    expect(testimonial.id).toBe("1");
    expect(testimonial.userId).toBe("user-123");
    expect(testimonial.clientName).toBe("John Doe");
    expect(testimonial.companyName).toBe("Acme Inc.");
    expect(testimonial.content).toBe("This is a great product!");
    expect(testimonial.rating).toBe(5);
    expect(testimonial.status).toBe("Approved");
    expect(testimonial.createdAt).toBeInstanceOf(Date);
    expect(testimonial.updatedAt).toBeInstanceOf(Date);
  });
});
