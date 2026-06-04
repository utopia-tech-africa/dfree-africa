"use client";

import { InViewVideo } from "@/components/in-view-video";

const FinfestVideos = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
      <div className="w-full rounded-2xl overflow-hidden">
        <InViewVideo
          className="w-full"
          src="https://res.cloudinary.com/dan9camhs/video/upload/v1777898923/Video_-_FinFe_t_Prudential_Partner_Portia_bidjen.mp4"
          loop
          muted
        />
      </div>
      <div className="w-full rounded-2xl overflow-hidden">
        <InViewVideo
          className="w-full"
          src="https://res.cloudinary.com/dan9camhs/video/upload/v1777899145/Video_RWJ_Barnabas_Health_k78x7e.mp4"
          loop
          muted
        />
      </div>
    </section>
  );
};

export default FinfestVideos;
