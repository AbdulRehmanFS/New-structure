"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker, Select, ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import { theme } from "@utils/theme";
const { Option } = Select;

const DateRangeFilter = ({ onFilterChange }) => {
  const accountCreatedAt = useSelector(
    (state) => state?.signIn?.data?.createdAt
  );

  const [filter, setFilter] = useState({
    type: "current",
    start: null,
    end: dayjs().format("YYYY-MM-DD"),
  });

  const [customRange, setCustomRange] = useState({
    start: null,
    end: null,
  });

  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

  const applyFilter = (type, customDates = null) => {
    let start = null;
    let end = null;

    if (type === "custom" && customDates) {
      start = formatDate(customDates[0]);
      end = formatDate(customDates[1]);
    } else if (type === "current") {
      end = formatDate(dayjs());
    }

    const newFilter = { type, start, end };
    setFilter(newFilter);
  };

  const handlePresetChange = (value) => {
    if (value === "current") {
      applyFilter("current");
    } else {
      const { start, end } = customRange;
      if (start && end) {
        applyFilter("custom", [start, end]);
      } else {
        setFilter((prev) => ({ ...prev, type: "custom" }));
      }
    }
  };

  const handleCustomChange = (date, field) => {
    setCustomRange((prev) => {
      const updated = { ...prev, [field]: date };
      if (updated.start && updated.end) {
        applyFilter("custom", [updated.start, updated.end]);
      }
      return updated;
    });
  };

  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);
  const today = dayjs();
  const accountStart = dayjs(accountCreatedAt);

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
        components: {
          Select: {
            optionSelectedBg: "#2a2a2a",
            optionSelectedColor: "#fff",
            optionActiveBg: "#333",
            colorText: "#fff",
            colorTextTertiary: "#fff",
          },
        },
      }}
    >
      <div className="flex items-center gap-3 bg-button-color rounded-md p-4 min-h-[82px] min-w-[260px] w-full flex-col lg:flex-row lg:items-center lg:gap-3">
        <div className="flex flex-row items-center gap-1.5 text-xs uppercase tracking-wide text-light-white flex-shrink-0 w-full lg:w-auto">
          <CalendarOutlined />
          <span className="text-xs font-semibold">Date Range</span>
        </div>
        <div className="flex items-center gap-3 flex-1 min-w-[260px] flex-wrap w-full lg:min-w-[260px] flex-col lg:flex-row lg:items-center">
          <Select
            value={filter.type}
            onChange={handlePresetChange}
            className="preset-select min-w-[140px] w-full lg:min-w-[140px] lg:w-auto"
            suffixIcon={<DownOutlined style={{ color: theme.white }} />}
            style={{ background: theme.grey2 }}
          >
            <Option value="current">Current</Option>
            <Option value="custom">Custom</Option>
          </Select>

          {filter.type === "custom" && (
            <div className="flex gap-3 flex-1 min-w-[260px] w-full lg:min-w-[260px] flex-col lg:flex-row">
              <div className="flex flex-col gap-1.5 flex-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-light-white">Start Date</span>
                <DatePicker
                  value={customRange.start}
                  onChange={(date) => handleCustomChange(date, "start")}
                  format="YYYY-MM-DD"
                  className="date-input w-full"
                  style={{ background: theme.grey2 }}
                  disabledDate={(date) =>
                    date.isBefore(dayjs(accountStart), "day") ||
                    date.isAfter(customRange.end ?? dayjs(today), "day")
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-light-white">End Date</span>
                <DatePicker
                  value={customRange.end}
                  onChange={(date) => handleCustomChange(date, "end")}
                  format="YYYY-MM-DD"
                  className="date-input w-full"
                  style={{ background: theme.grey2 }}
                  disabledDate={(date) =>
                    date.isBefore(customRange.start ?? dayjs(accountStart), "day") ||
                    date.isAfter(dayjs(today), "day")
                  }
                />
              </div>
            </div>
          )}
        </div>
        <style>{`
          .date-input .ant-picker-input > input {
            color: ${theme.white};
          }
          .date-input .ant-picker-input > input::placeholder {
            color: ${theme.lightWhite};
          }
          .preset-select .ant-select-item {
            color: ${theme.white} !important;
          }
          .preset-select .ant-select-item-option-selected {
            color: ${theme.white} !important;
          }
          .preset-select .ant-select-item-option-active {
            color: ${theme.white} !important;
          }
          @media (max-width: 1024px) {
            .preset-select {
              width: 100% !important;
              min-width: 0 !important;
            }
          }
          @media (max-width: 768px) {
            .date-label span {
              font-size: 11px;
            }
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default DateRangeFilter;

