import React from "react";
import { TestimonialCard } from "@/interface/ui/components/TestimonialCard";
import { AddTestimonial } from "@/interface/ui/components/AddTestimonial";
import { getTestimonials } from "./actions";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <AddTestimonial />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial}   />
        ))}
      </div>
      {/* EditTestimonial will be handled by a separate client component if needed */}
    </div>
  );
}
