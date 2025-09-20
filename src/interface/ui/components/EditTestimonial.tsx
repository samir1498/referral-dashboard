"use client";
import React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Testimonial } from "@/domain/entities/Testimonial";

type Props = {
  testimonial: Testimonial | null;
  onEdit: (testimonial: Testimonial) => void;
  onOpenChange: (open: boolean) => void;
};

export function EditTestimonial({ testimonial, onEdit, onOpenChange }: Props) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonial) {
      onEdit(new Testimonial(testimonial.id, name, company, testimonialText, avatar));
    }
  };

  return (
    <Dialog open={!!testimonial} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit testimonial</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Textarea
            placeholder="Testimonial"
            value={testimonialText}
            onChange={(e) => setTestimonialText(e.target.value)}
            required
          />
          <Input
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
