/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@components/Button";
import { theme } from "@utils/theme";
import { sidebarSelection } from "@features/common/store/sidebarSlice";

export default function PageNotFound() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackNavigate = () => {
    dispatch(sidebarSelection("Dashboard"));
    navigate("/dashboard");
  };
  return (
    <div className="h-screen w-full flex items-center justify-center font-semibold flex-col gap-5 overflow-auto text-black">
      <div className="text-[90px] tracking-wider">404</div>
      <div className="text-[30px]">Page Note Found</div>
      <div className="w-[482px] text-center text-grey-text">
        The Page You are looking for doesn&apos;t exist or an other Error
        occured, go back to home page.
      </div>
      <div>
        <Button
          text="Home Page"
          size="middle"
          width="80px"
          bg={theme.lightPrimaryColor}
          onClick={handleBackNavigate}
        />
      </div>
    </div>
  );
}

