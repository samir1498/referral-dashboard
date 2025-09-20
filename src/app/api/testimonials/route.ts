import { TestimonialRepositoryDrizzle } from "@/infrastructure/repositories/TestimonialRepositoryDrizzle";
import { ListTestimonialsUseCase } from "@/application/use-cases/ListTestimonialsUseCase";
import { AddTestimonialUseCase } from "@/application/use-cases/AddTestimonialUseCase";
import { EditTestimonialUseCase } from "@/application/use-cases/EditTestimonialUseCase";
import { DeleteTestimonialUseCase } from "@/application/use-cases/DeleteTestimonialUseCase";
import { Testimonial } from "@/domain/entities/Testimonial";
import { NextRequest, NextResponse } from "next/server";

const testimonialRepository = new TestimonialRepositoryDrizzle();

export async function GET() {
  const listTestimonialsUseCase = new ListTestimonialsUseCase(testimonialRepository);
  const testimonials = await listTestimonialsUseCase.execute();
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const testimonial = Testimonial.builder()
    .withId("")
    .withUserId(body.userId ?? "")
    .withClientName(body.clientName)
    .withCompanyName(body.companyName)
    .withContent(body.content)
    .withRating(body.rating)
    .withStatus(body.status)
    .withCreatedAt(new Date())
    .build();

  const addTestimonialUseCase = new AddTestimonialUseCase(testimonialRepository);
  await addTestimonialUseCase.execute(testimonial);

  return NextResponse.json({ status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const testimonial = Testimonial.builder()
    .withId(body.id)
    .withUserId(body.userId ?? "")
    .withClientName(body.clientName)
    .withCompanyName(body.companyName)
    .withContent(body.content)
    .withRating(body.rating)
    .withStatus(body.status)
    .withUpdatedAt(new Date())
    .build();

  const editTestimonialUseCase = new EditTestimonialUseCase(testimonialRepository);
  await editTestimonialUseCase.execute(testimonial);

  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const deleteTestimonialUseCase = new DeleteTestimonialUseCase(testimonialRepository);
  await deleteTestimonialUseCase.execute(body.id);

  return NextResponse.json({ status: 200 });
}
