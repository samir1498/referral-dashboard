import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import TestimonialsPage from "@/app/dashboard/testimonials/page";
import { getTestimonials, addTestimonial, editTestimonial, deleteTestimonial } from "@/app/dashboard/testimonials/actions";
import { Testimonial } from "@/domain/entities/Testimonial";

// Mock the server actions
vi.mock("@/app/dashboard/testimonials/actions", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...Object(actual),
    getTestimonials: vi.fn(),
    addTestimonial: vi.fn(),
    editTestimonial: vi.fn(),
    deleteTestimonial: vi.fn(),
  };
});

describe("TestimonialsPage", () => {
  beforeEach(() => {
    // Reset mocks before each test
    (getTestimonials as Mock).mockReset();
    (addTestimonial as Mock).mockReset();
    (editTestimonial as Mock).mockReset();
    (deleteTestimonial as Mock).mockReset();

    // Default mock implementation for getTestimonials
    (getTestimonials as Mock).mockResolvedValue([
      new Testimonial(
        "1",
        "user1",
        "John Doe",
        "Acme Inc.",
        "This is a great product!",
        5,
        "Approved",
        new Date(),
        new Date()
      ),
    ]);
  });

  it("should render the testimonials", async () => {
    render(await TestimonialsPage());

    // Assert on the company name and testimonial content
    expect(screen.getByText("Acme Inc.")).toBeInTheDocument();
    expect(
      screen.getByText("This is a great product!")
    ).toBeInTheDocument();
  });

  it("should add a testimonial", async () => {
    const user = userEvent.setup();
    (addTestimonial as Mock).mockResolvedValue({ success: true });

    render(await TestimonialsPage());

    await user.click(screen.getByText("Add Testimonial"));

    // Wait for the dialog to appear
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Fill the form
    await user.type(screen.getByPlaceholderText("Client Name"), "New Client");
    await user.type(screen.getByPlaceholderText("Company Name"), "New Company");
    await user.type(screen.getByPlaceholderText("Content"), "New Content");
    await user.type(screen.getByPlaceholderText("Rating (1-5)"), "4");
    await user.type(
      screen.getByPlaceholderText("Status (e.g., Approved, Pending)"),
      "Pending"
    );

    // Submit the form
    await user.click(screen.getByRole("button", { name: /Save/i }));

    // Assert that addTestimonial was called
    expect(addTestimonial).toHaveBeenCalledWith({
      userId: "1",
      clientName: "New Client",
      companyName: "New Company",
      content: "New Content",
      rating: 4,
      status: "Pending",
    });

    // Assert that the dialog is closed
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should edit a testimonial", async () => {
    const user = userEvent.setup();
    (editTestimonial as Mock).mockResolvedValue({ success: true });

    render(await TestimonialsPage());

    // Click the edit button (assuming it's rendered)
    await user.click(screen.getByRole("button", { name: /Edit/i }));

    // Wait for the dialog to appear
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Fill the form
    await user.clear(screen.getByTestId("client-name-input"));
    await user.type(screen.getByTestId("client-name-input"), "Updated Client");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /Save/i }));

    // Assert that editTestimonial was called
    expect(editTestimonial).toHaveBeenCalledWith({
      id: "1",
      clientName: "Updated Client",
      companyName: "Acme Inc.", // Original value
      content: "This is a great product!", // Original value
      rating: 5, // Original value
      status: "Approved", // Original value
    });

    // Assert that the dialog is closed
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should delete a testimonial", async () => {
    const user = userEvent.setup();
    (deleteTestimonial as Mock).mockResolvedValue({ success: true });

    // Mock getTestimonials to return an empty array after deletion
    (getTestimonials as Mock).mockResolvedValueOnce([
      new Testimonial(
        "1",
        "user1",
        "John Doe",
        "Acme Inc.",
        "This is a great product!",
        5,
        "Approved",
        new Date(),
        new Date()
      ),
    ]).mockResolvedValueOnce([]); // First call returns data, second call returns empty

    const { rerender } = render(await TestimonialsPage());

    // Click the delete button (assuming it's rendered)
    await user.click(screen.getByRole("button", { name: /Delete/i }));

    // Confirm deletion in the alert dialog
    await waitFor(() => {
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });
    await user.click(screen.getByRole("button", { name: /Continue/i }));

    // Re-render the component to reflect the changes
    await rerender(await TestimonialsPage());

    // Assert that deleteTestimonial was called
    expect(deleteTestimonial).toHaveBeenCalledWith("1");

    // Assert that the testimonial is removed from the document
    await waitFor(() => {
      expect(screen.queryByText("Acme Inc.")).not.toBeInTheDocument();
    });
  });
});
