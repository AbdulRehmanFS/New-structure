import { Colorlabel } from "../utils/list.jsx";
import { font } from "@utils/theme";

const LegendChartColor = ({ createrViewer }) => (
  <div className="flex flex-wrap gap-2.5">
    {(createrViewer === 1 || createrViewer === 3) && (
      <div className="flex flex-wrap gap-2.5 text-base bg-[#c4c4c436] p-2.5 rounded">
        <div className="w-[15px] h-[15px]" style={{ background: Colorlabel[0]?.color }} />
        <div>{Colorlabel[0]?.name}</div>
      </div>
    )}
    {(createrViewer === 2 || createrViewer === 3) && (
      <div className="flex flex-wrap gap-2.5 text-base bg-[#c4c4c436] p-2.5 rounded">
        <div className="w-[15px] h-[15px]" style={{ background: Colorlabel[1]?.color }} />
        <div>{Colorlabel[1]?.name}</div>
      </div>
    )}
  </div>
);

export default LegendChartColor;

