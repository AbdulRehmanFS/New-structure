import { ButtonComponent } from "component/index";
import Header from "component/header";
import styled from "styled-components";
import { theme } from "util/theme";
import BackButton, { errorMessage } from "util/commonSection";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { enableUnderAgeUser } from "service/api/usermanagement";
import { message } from "antd";

const AgeVerificationDetail = () => {
  const { state } = useLocation();
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()
  const handleEnableUser = async() => {
    setloading(true)
    const payload={
      user_id:state?._id
    }
    const req=await enableUnderAgeUser(payload)
    if(req?.status==200){
        message.success("Successfully enable");
        navigate(-1)
    }else{
      errorMessage(req)
    }

    setloading(false)
  };

  const age=moment().diff(moment(state?.dob, "DD-MM-YYYY"), 'years')

  return (
    <>
      <Header heading="User Management" />
      <Wrapper>
        <div className="heading">
          <BackButton BackButton />
          Age Verification
        </div>
        <div className="enable-user">
          <ButtonComponent loading={loading} text="Enable User" bg={theme.green} width={"120px"} height={"32px"} onClick={()=>handleEnableUser()} />
        </div>
        <div className="personal-detail">Personal Details</div>
        <div className="details">
          <div className="name">
            Username
            <span style={{ color: theme.greyText }}>{state?.user_name}</span>
          </div>
          <div className="name">
            Email Address:
            <span style={{ color: theme.greyText }}>{state?.email}</span>
          </div>
          <div className="name">
            Date Joined:
            <span style={{ color: theme.greyText }}>{state?.createdAt.split("T")[0]}</span>
          </div>
          <div className="name">
            Phone Number:
            <span style={{ color: theme.greyText }}>{state?.phone_number}</span>
          </div>
          <div className="name">
            Account Type:
            <span style={{ color: theme.greyText }}>
              {state?.user_role == 2 ? "Creator" : "Viewer"}
            </span>
          </div>
          <div className="name">
            Age:
            <span style={{ color: theme.greyText }}>
           {age>0?`${age} years`:`${moment(state?.dob, "DD/MM/YYYY").fromNow().split(" ")[0]} Months`}
            </span>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default AgeVerificationDetail;

const Wrapper = styled.div`
  .heading {
    display: flex;
    font-size: 16px;
    gap: 5px;
    letter-spacing: 1px;
    padding: 10px 0;
  }
  .enable-user {
    display: flex;
    justify-content: end;
  }
  .personal-detail {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    background: ${theme.formField};
  }
  .details {
    display: grid;
    background: ${theme.formField};
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  .name {
    width: 250px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
  }
`;
