import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TestimonialsPage from "@/app/dashboard/testimonials/page";
import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect, vi } from "vitest";

describe("TestimonialsPage", () => {
  it("should render the testimonials", async () => {
    const testimonials = [
      new Testimonial(
        "1",
        "John Doe",
        "Acme Inc.",
        "This is a great product!",
        "https://example.com/avatar.png"
      ),
    ];
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(testimonials),
    });

    render(<TestimonialsPage />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("should add a testimonial", async () => {
    const testimonials: Testimonial[] = [];
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(testimonials),
    });

    render(<TestimonialsPage />);

    fireEvent.click(screen.getByText("Add Testimonial"));

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Company"), {
      target: { value: "Innovate LLC" },
    });
    fireEvent.change(screen.getByPlaceholderText("Testimonial"), {
      target: { value: "This is a fantastic product!" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Jane Doe",
          company: "Innovate LLC",
          testimonial: "This is a fantastic product!",
          avatar: "",
        }),
      });
    });
  });

  it("should edit a testimonial", async () => {
    const testimonials = [
      new Testimonial(
        "1",
        "John Doe",
        "Acme Inc.",
        "This is a great product!",
        "https://example.com/avatar.png"
      ),
    ];
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(testimonials),
    });

    render(<TestimonialsPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Edit"));
    });

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe Updated" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/testimonials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "1",
          name: "John Doe Updated",
          company: "Acme Inc.",
          testimonial: "This is a great product!",
          avatar: "https://example.com/avatar.png",
        }),
      });
    });
  });

  it("should delete a testimonial", async () => {
    const testimonials = [
      new Testimonial(
        "1",
        "John Doe",
        "Acme Inc.",
        "This is a great product!",
        "https://example.com/avatar.png"
      ),
    ];
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(testimonials),
    });

    render(<TestimonialsPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Delete"));
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/testimonials", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "1" }),
      });
    });
  });
});
