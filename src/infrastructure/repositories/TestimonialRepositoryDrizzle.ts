import { db } from "./db/connection";
import { testimonials } from "./db/schema";
import { Testimonial } from "@/domain/entities/Testimonial";
import { ITestimonialRepository } from "@/domain/repositories/ITestimonialRepository";
import { eq } from "drizzle-orm";

export class TestimonialRepositoryDrizzle implements ITestimonialRepository {
  async findAll(): Promise<Testimonial[]> {
    const allTestimonials = await db.select().from(testimonials);
    return allTestimonials.map(
      (t) =>
        new Testimonial(t.id.toString(), t.name, t.company || "", t.testimonial, t.avatar || undefined)
    );
  }

  async findById(id: string): Promise<Testimonial | null> {
    const testimonial = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, parseInt(id)));

    if (testimonial.length === 0) {
      return null;
    }

    const t = testimonial[0];
    return new Testimonial(t.id.toString(), t.name, t.company || "", t.testimonial, t.avatar || undefined);
  }

  async add(testimonial: Testimonial): Promise<void> {
    await db.insert(testimonials).values({
      name: testimonial.name,
      company: testimonial.company,
      testimonial: testimonial.testimonial,
      avatar: testimonial.avatar,
    });
  }

  async update(testimonial: Testimonial): Promise<void> {
    await db
      .update(testimonials)
      .set({
        name: testimonial.name,
        company: testimonial.company,
        testimonial: testimonial.testimonial,
        avatar: testimonial.avatar,
      })
      .where(eq(testimonials.id, parseInt(testimonial.id)));
  }

  async delete(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, parseInt(id)));
  }
}
