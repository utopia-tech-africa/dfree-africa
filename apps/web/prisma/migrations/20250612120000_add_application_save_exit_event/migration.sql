-- CreateTable
CREATE TABLE "application_save_exit_event" (
    "id" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "stepKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_save_exit_event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "application_save_exit_event_step_createdAt_idx" ON "application_save_exit_event"("step", "createdAt");
