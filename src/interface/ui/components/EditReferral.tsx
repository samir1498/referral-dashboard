"use client";
import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editReferral } from "@/app/dashboard/referrals/actions";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Email } from "@/domain/value-objects/Email";

type Props = {
  referral: {
    id: string;
    name: string;
    email: string;
    date: Date;
    status: ReferralStatus;
    referrer: {
      id?: string;
      name?: string;
      email?: string;
    };
  };
};

export function EditReferral({ referral }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<ReferralStatus>(ReferralStatus.Pending);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (referral) {
      setName(referral.name);
      setEmail(referral.email.toString());
      setStatus(referral.status);
    }
  }, [referral]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (referral) {
      setLoading(true);
      await editReferral({
        id: referral.id,
        name,
        email: new Email(email),
        status,
      });
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Referral</DialogTitle>
          <DialogDescription>
            Edit the details of this referral.
          </DialogDescription>
        </DialogHeader>
        {referral && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Select
              onValueChange={(value: ReferralStatus) => setStatus(value)}
              value={status}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ReferralStatus).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={loading}>
              {" "}
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
