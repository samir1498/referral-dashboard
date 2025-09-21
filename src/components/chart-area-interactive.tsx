"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

export function ChartAreaInteractive({
  chartData,
  chartConfig,
}: {
  chartData: { month: string; Referrals: number; Testimonials: number }[];
  chartConfig: ChartConfig;
}) {
  const [activeChart, setActiveChart] = React.useState<
    keyof typeof chartConfig
  >(Object.keys(chartConfig)[0]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Referral and Testimonial Trends</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Monthly trends for referrals and testimonials
          </span>
          <span className="@[540px]/card:hidden">Monthly Trends</span>
        </CardDescription>
        <CardAction>
          <Select value={activeChart} onValueChange={setActiveChart}>
            <SelectTrigger
              className="w-[160px] rounded-full data-[state=open]:bg-muted"
              aria-label="Select a value"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(chartConfig).map((key) => (
                <SelectItem key={key} value={key}>
                  {chartConfig[key].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              {Object.keys(chartConfig).map((key) => (
                <linearGradient
                  id={`fill${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={key}
                >
                  <stop
                    offset="5%"
                    stopColor={chartConfig[key].color}
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[key].color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            {Object.keys(chartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key})`}
                stroke={chartConfig[key].color}
                stackId="a"
                hide={activeChart !== key}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
