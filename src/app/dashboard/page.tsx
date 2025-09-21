import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";
import ReferralTable from "@/interface/ui/components/ReferralTable";
import { SectionCards } from "@/components/section-cards";
import { TestimonialCard } from "@/interface/ui/components/TestimonialCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { TestimonialRepositoryDrizzle } from "@/infrastructure/repositories/TestimonialRepositoryDrizzle";
import { ListTestimonialsUseCase } from "@/application/use-cases/ListTestimonialsUseCase";
import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import { ListReferralsUseCase } from "@/application/use-cases/ListReferralsUseCase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const referralRepository = new ReferralRepositoryDrizzle();
  const listReferralsUseCase = new ListReferralsUseCase(referralRepository);

  const testimonialRepository = new TestimonialRepositoryDrizzle();
  const listTestimonialsUseCase = new ListTestimonialsUseCase(
    testimonialRepository
  );

  const [referrals, testimonials] = await Promise.all([
    listReferralsUseCase.execute(),
    listTestimonialsUseCase.execute(),
  ]);

  const plainReferrals = referrals.map((referral) => ({
    id: referral.id,
    name: referral.name,
    email: referral.email.toString(),
    date: referral.date,
    status: referral.status,
    referrer: {
      id: referral?.referrer?.id,
      name: referral?.referrer?.name,
      email: referral?.referrer?.email,
    },
  }));

  const plainTestimonials = testimonials.map((testimonial) => ({
    id: testimonial.id,
    userId: testimonial.userId,
    clientName: testimonial.clientName,
    companyName: testimonial.companyName,
    content: testimonial.content,
    rating: testimonial.rating,
    status: testimonial.status,
    createdAt: testimonial.createdAt,
    updatedAt: testimonial.updatedAt,
  }));

  const totalReferrals = referrals.length;
  const convertedReferrals = referrals.filter(
    (r) => r.status === ReferralStatus.Converted
  ).length;
  const pendingReferrals = referrals.filter(
    (r) => r.status === ReferralStatus.Pending
  ).length;
  const averageTestimonialRating = testimonials.length
    ? (
        testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      ).toFixed(1)
    : "N/A";

  const cards: {
    title: string;
    value: string;
    type: "up" | "down" | "neutral";
    description: string;
  }[] = [
    {
      title: "Total Referrals",
      value: totalReferrals.toString(),
      type: "neutral",
      description: "Total referrals in the system",
    },
    {
      title: "Converted Referrals",
      value: convertedReferrals.toString(),
      type: "up",
      description: "Referrals that have been converted",
    },
    {
      title: "Pending Referrals",
      value: pendingReferrals.toString(),
      type: "neutral",
      description: "Referrals awaiting conversion",
    },
    {
      title: "Avg. Testimonial Rating",
      value: averageTestimonialRating.toString(),
      type: "neutral",
      description: "Average rating from testimonials",
    },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const referralsByMonth = referrals.reduce((acc, referral) => {
    const month = new Date(referral.date).getMonth();
    const monthName = months[month];
    acc[monthName] = (acc[monthName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const testimonialsByMonth = testimonials.reduce((acc, testimonial) => {
    const date =
      testimonial.createdAt instanceof Date
        ? testimonial.createdAt
        : new Date();
    const month = date.getMonth();
    const monthName = months[month];
    acc[monthName] = (acc[monthName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = months.map((month) => ({
    month,
    Referrals: referralsByMonth[month] || 0,
    Testimonials: testimonialsByMonth[month] || 0,
  }));

  const chartConfig = {
    Referrals: {
      label: "Referrals",
      color: "var(--color-chart-1)",
    },
    Testimonials: {
      label: "Testimonials",
      color: "var(--color-chart-1)",
    },
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards cards={cards} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive
            chartData={chartData}
            chartConfig={chartConfig}
          />
        </div>
        <div className="px-4 lg:px-6">
          <ReferralTable items={plainReferrals} />
        </div>
        <div className="px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plainTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
