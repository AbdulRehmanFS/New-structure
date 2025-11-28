const Revenue = ({ data }) => (
  <div className="font-inherit py-3 flex flex-col gap-4 border-b border-white opacity-80">
    <div className="flex justify-between items-center">
      <div className="text-white">Total Revenue: $ {data?.total_revenue}</div>
      <div className="text-white">{data?.date}</div>
    </div>
    <div className="border-l-3 border-white pl-1.5 flex flex-col gap-2">
      <div className="py-2 px-2 rounded-md bg-[#303030] text-white">$ {data?.total_revenue_full}</div>
    </div>
  </div>
);

export default Revenue;

