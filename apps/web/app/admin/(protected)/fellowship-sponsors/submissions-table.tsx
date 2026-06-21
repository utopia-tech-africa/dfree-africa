import type { FellowshipSponsorSummary } from "@/lib/fellowship-sponsors/types";

import { SubmissionRow } from "./submission-row";

type SubmissionsTableProps = {
  submissions: FellowshipSponsorSummary[];
};

const headerCellClassName =
  "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600";

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[48rem] border-collapse">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th scope="col" className={headerCellClassName}>
              Contact
            </th>
            <th scope="col" className={headerCellClassName}>
              Organization
            </th>
            <th scope="col" className={headerCellClassName}>
              Sponsorship
            </th>
            <th scope="col" className={headerCellClassName}>
              Submitted
            </th>
            <th scope="col" className={`${headerCellClassName} text-right`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <SubmissionRow key={submission.id} submission={submission} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
