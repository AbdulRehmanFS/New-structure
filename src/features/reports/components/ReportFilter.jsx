import DateSelector from "@components/DateSelector";

const ReportFilter = ({ handleDateChange }) => {
  return (
    <div>
      <div className="text-base" style={{ fontSize: "16px" }}>
        Extract Report
      </div>
      <div
        className="flex justify-between flex-wrap my-5 gap-[15px]"
        style={{ margin: "20px 0" }}
      >
        <div className="flex flex-wrap gap-[50px]">
          <div className="flex items-center gap-[15px]">
            From Date
            <DateSelector
              onChange={(e) => handleDateChange(e, "from")}
              extraOptions={{ suffixIcon: null }}
            />
          </div>
          <div className="flex items-center gap-[15px]">
            To Date
            <DateSelector
              onChange={(e) => handleDateChange(e, "to")}
              extraOptions={{ suffixIcon: null }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilter;


