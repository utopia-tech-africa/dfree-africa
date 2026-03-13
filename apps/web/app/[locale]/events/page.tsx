import { Events } from "@/app/components/events";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";

const EventsPage = () => {
  return (
    <div className="flex flex-col my-20 lg:my-20">
      <ComponentLayout>
        <Subtitle text="All Events" />
      </ComponentLayout>
      <Events showHeader={false} layout="grid" />
    </div>
  );
};

export default EventsPage;
