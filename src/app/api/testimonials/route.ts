import { TestimonialRepositoryDrizzle } from "@/infrastructure/repositories/TestimonialRepositoryDrizzle";
import { ListTestimonialsUseCase } from "@/application/use-cases/ListTestimonialsUseCase";
import { AddTestimonialUseCase } from "@/application/use-cases/AddTestimonialUseCase";
import { Testimonial } from "@/domain/entities/Testimonial";
import { NextRequest, NextResponse } from "next/server";
import { EditTestimonialUseCase } from "@/application/use-cases/EditTestimonialUseCase";
import { DeleteTestimonialUseCase } from "@/application/use-cases/DeleteTestimonialUseCase";

const testimonialRepository = new TestimonialRepositoryDrizzle();

export async function GET() {
  const listTestimonialsUseCase = new ListTestimonialsUseCase(testimonialRepository);
  const testimonials = await listTestimonialsUseCase.execute();
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const addTestimonialUseCase = new AddTestimonialUseCase(testimonialRepository);
  const testimonial = new Testimonial("", body.name, body.company, body.testimonial, body.avatar);
  await addTestimonialUseCase.execute(testimonial);
  return NextResponse.json({ status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const editTestimonialUseCase = new EditTestimonialUseCase(testimonialRepository);
  const testimonial = new Testimonial(body.id, body.name, body.company, body.testimonial, body.avatar);
  await editTestimonialUseCase.execute(testimonial);
  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const deleteTestimonialUseCase = new DeleteTestimonialUseCase(testimonialRepository);
  await deleteTestimonialUseCase.execute(body.id);
  return NextResponse.json({ status: 200 });
}
