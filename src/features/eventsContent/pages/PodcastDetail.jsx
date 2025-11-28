// Placeholder - to be implemented
import { memo } from "react";
import BackButton from "@features/common/components/BackButton";
import Header from "@layouts/Header";

const PodcastDetail = () => {
  return (
    <>
      <Header heading="Events and Podcasts" showSearch={false} />
      <div className="scroll-without-header mt-5">
        <div className="flex items-center gap-2.5 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4 mb-5">
          <BackButton />
          <div className="text-2xl font-semibold text-white">Content Details</div>
        </div>
        <div className="text-white text-center py-10">
          Content Detail page - Coming soon
        </div>
      </div>
    </>
  );
};

export default memo(PodcastDetail);

