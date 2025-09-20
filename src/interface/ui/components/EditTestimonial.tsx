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
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";

type Props = {
  testimonial: Testimonial | null;
};

export function EditTestimonial({ testimonial }: Props) {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setClientName(testimonial.clientName);
      setCompanyName(testimonial.companyName);
      setContent(testimonial.content);
      setRating(testimonial.rating);
      setStatus(testimonial.status);
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonial) {
      setLoading(true);
      await editTestimonial({
        id: testimonial.id,
        clientName,
        companyName,
        content,
        rating,
        status,
      });
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
          <DialogDescription>
            Edit the details of this testimonial.
          </DialogDescription>
        </DialogHeader>
        {testimonial && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              disabled={loading}
            />
            <Textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              name="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
              disabled={loading}
            />
            <Input
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {" "}
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
