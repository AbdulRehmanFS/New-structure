import { Colorlabel } from "page/dashboard/list";
const { styled } = require("styled-components");
const { font } = require("util/theme");

const LegendChartColor = ({ createrViewer }) => (
  <LegendChartColorStyle className="flex-wrap">
    {(createrViewer === 1 || createrViewer === 3) && (
      <div className="flex-wrap legend">
        <div className="color-box" style={{ background: Colorlabel[0]?.color }} />
        <div>{Colorlabel[0]?.name}</div>
      </div>
    )}
    {(createrViewer === 2 || createrViewer === 3) && (
      <div className="flex-wrap legend">
        <div className="color-box" style={{ background: Colorlabel[1]?.color }} />
        <div>{Colorlabel[1]?.name}</div>
      </div>
    )}
  </LegendChartColorStyle>
);

const LegendChartColorStyle = styled.div`
  gap: 10px;
  .legend {
    gap: 10px;
    font-size: ${font.mid16};
    background: #c4c4c436;
    padding: 10px;
    border-radius: 4px;
  }
  .color-box {
    width: 15px;
    height: 15px;
  }
`;

export default LegendChartColor;
