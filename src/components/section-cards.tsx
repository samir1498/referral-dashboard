
import {
  IconArrowDown,
  IconArrowUp,
  IconUsers,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = {
  title: string;
  value: string;
  type: "up" | "down" | "neutral";
  description: string;
};

function CardItem({ title, value, type, description }: CardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {type === "up" ? (
          <IconArrowUp className="text-muted-foreground h-4 w-4" />
        ) : type === "down" ? (
          <IconArrowDown className="text-muted-foreground h-4 w-4" />
        ) : (
          <IconUsers className="text-muted-foreground h-4 w-4" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}

export function SectionCards({ cards }: { cards: CardProps[] }) {
  return (
    <div className="grid gap-4 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
      {cards.map((card) => (
        <CardItem key={card.title} {...card} />
      ))}
    </div>
  );
}
