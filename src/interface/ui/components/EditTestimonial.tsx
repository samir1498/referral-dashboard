"use client";
import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Testimonial } from "@/domain/entities/Testimonial";
import { editTestimonial } from "@/app/dashboard/testimonials/actions";
import { DialogTrigger } from "@radix-ui/react-dialog";

type Props = {
  testimonial: Testimonial | null;
};

export function EditTestimonial({ testimonial }: Props) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name);
      setCompany(testimonial.company);
      setTestimonialText(testimonial.testimonial);
      setAvatar(testimonial.avatar || "");
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonial) {
      await editTestimonial({
        id: testimonial.id,
        name,
        company,
        testimonial: testimonialText,
        avatar,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Testimonial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>
        {testimonial && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" defaultValue={testimonial.name} required />
            <Input name="company" defaultValue={testimonial.company} required />
            <Textarea
              name="testimonial"
              defaultValue={testimonial.testimonial}
              required
            />
            <Input name="avatar" defaultValue={testimonial.avatar ?? ""} />
            <Button type="submit">Save</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
