"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/domain/entities/Testimonial";
import { deleteTestimonial } from "@/app/dashboard/testimonials/actions";
import { EditTestimonial } from "./EditTestimonial";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{testimonial.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
      </CardHeader>
      <CardContent>
        <p>{testimonial.testimonial}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 px-2">
        <EditTestimonial testimonial={testimonial} />
        <form
          action={async () => {
            await deleteTestimonial(testimonial.id);
          }}
        >
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
