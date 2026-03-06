import { FinFestBanner } from "./components";
import { FinfestHero } from "./components/finfest-hero";
import { FinfestObjective } from "./components/finfest-objective";
import FinfestMovement from "./components/finfest-objective/finfest-movement";

export default function FinFestPage() {
  return (
    <div>
      <FinfestHero />
      <FinfestObjective />
      <FinfestMovement />
      <FinFestBanner />
    </div>
  );
}
