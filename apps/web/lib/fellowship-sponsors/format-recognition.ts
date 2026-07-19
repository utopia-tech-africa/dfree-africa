import type { RecognitionPreferenceValue } from "@/lib/forms/schemas/leadership-institute-sponsor";

const recognitionLabels: Record<RecognitionPreferenceValue, string> = {
  cohort_program_listing: "Cohort program listing",
  website_recognition: "Website recognition",
  social_media_spotlight: "Social media spotlight",
  annual_impact_report: "Annual impact report",
  orientation_invitation: "Orientation invitation",
  capstone_showcase_invitation: "Capstone showcase invitation",
  fellow_introduction: "Fellow introduction",
  logo_placement: "Logo placement",
};

export function formatRecognitionPreference(
  value: RecognitionPreferenceValue,
): string {
  return recognitionLabels[value];
}

export function formatRecognitionPreferences(
  values: RecognitionPreferenceValue[],
): string {
  if (values.length === 0) {
    return "—";
  }

  return values.map(formatRecognitionPreference).join(", ");
}
