import Footer from "@/components/footer/footer";
import { PageTitle } from "@/components/page-title/page-title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Title } from "@/components/title-and-subtitle/title";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className="grid h-screen place-items-center \">
      <div className="relative flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-amber-50 p-8 shadow-lg">
        <div className="absolute inset-0 rounded-lg bg-linear-to-t from-black via-transparent to-transparent z-0" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <PageTitle
            text="Sample Text For Page Titles and More"
            className="text-center"
          />
          <Title text="Welcome to the Home Page" />
          <Subtitle text="This is a subtitle" />
          <Button
            variant="default"
            size="lg"
            className="bg-purple-400"
            icon={<ArrowBigRight />}
          >
            Click Me
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
