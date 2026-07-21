import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin/get-admin-session";
import { buildFellowshipApplicationsCsv } from "@/lib/fellowship-applications/export-csv";
import { getFellowshipApplicationsForExport } from "@/lib/fellowship-applications/get-submissions";
import {
  isFellowshipApplicationReviewStatus,
  type FellowshipApplicationReviewStatus,
} from "@/lib/fellowship-applications/review-status";

export const runtime = "nodejs";

function parseCohort(value: string | null): "spring" | "fall" | "all" {
  if (value === "spring" || value === "fall") {
    return value;
  }

  return "all";
}

function parseReviewStatus(
  value: string | null,
): FellowshipApplicationReviewStatus | "all" {
  if (!value || value === "all") {
    return "all";
  }

  if (isFellowshipApplicationReviewStatus(value)) {
    return value;
  }

  return "all";
}

export async function GET(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const reviewStatus = parseReviewStatus(searchParams.get("status"));
  const cohortTerm = parseCohort(searchParams.get("cohort"));

  const rows = await getFellowshipApplicationsForExport({
    reviewStatus,
    cohortTerm,
  });

  const csv = buildFellowshipApplicationsCsv(rows);
  const stamp = new Date().toISOString().slice(0, 10);
  const filename = `fellowship-applications-${stamp}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
