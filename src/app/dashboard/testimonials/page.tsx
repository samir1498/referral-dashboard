'use client';

import React, { useEffect, useState } from "react";
import { TestimonialCard } from "@/interface/ui/components/TestimonialCard";
import { AddTestimonial } from "@/interface/ui/components/AddTestimonial";
import { getTestimonials } from "./actions";
import { Testimonial } from "@/domain/entities/Testimonial"; // Assuming Testimonial type is available

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const data = await getTestimonials();
      setTestimonials(data);
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div>Loading testimonials...</div>; // Or a more sophisticated loading spinner
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <AddTestimonial />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
