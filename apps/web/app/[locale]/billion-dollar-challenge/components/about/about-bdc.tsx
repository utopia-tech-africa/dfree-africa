import Image from "next/image";
import Link from "next/link";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutBdc() {
  return (
    <ComponentLayout className="py-6 md:py-12 lg:py-24 space-y-4 lg:space-y-8">
      {/* Top Container: Text Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 lg:gap-16">
        <div className="flex flex-col gap-2">
          <Title text="What it is" />
          <Subtitle
            text="An interactive platform for financial change"
            className="max-w-[500px]"
          />
        </div>

        <div className="flex flex-col items-start gap-3 md:gap-4 transition-all duration-300">
          <p className="text-sm md:text-base lg:text-lg  text-neutral-1000 font-normal">
            The Billion Dollar Challenge is a digital platform where you set
            clear financial goals, track real progress, and stay motivated
            through the strength of community support.
          </p>
          <Link href="#">
            <Button
              variant="default"
              size="lg"
              icon={<ArrowRight className="size-7" />}
              className="text-sm sm:text-base"
            >
              Explore the app
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Container: Featured Image */}
      <div className="w-full overflow-hidden">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1773227130/5a53b2d4-97ca-4e19-92ff-eeff3330a9db.webp"
          }
          alt="BDC Platform Preview"
          sizes="100vw"
          height={720}
          width={1000}
          className="w-full h-auto"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </ComponentLayout>
  );
}
