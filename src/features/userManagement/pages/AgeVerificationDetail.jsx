import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import Header from "@layouts/Header";
import ButtonComponent from "@components/Button";
import BackButton from "@utils/commonSection";
import { errorMessage } from "@utils/commonSection";
import { theme } from "@utils/theme";
import { enableUnderAgeUser } from "../services/userManagement.api";

const AgeVerificationDetail = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnableUser = async () => {
    setLoading(true);
    const payload = {
      user_id: state?._id
    };
    const req = await enableUnderAgeUser(payload);
    if (req?.status == 200) {
      message.success("Successfully enable");
      navigate(-1);
    } else {
      errorMessage(req);
    }
    setLoading(false);
  };

  const age = moment().diff(moment(state?.dob, "DD-MM-YYYY"), 'years');

  return (
    <>
      <Header heading="User Management" />
      <div>
        <div className="flex text-base gap-[5px] tracking-[1px] py-[10px]">
          <BackButton />
          Age Verification
        </div>
        <div className="flex justify-end">
          <ButtonComponent 
            loading={loading} 
            text="Enable User" 
            bg={theme.green} 
            width="120px" 
            height="32px" 
            onClick={() => handleEnableUser()} 
          />
        </div>
        <div className="my-[10px] px-[10px] py-[10px] rounded-[5px] text-base bg-[rgba(196,196,196,0.1)]">
          Personal Details
        </div>
        <div className="grid bg-[rgba(196,196,196,0.1)] p-[10px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          <div className="w-[250px] flex justify-between rounded-[5px]">
            Username
            <span style={{ color: theme.greyText }}>{state?.user_name}</span>
          </div>
          <div className="w-[250px] flex justify-between rounded-[5px]">
            Email Address:
            <span style={{ color: theme.greyText }}>{state?.email}</span>
          </div>
          <div className="w-[250px] flex justify-between rounded-[5px]">
            Date Joined:
            <span style={{ color: theme.greyText }}>{state?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="w-[250px] flex justify-between rounded-[5px]">
            Phone Number:
            <span style={{ color: theme.greyText }}>{state?.phone_number}</span>
          </div>
          <div className="w-[250px] flex justify-between rounded-[5px]">
            Account Type:
            <span style={{ color: theme.greyText }}>
              {state?.user_role == 2 ? "Creator" : "Viewer"}
            </span>
          </div>
          <div className="w-[250px] flex justify-between rounded-[5px]">
            Age:
            <span style={{ color: theme.greyText }}>
              {age > 0 ? `${age} years` : `${moment(state?.dob, "DD/MM/YYYY").fromNow().split(" ")[0]} Months`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgeVerificationDetail;
