import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import { setEarningTabSelection } from "@features/userManagement/store/useManagementSlice";

const EarningsHeader = () => {
  const dispatch = useDispatch();
  const { earning } = useSelector((e) => e.userManagement);

  const handleSectionSelection = (name) => {
    dispatch(setEarningTabSelection(name));
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 my-5">
        <ButtonComponent
          size="middle"
          text="Events"
          width="80px"
          bg={theme.buttonColor}
          showBorder={earning === "events"}
          onClick={() => handleSectionSelection("events")}
          height="32px"
        />
        <ButtonComponent
          text="Live Bucks"
          width="80px"
          bg={theme.buttonColor}
          size="middle"
          showBorder={earning === "bucks"}
          onClick={() => handleSectionSelection("bucks")}
          height="32px"
        />
      </div>
      <div className="inline-flex items-center gap-[15px] text-[rgba(255,255,255,0.79)]">
        Financial Reports
        <div
          className="bg-[rgba(196,196,196,0.24)] py-[9px] px-[10px] rounded-[5px] cursor-pointer"
          style={{ background: theme.greyButton }}
        >
          Review & Download
        </div>
      </div>
    </div>
  );
};

export default EarningsHeader;

