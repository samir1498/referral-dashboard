"use client";
import React, { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { EditReferral } from "./EditReferral";
import { deleteReferral } from "@/app/dashboard/referrals/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { editReferral } from "@/app/dashboard/referrals/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  items: {
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
  }[];
};

export default function ReferralTable({ items }: Props) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isChangingStatus, startStatusChangeTransition] = useTransition();

  const handleDelete = async (id: string) => {
    startDeleteTransition(async () => {
      await deleteReferral(id);
    });
  };

  const handleChangeStatus = async (id: string, status: ReferralStatus) => {
    startStatusChangeTransition(async () => {
      await editReferral({ id, status });
    });
  };

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
              <TableHead>Actions</TableHead>
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
                      item.status === ReferralStatus.Converted
                        ? "default"
                        : "secondary"
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
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-0" align="end">
                      <div className="flex flex-col p-2">
                        <EditReferral referral={item} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="justify-start"
                              disabled={isDeleting}
                            >
                              {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the referral.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                disabled={isDeleting}
                              >
                                {isDeleting ? "Deleting..." : "Continue"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Select
                          onValueChange={(value: ReferralStatus) =>
                            handleChangeStatus(item.id, value)
                          }
                          value={item.status}
                          disabled={isChangingStatus}
                        >
                          <SelectTrigger className="w-full justify-start text-left px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ReferralStatus).map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
