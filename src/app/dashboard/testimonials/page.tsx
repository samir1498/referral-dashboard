"use client";
import React from "react";

import { useEffect, useState } from "react";
import { Testimonial } from "@/domain/entities/Testimonial";
import { TestimonialCard } from "@/interface/ui/components/TestimonialCard";
import { AddTestimonial } from "@/interface/ui/components/AddTestimonial";
import { EditTestimonial } from "@/interface/ui/components/EditTestimonial";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
  };

  const handleAdd = async (testimonial: {
    name: string;
    company: string;
    testimonial: string;
    avatar?: string;
  }) => {
    await fetch("/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testimonial),
    });
    fetchTestimonials();
  };

  const handleEdit = async (testimonial: Testimonial) => {
    await fetch("/api/testimonials", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testimonial),
    });
    setEditingTestimonial(null);
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/testimonials", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchTestimonials();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <AddTestimonial onAdd={handleAdd} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onEdit={setEditingTestimonial}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <EditTestimonial
        testimonial={editingTestimonial}
        onEdit={handleEdit}
        onOpenChange={() => setEditingTestimonial(null)}
      />
    </div>
  );
}
