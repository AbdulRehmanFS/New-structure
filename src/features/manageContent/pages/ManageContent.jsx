import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "@layouts/Header";
import { setFaqTabSelection } from "@features/userManagement/store/useManagementSlice";
import { contentList } from "../utils/data";
import TermsPolices from "./TermsPolicies";

export default function ManageContent() {
  const { faqTab } = useSelector((e) => e.userManagement);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelection = (list) => {
    dispatch(setFaqTabSelection(list?.name));
    navigate(list?.link);
  };

  useEffect(() => {
    dispatch(setFaqTabSelection("Terms and Policies"));
    navigate("/manage-content/terms-policies");
  }, [dispatch, navigate]);

  return (
    <>
      <Header showSearch={false} heading="Manage Content" />
      <div className="scroll-without-header">
        <div className="flex gap-2.5 items-center py-4">
          {contentList.map((list, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-md cursor-pointer font-normal text-white ${
                faqTab === list?.name
                  ? "bg-[rgba(196,196,196,0.23)]"
                  : "bg-transparent"
              }`}
              onClick={() => handleSelection(list)}>
              {list.name}
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
}

// Placeholder component - will be implemented later
export function FaqForm() {
  return <div>FaqForm - Coming Soon</div>;
}

export { default as Disclaimer } from "./Disclaimer";
export { default as PrivacyPolicy } from "./PrivacyPolicy";
export { default as TermsPolices } from "./TermsPolicies";
export { default as FAQs } from "./FAQs";

