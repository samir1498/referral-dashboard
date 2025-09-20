"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";

type Props = {
  items: {
    id: string;
    name: string;
    email: string;
    date: Date;
    status: ReferralStatus;
    referrer: {
      id: string | undefined;
      name: string | undefined;
      email: string | undefined;
    };
  }[];
};

export default function ReferralTable({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referrals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Referred By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email?.toString()}</TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Converted" ? "default" : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.referrer && (
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={undefined} />
                        <AvatarFallback>
                          {item?.referrer?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{item.referrer.name}</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
