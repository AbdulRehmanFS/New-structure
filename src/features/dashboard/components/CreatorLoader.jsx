/* eslint-disable react/prop-types */
import { Skeleton } from "antd";

function CreatorLoader({ count = [1, 2] }) {
  return (
    <div className="flex flex-col gap-2">
      {count.map((list) => (
        <div key={list} className="flex gap-1.5">
          <Skeleton.Avatar active size="small" shape="rectangle" />
          <Skeleton.Input size="small" active className="!w-[90%]" />
        </div>
      ))}
    </div>
  );
}

export const ParagraphLoader = ({ rows = 2, avatar = false }) => (
  <div className="flex flex-col gap-2">
    <Skeleton
      active
      avatar={avatar}
      paragraph={{
        rows,
      }}
    />
  </div>
);

export default CreatorLoader;

