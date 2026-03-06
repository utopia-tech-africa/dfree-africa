import {
  FinfestBanner,
  FinfestPastSpeakers,
  FinfestSponsors,
  FinfestTestimonials,
} from "./components";

export default function FinFestPage() {
  return (
    <div className="space-y-10">
      <FinfestPastSpeakers />
      <FinfestSponsors />
      <FinfestTestimonials />
      <FinfestBanner />
    </div>
  );
}
