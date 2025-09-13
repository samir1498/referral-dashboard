"use client";
import React from "react";
type Props = {
  items: {
    id: string;
    name: string;
    email: string;
    date: string;
    status: string;
  }[];
};
export default function ReferralTable({ items }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((i) => (
          <tr key={i.id}>
            <td>{i.name}</td>
            <td>{i.email}</td>
            <td>{i.date}</td>
            <td>{i.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
