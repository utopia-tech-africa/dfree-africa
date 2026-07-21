-- AlterTable
ALTER TABLE "form_submission" ADD COLUMN "reviewStatus" TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE "form_submission" ADD COLUMN "reviewedAt" TIMESTAMP(3);
ALTER TABLE "form_submission" ADD COLUMN "reviewedBy" TEXT;

-- CreateIndex
CREATE INDEX "form_submission_type_reviewStatus_idx" ON "form_submission"("type", "reviewStatus");
