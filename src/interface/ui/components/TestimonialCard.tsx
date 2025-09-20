import React from "react";
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/domain/entities/Testimonial";

type Props = {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
};

export function TestimonialCard({ testimonial, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{testimonial.name}</CardTitle>
            <p className="text-sm text-gray-500">{testimonial.company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{testimonial.testimonial}</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onEdit(testimonial)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(testimonial.id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
