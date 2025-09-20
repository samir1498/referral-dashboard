# Plan for Testimonial Domain

1. **Domain Layer:**
    * Create a `Testimonial` entity with the following properties:
        * `id`: string
        * `name`: string
        * `company`: string
        * `testimonial`: string
        * `avatar`: string (optional)
    * Create an `ITestimonialRepository` interface with the following methods:
        * `findAll(): Promise<Testimonial[]>`
        * `findById(id: string): Promise<Testimonial | null>`
        * `add(testimonial: Testimonial): Promise<void>`
        * `update(testimonial: Testimonial): Promise<void>`
        * `delete(id: string): Promise<void>`

2. **Infrastructure Layer:**
    * Create a `TestimonialRepositoryDrizzle` class that implements the `ITestimonialRepository` interface.
    * Update the database schema in `src/infrastructure/db/schema.ts` to include a `testimonials` table.
    * Update the `seed.ts` and `clear.ts` scripts to include testimonials.

3. **Application Layer:**
    * Create a `ListTestimonialsUseCase` that will use the `ITestimonialRepository` to fetch all testimonials.
    * Create an `AddTestimonialUseCase` that will use the `ITestimonialRepository` to add a new testimonial.
    * Create an `EditTestimonialUseCase` that will use the `ITestimonialRepository` to edit an existing testimonial.
    * Create a `DeleteTestimonialUseCase` that will use the `ITestimonialRepository` to delete a testimonial.

4. **Interface Layer:**
    * Create a new API route at `src/app/api/testimonials/route.ts` to handle fetching, adding, updating, and deleting testimonials.
    * Create a new page at `src/app/dashboard/testimonials/page.tsx` to display the testimonials.
    * Create a `TestimonialCard` component to display a single testimonial, including "Edit" and "Delete" buttons.
    * Create an `AddTestimonial` component with a form to add a new testimonial.
    * Create an `EditTestimonial` component with a form to edit an existing testimonial.
