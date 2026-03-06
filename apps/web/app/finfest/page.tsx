import {
  FinFestBanner,
  FinFestPastSpeakers,
  FinFestTestimonials,
} from "./components";

export default function FinFestPage() {
  return (
    <div className="space-y-10">
      <FinFestPastSpeakers />
      <FinFestTestimonials />
      <FinFestBanner />
    </div>
  );
}
