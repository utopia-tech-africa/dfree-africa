-- CreateTable
CREATE TABLE "form_acknowledgement_template" (
    "id" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "bodyHtml" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "form_acknowledgement_template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "form_acknowledgement_template_formType_key" ON "form_acknowledgement_template"("formType");
