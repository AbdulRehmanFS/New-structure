/* eslint-disable react/prop-types */
export function DetailDescription({ content, heading = "Description" }) {
  return (
    <div className="flex flex-col gap-0">
      <div className="text-lg font-bold">{heading}</div>
      <div className="p-2.5 max-h-[200px] overflow-auto">{content}</div>
    </div>
  );
}

