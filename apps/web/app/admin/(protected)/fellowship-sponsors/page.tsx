import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FellowshipSponsorsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
        Fellowship Sponsors
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            Sponsor form submissions will be listed here once the public form is
            live.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
