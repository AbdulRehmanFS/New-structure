import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "@layouts/Header";
import { setFaqTabSelection } from "@features/userManagement/store/useManagementSlice";
import { contentList } from "../utils/data";
import TermsPolices from "./TermsPolicies";

export default function ManageContent() {
  const { faqTab } = useSelector((e) => e.userManagement);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSelection = (list) => {
    dispatch(setFaqTabSelection(list?.name));
    navigate(list?.link);
  };

  // Sync tab selection with current route on pathname change
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Only handle base path redirect
    if (currentPath === "/manage-content") {
      navigate("/manage-content/terms-policies", { replace: true });
      dispatch(setFaqTabSelection("Terms and Policies"));
      return;
    }
    
    // Sync tab with current route (but don't navigate - let user clicks handle navigation)
    const currentTab = contentList.find((item) => item.link === currentPath);
    if (currentTab) {
      dispatch(setFaqTabSelection(currentTab.name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Only sync on pathname change to avoid navigation loops

  return (
    <>
      <Header showSearch={false} heading="Manage Content" />
      <div className="scroll-without-header px-5">
        <div className="flex flex-wrap gap-2.5 items-center py-4 overflow-x-auto">
          {contentList.map((list, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-md cursor-pointer font-normal text-white text-sm sm:text-base whitespace-nowrap ${
                faqTab === list?.name
                  ? "bg-[rgba(196,196,196,0.23)]"
                  : "bg-transparent"
              }`}
              onClick={() => handleSelection(list)}>
              {list.name}
            </div>
          ))}
        </div>
        <div className="pb-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export { default as Disclaimer } from "./Disclaimer";
export { default as PrivacyPolicy } from "./PrivacyPolicy";
export { default as TermsPolices } from "./TermsPolicies";
export { default as FAQs } from "./FAQs";
export { default as FaqForm } from "./FaqForm";

