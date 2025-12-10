
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Disclaimer from "./disclaimer";
import PrivacyPolicy from "./privacyPolicy";
import TermsPolices from "./terms&Polices";
import FAQs from "./faq";
import FaqForm from "./faqForm";
import Header from "component/header";
import { setFaqTabSelection } from "store/useManagementSlice";
import { contentList } from "./data";
import { useEffect } from "react";

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
  }, []);

  return (
    <>
      <Header showSearch={false} heading="Manage Content" />
      <ManageContentWrapper className="scroll-without-header">
        <div className="content-list-container">
          {contentList.map((list,i) => (
            <ContentList
              key={i}
              className="list"
              selected={faqTab === list?.name}
              onClick={() => handleSelection(list)}>
              {list.name}
            </ContentList>
          ))}
        </div>
        <Outlet />
      </ManageContentWrapper>
    </>
  );
}

export { Disclaimer, PrivacyPolicy, TermsPolices, FAQs, FaqForm };

const ManageContentWrapper = styled.div`
  .button-container {
    margin-top: 30px;
    display: flex;
    gap: 10px;
  }
  .content-list-container {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 15px 0;
  }
`;

const ContentList = styled.div`
  padding: 8px 12px;
  background: ${(props) => (props.selected ? "rgba(196, 196, 196, 0.23)" : "transparent")};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 400;
`;
