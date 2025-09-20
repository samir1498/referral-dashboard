import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p>Manage your application settings here.</p>
      <div className="flex items-center justify-between">
        <span>Toggle Theme</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
