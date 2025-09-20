"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


type Props = {
  onAdd: (testimonial: {
    name: string;
    company: string;
    testimonial: string;
    avatar?: string;
  }) => void;
};

export function AddTestimonial({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, company, testimonial, avatar });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Testimonial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new testimonial</DialogTitle>
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
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            required
          />
          <Input
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
