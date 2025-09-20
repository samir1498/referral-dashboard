import React, { useState, useEffect } from "react";
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlainTestimonial } from "@/domain/entities/Testimonial";

type Props = {
  testimonial: PlainTestimonial | null;
  onEdit: (testimonial: PlainTestimonial) => Promise<void>;
  onOpenChange: (open: boolean) => void;
};

export function EditTestimonial({ testimonial, onEdit, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await onEdit({
        id: testimonial.id,
        name,
        company,
        testimonial: testimonialText,
        avatar,
      });
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!testimonial} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>
        {testimonial && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" defaultValue={testimonial.name} required disabled={loading} />
            <Input name="company" defaultValue={testimonial.company} required disabled={loading} />
            <Textarea
              name="testimonial"
              defaultValue={testimonial.testimonial}
              required
              disabled={loading}
            />
            <Input name="avatar" defaultValue={testimonial.avatar ?? ""} disabled={loading} />
            <Button type="submit" disabled={loading}> {loading ? "Saving..." : "Save"}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
