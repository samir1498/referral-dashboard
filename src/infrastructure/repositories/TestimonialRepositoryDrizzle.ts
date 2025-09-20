import { db } from "../db/connection";
import { testimonials } from "../db/schema";
import { Testimonial } from "@/domain/entities/Testimonial";
import { ITestimonialRepository } from "@/domain/repositories/ITestimonialRepository";
import { eq } from "drizzle-orm";

export class TestimonialRepositoryDrizzle implements ITestimonialRepository {
  async findAll(): Promise<Testimonial[]> {
    const allTestimonials = await db.select().from(testimonials);
    return allTestimonials.map(
      (t) =>
        new Testimonial(
          t.id.toString(),
          t.userId,
          t.clientName,
          t.companyName || "",
          t.content,
          t.rating,
          t.status,
          t.createdAt,
          t.updatedAt
        )
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
    return new Testimonial(
      t.id.toString(),
      t.userId,
      t.clientName,
      t.companyName || "",
      t.content,
      t.rating,
      t.status,
      t.createdAt,
      t.updatedAt
    );
  }

  async add(testimonial: Testimonial): Promise<void> {
    await db.insert(testimonials).values({
      userId: testimonial.userId,
      clientName: testimonial.clientName,
      companyName: testimonial.companyName,
      content: testimonial.content,
      rating: testimonial.rating,
      status: testimonial.status,
      createdAt: testimonial.createdAt,
      updatedAt: testimonial.updatedAt,
    });
  }

  async update(id: string, data: Partial<Testimonial>): Promise<Testimonial | null> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set({
        updatedAt: new Date(),
        clientName: data.clientName,
        companyName: data.companyName,
        content: data.content,
        rating: data.rating,
        status: data.status,

      })
      .where(eq(testimonials.id, Number(id)))
      .returning();

    if (!updatedTestimonial) {
      return null;
    }

    return new Testimonial(
      updatedTestimonial.id.toString(),
      updatedTestimonial.userId,
      updatedTestimonial.clientName,
      updatedTestimonial.companyName || "",
      updatedTestimonial.content,
      updatedTestimonial.rating,
      updatedTestimonial.status,
      updatedTestimonial.createdAt,
      updatedTestimonial.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, parseInt(id)));
  }
}
