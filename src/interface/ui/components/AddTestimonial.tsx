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
      userId: "1", // Dummy value for now
      clientName: formData.get("clientName") as string,
      companyName: formData.get("companyName") as string,
      content: formData.get("content") as string,
      rating: parseInt(formData.get("rating") as string),
      status: formData.get("status") as string,
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
          <Input name="clientName" placeholder="Client Name" required disabled={loading} />
          <Input name="companyName" placeholder="Company Name" required disabled={loading} />
          <Textarea name="content" placeholder="Content" required disabled={loading} />
          <Input name="rating" type="number" placeholder="Rating (1-5)" required disabled={loading} />
          <Input name="status" placeholder="Status (e.g., Approved, Pending)" required disabled={loading} />
          <Button type="submit" disabled={loading}> {loading ? "Adding..." : "Save"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
