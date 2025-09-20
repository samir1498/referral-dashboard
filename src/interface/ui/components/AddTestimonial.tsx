"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addTestimonial } from "@/app/dashboard/testimonials/actions";

export function AddTestimonial() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await addTestimonial({
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      testimonial: formData.get("testimonial") as string,
      avatar: formData.get("avatar") as string,
    });
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Testimonial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Testimonial</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Name" required disabled={loading} />
          <Input name="company" placeholder="Company" required disabled={loading} />
          <Textarea name="testimonial" placeholder="Testimonial" required disabled={loading} />
          <Input name="avatar" placeholder="Avatar URL (optional)" disabled={loading} />
          <Button type="submit" disabled={loading}> {loading ? "Adding..." : "Save"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
