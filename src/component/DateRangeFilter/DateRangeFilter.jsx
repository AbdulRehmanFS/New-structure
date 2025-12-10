"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker, Select, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;

const DateRangeFilter = ({ onFilterChange }) => {
  const accountCreatedAt = useSelector(
    (state) => state?.signIn?.data?.createdAt
  );

  const [filter, setFilter] = useState({
    type: "current",
    start: null,
    end: null,
  });

  const [customRange, setCustomRange] = useState(null);

  // ✅ Format function to return clean string
  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

  const applyFilter = (type, customDates = null) => {
    let start = null;
    let end = null;

    if (type === "custom" && customDates) {
      start = formatDate(customDates[0]);
      end = formatDate(customDates[1]);
    }

    const newFilter = { type, start, end };
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  const handlePresetChange = (value) => {
    if (value === "current") {
      applyFilter("current");
    } else {
      applyFilter("custom", customRange);
    }
  };

  const handleCustomChange = (dates) => {
    setCustomRange(dates);
    if (dates) {
      applyFilter("custom", dates);
    }
  };

  // ✅ Trigger once on mount with default = current
  useEffect(() => {
    onFilterChange(filter);
  }, []);
  const today = dayjs();
  const accountStart = dayjs(accountCreatedAt);

  console.log("today:", today.format("YYYY-MM-DD"));
  console.log("accountStart:", accountStart.format("YYYY-MM-DD"));

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#d32f2f",
          colorBgContainer: "#1e1e1e",
          colorBgElevated: "#1e1e1e",
          colorBorder: "#333",
          colorText: "#fff",
          colorTextPlaceholder: "#aaa",
          borderRadius: 6,
          controlItemBgHover: "#333",
          controlItemBgActive: "#2a2a2a",
          controlOutline: "rgba(211, 47, 47, 0.3)",
        },
      }}
    >
      <div className="flex gap-3 items-center">
        <Select
          value={filter.type}
          onChange={handlePresetChange}
          style={{ width: 200, marginRight: 12 }} // 👈 manual space
            suffixIcon={<DownOutlined  style={{ color: "white" }} />} // 👈 custom arrow icon
        >
          <Option value="current">Current</Option>
          <Option value="custom">Custom</Option>
        </Select>

        {filter.type === "custom" && (
          <RangePicker
            value={customRange}
            onChange={handleCustomChange}
            format="YYYY-MM-DD"
            disabledDate={(date) =>
              date.isBefore(dayjs(accountStart), "day") ||
              date.isAfter(dayjs(today), "day")
            }
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default DateRangeFilter;
