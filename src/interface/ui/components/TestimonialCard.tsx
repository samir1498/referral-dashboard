"use client";
import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/domain/entities/Testimonial";
import { deleteTestimonial } from "@/app/dashboard/testimonials/actions";
import { EditTestimonial } from "./EditTestimonial";

type Props = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteTestimonial(testimonial.id);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{testimonial.clientName}</CardTitle>
        <p className="text-sm text-muted-foreground">{testimonial.companyName}</p>
        <p className="text-sm text-muted-foreground">Rating: {testimonial.rating}</p>
        <p className="text-sm text-muted-foreground">Status: {testimonial.status}</p>
      </CardHeader>
      <CardContent>
        <p>{testimonial.content}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <EditTestimonial testimonial={testimonial} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                testimonial.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
