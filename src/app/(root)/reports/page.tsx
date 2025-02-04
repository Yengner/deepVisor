// src/app/reports/page.tsx
import MainReport from "@/components/reports/MainReportsPage";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getTopAdAccounts } from "@/lib/api/getTopAdAccounts";
import React from "react";

export default async function Reports() {
  const loggedIn = await getLoggedInUser();
  const userId = loggedIn?.id;
  const metrics = await getTopAdAccounts(userId)
  return (
    <MainReport metrics={metrics} />
  );
};

