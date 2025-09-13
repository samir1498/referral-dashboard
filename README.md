# Referral Dashboard

Referral Dashboard is a full-stack application designed to help a business track and manage its customer referral program. It provides a clean and intuitive interface for users to add new referrals, monitor their status, and view the entire referral pipeline at a glance.

This project demonstrates the development of a modern, feature-rich web application from the ground up, focusing on a great user experience and a robust, scalable backend.

---

## ✨ Key Features

- **Referral Management:** Easily add new referrals with their name, email, and associated details.
- **Status Tracking:** Each referral is clearly marked with a status (e.g., `Pending` or `Converted`), providing a real-time view of the conversion funnel.
- **Centralized Dashboard:** A single-page interface to view, search, and manage all referral activity.
- **(Planned) Analytics & Insights:** Future updates will include visual charts and key metrics to help understand referral program performance.
- **(Planned) Testimonial Collection:** A feature to gather and manage testimonials from successfully converted referrals.

---

## 🛠️ Technical Details

While the focus is on the user-facing features, the project is built on a professional-grade technical foundation designed for scalability and maintainability.

- **Architecture:** The project uses a layered architecture (inspired by Clean Architecture and DDD) to keep the code organized, testable, and easy to modify as new features are added.
- **Type-Safe Database:** Drizzle ORM is used for all database interactions, ensuring that queries are type-safe and preventing common data-related bugs.
- **Modern Frontend:** The interface is built with the Next.js App Router, using Server Components for performance and Client Components for a rich, interactive experience.

### Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Unit Testing:** [Vitest](https://vitest.dev/)
- **E2E Testing:** [Playwright](https://playwright.dev/)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd referral-dashboard
    ```

2. **Install dependencies:**
    This project uses `pnpm` as the package manager.

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root of the project and add your PostgreSQL connection string:

    ```env
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```

4. **Run database migrations:**
    Apply the schema to your database using Drizzle Kit.

    ```bash
    pnpm dlx drizzle-kit migrate
    ```

5. **Run the development server:**

    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
