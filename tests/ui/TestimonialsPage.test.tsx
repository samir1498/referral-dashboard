import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestimonialsPage from "@/app/dashboard/testimonials/page";
import { Testimonial } from "@/domain/entities/Testimonial";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";

vi.mock("@/app/dashboard/testimonials/actions", () => ({
  getTestimonials: vi.fn(),
  deleteTestimonial: vi.fn(),
  addTestimonial: vi.fn(),
  editTestimonial: vi.fn(),
}));

// Import the mocked functions
import {
  getTestimonials,
  deleteTestimonial,
  addTestimonial,
  editTestimonial,
} from "@/app/dashboard/testimonials/actions";

describe("TestimonialsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the testimonials", async () => {
    const mockTestimonials = [
      new Testimonial(
        "1",
        "John Doe",
        "Acme Inc.",
        "This is a great product!",
        "https://example.com/avatar.png",
        5,
        "Approved"
      ),
    ];
    (getTestimonials as Mock).mockResolvedValue(mockTestimonials);

    render(<TestimonialsPage />);

    // Wait for the loading state to disappear and content to appear
    await waitFor(() => {
      expect(
        screen.queryByText("Loading testimonials...")
      ).not.toBeInTheDocument();
    });

    // Assert on the company name and testimonial content
    expect(screen.getByText("Acme Inc.")).toBeInTheDocument();
    expect(
      screen.getByText("This is a great product!")
    ).toBeInTheDocument();
  });

  it("should add a testimonial", async () => {
    const user = userEvent.setup();
    (getTestimonials as Mock).mockResolvedValue([]); // Start with no testimonials

    render(<TestimonialsPage />);

    await waitFor(() => {
      expect(
        screen.queryByText("Loading testimonials...")
      ).not.toBeInTheDocument();
    });

    // Mock the addTestimonial function
    (addTestimonial as Mock).mockResolvedValue({ success: true });

    await user.click(screen.getByText("Add Testimonial"));

    // Wait for the dialog to appear
    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: "Add Testimonial" })
      ).toBeInTheDocument();
    });

    // Fill out the form
    await user.type(
      screen.getByPlaceholderText("Client Name"),
      "Jane Doe"
    );
    await user.type(
      screen.getByPlaceholderText("Company Name"),
      "Innovate LLC"
    );
    await user.type(
      screen.getByPlaceholderText("Content"),
      "This is a fantastic product!"
    );
    await user.type(
      screen.getByPlaceholderText("Rating (1-5)"),
      "4"
    );
    await user.type(
      screen.getByPlaceholderText("Status (e.g., Approved, Pending)"),
      "Approved"
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      // Expect only the fields actually sent by the component
      expect(addTestimonial).toHaveBeenCalledWith({
        userId: "1", // Dummy value for now
        clientName: "Jane Doe",
        companyName: "Innovate LLC",
        content: "This is a fantastic product!",
        rating: 4,
        status: "Approved",
      });
    });
  });

  it("should edit a testimonial", async () => {
    const user = userEvent.setup(); // Setup userEvent
    const mockTestimonial = new Testimonial(
      "1",
      "John Doe",
      "Acme Inc.",
      "This is a great product!",
      "https://example.com/avatar.png",
      5,
      "Approved"
    );
    (getTestimonials as Mock).mockResolvedValue([mockTestimonial]);

    render(<TestimonialsPage />);

    await waitFor(() => {
      expect(screen.queryByText("Loading testimonials...")).not.toBeInTheDocument();
    });

    // Mock the editTestimonial function
    (editTestimonial as Mock).mockResolvedValue({ success: true });

    await user.click(screen.getByRole("button", { name: /Edit/i }));

    // Wait for the dialog to appear before interacting with its elements
    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: /Edit Testimonial/i })).toBeInTheDocument();
    });

    // Use data-testid for inputs
    const clientNameInput = screen.getByTestId("client-name-input");
    await user.clear(clientNameInput);
    await user.type(clientNameInput, "John Doe Updated");

    const companyNameInput = screen.getByTestId("company-name-input");
    await user.clear(companyNameInput);
    await user.type(companyNameInput, "Acme Inc. Updated");

    const contentTextarea = screen.getByTestId("content-textarea");
    await user.clear(contentTextarea);
    await user.type(contentTextarea, "This is an updated product!");

    const ratingInput = screen.getByTestId("rating-input");
    await user.clear(ratingInput);
    await user.type(ratingInput, "4");

    const statusInput = screen.getByTestId("status-input");
    await user.clear(statusInput);
    await user.type(statusInput, "Pending");

    await user.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(editTestimonial).toHaveBeenCalledWith({
        id: "1",
        clientName: "John Doe Updated",
        companyName: "Acme Inc. Updated",
        content: "This is an updated product!",
        rating: 4,
        status: "Pending",
      });
    });
  });

  it("should delete a testimonial", async () => {
    const user = userEvent.setup();
    const mockTestimonial = new Testimonial(
      "1",
      "John Doe",
      "Acme Inc.",
      "This is a great product!",
      "https://example.com/avatar.png",
      5,
      "Approved"
    );
    (getTestimonials as Mock).mockResolvedValue([mockTestimonial]);

    render(<TestimonialsPage />);

    await waitFor(() => {
      expect(
        screen.queryByText("Loading testimonials...")
      ).not.toBeInTheDocument();
    });

    (deleteTestimonial as Mock).mockResolvedValue({ success: true });

    await user.click(screen.getByRole("button", { name: /Delete/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("alertdialog", { name: /Are you absolutely sure?/i })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Continue" }));

    await waitFor(() => {
      expect(deleteTestimonial).toHaveBeenCalledWith("1");
    });
  });
});
