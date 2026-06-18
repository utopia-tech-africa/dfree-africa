-- CreateTable
CREATE TABLE "form_submission" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledgementSentAt" TIMESTAMP(3),

    CONSTRAINT "form_submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "form_submission_type_createdAt_idx" ON "form_submission"("type", "createdAt");
