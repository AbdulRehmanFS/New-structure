import { memo } from "react";
import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import { theme } from "util/theme";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload?.length) {
    return (
      <CustomTooltipWrapper className="custom-tooltip">
        <div className="label">{`${payload[0]?.value} Uploads`}</div>
      </CustomTooltipWrapper>
    );
  }
  return null;
};

const CustomTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: ${theme.greyText};
  padding: 8px 14px;
  color: ${theme.lightWhite};
`;

const AreaChartComponent = ({
  data,
  yLabel = "Number of Uploads",
  showXAxisLable = false,
  xAxisLabel
}) => (
 
  (
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={data?.periodData || []} margin={{ top: 15, right: 20, left: 5, bottom: 16 }}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#DBD2D2" stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke={theme.lightGreyText}>
          {showXAxisLable && (
            <Label
              value={xAxisLabel}
              position="bottom"
              angle={0}
              style={{
                textAnchor: "middle",
                fontWeight: "400",
                fill: "white"
              }}
            />
          )}
        </XAxis>
        <YAxis
          tick={false}
          domain={[0, Math.max(...(data?.periodData || []).map((item) => item.value)) || 10]}>
          <Label
            value={yLabel}
            position="leftinside"
            angle={270}
            style={{
              textAnchor: "middle",
              fontWeight: "400",
              fill: "white"
            }}
          />
        </YAxis>
        <Tooltip
          contentStyle={{ color: theme.greyBorder }}
          cursor={false}
          content={CustomTooltip}
        />
        <Area type="monotone" dataKey="value" stroke={theme.white} fill="url(#colorGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  )
);

export default memo(AreaChartComponent);
