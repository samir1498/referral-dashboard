import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect } from "vitest";

describe("Testimonial", () => {
  it("should create a testimonial", () => {
    const testimonial = new Testimonial(
      "1",
      "John Doe",
      "Acme Inc.",
      "This is a great product!",
      "https://example.com/avatar.png"
    );

    expect(testimonial.id).toBe("1");
    expect(testimonial.name).toBe("John Doe");
    expect(testimonial.company).toBe("Acme Inc.");
    expect(testimonial.testimonial).toBe("This is a great product!");
    expect(testimonial.avatar).toBe("https://example.com/avatar.png");
  });
});
