import styled from "styled-components";
import { Col, Image, Row } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { FiDollarSign } from "react-icons/fi";
import { theme } from "util/theme";
import Loader from "component/loader";
import { PersonIcon } from "util/svgFile";
import { useLocation } from "react-router-dom";

export default function ProfileInfoCard({
  list = {},
  loading,
  align,
  type = "creator",
  watchTime
}) {
  const location = useLocation();
  const { profilePic = "", coverImage = null, ...rest } = list || {};

  if (loading) return <Loader />;
  const isEligible = watchTime > 1500;
  console.log(list);

  return (
    <ProfileInfoWrapper className="profile-wrapper" align={align}>
      <div className="heading">Personal Details</div>
      {list ? (
        <Row gutter={[20, 0]} className={type === "viewer" ? "viewer-row" : ""}>
          {/* LEFT SIDE IMAGE */}
          {type === "viewer" ? (
            <Col span={6} className="image-wrapper viewer-image">
              {!profilePic ? (
                <div className="no-image">
                  <PersonIcon height="60px" width="60px" />
                </div>
              ) : (
                <Image
                  height="150px"
                  width="120px"
                  src={profilePic}
                  className="fit-image"
                  style={{ borderRadius: "8px" }}
                />
              )}
            </Col>
          ) : (
            <Col span={6} className="creator-section image-wrapper">
              {coverImage ? (
                <Image
                  className="fit-image"
                  height="150px"
                  width="100%"
                  src={coverImage}
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <div className="not-found-cover">
                  <FileImageOutlined style={{ fontSize: "32px" }} />
                </div>
              )}
              {profilePic ? (
                <div className="creator-profile-image">
                  <Image height="100%" width="100%" src={profilePic} alt="profile" />
                </div>
              ) : (
                <div className="no-image creator-profile-image">
                  <PersonIcon height="60px" width="60px" />
                </div>
              )}
            </Col>
          )}

          {/* RIGHT SIDE INFO */}
          <Col span={type === "viewer" ? 20 : 18}>
            <div className="box">
              {Object.entries(rest).map(([key, value]) =>
                key !== "Social Links" ? (
                  <div className="info" key={key}>
                    <div className="key" style={{ textAlign: "left" }}>
                      {key}:
                    </div>
                    <div className="value">{value || "N/A"}</div>
                  </div>
                ) : (
                  <div className="info" key={key}>
                    {value.length > 0 ? <div className="key">{key}:</div> : ""}
                    <div className="flex-wrap">
                      {value.map(
                        (list1, i) =>
                          list1?.value && (
                            <div className="value social-icon" key={i}>
                              {list1.icon}
                              <p className="social-value">{list1.value}</p>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <NoData>No Data</NoData>
      )}

{location.pathname === "/user-management/creator-profile" && (
      // {/* Eligibility Badge - bottom right */}
      <BadgeWrapper eligible={isEligible} className="eligibility-badge">
        <FiDollarSign className="icon" />
        <span>{"Eligible"} </span>
      </BadgeWrapper>
)}
    </ProfileInfoWrapper>
  );
}

/* ---------------- STYLES ---------------- */
const NoData = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: center;
  color: ${theme.greyText};
`;

const BadgeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 2px solid ${(props) => (props.eligible ? "green" : "#D80C0C")};
  color: ${(props) => (props.eligible ? "green" : "#D80C0C")};
  border-radius: 8px;
  font-weight: 600;
  background: #2b2b2bff;
  position: absolute;
  bottom: 15px;
  right: 15px;

  .icon {
    font-size: 20px;
  }
`;

const ProfileInfoWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px solid ${theme.greyBorder};
  padding-bottom: 0px;

  .heading {
    background: ${theme.buttonColor};
    padding: 12px 18px;
    border-radius: 6px;
    color: ${theme.lightWhite};
  }

  .viewer-image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130px;
  }

  .ant-row {
    padding: 20px 10px 40px 10px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center; /* vertically align image + details */
  }

  .viewer-row {
    padding: 20px; /* top + bottom + left + right */
    display: flex;
    flex-wrap: nowrap;
    align-items: center; /* vertically align image + details */
  }

  .viewer-image {
    display: flex;
    justify-content: center; /* center horizontally */
    align-items: center; /* center vertically */
  }

  .ant-row {
    display: flex; /* force horizontal layout */
    flex-wrap: nowrap; /* prevent stacking */
    align-items: flex-start; /* align top */
  }

  .ant-col {
    display: flex;
    flex-direction: column;
  }

  .image-wrapper {
    display: flex;
    justify-content: start;
  }

  .creator-section {
    position: relative;
  }

  .fit-image {
    object-fit: cover;
  }

  .creator-profile-image {
    position: absolute;
    height: 80px !important;
    width: 80px !important;
    border-radius: 50px;
    overflow: hidden;
    bottom: -35px;
    left: 25px;
  }

  .no-image {
    width: 94px;
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: lightgrey;
    border-radius: 50%;
    margin: auto;
  }

  .info {
    display: flex;
    padding: 0px 0px;
  }

  .key {
    width: 50px;
    margin-right: 20px;
    text-align: ${(props) => props.align || "left"};
    font-size: 13px;
    text-transform: capitalize;
  }

  .value {
    text-align: left;
    max-width: 280px;
    word-wrap: break-word;
  }

  .box {
    color: ${theme.lightWhite};
    height: 150px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 18px;
    overflow: auto;
    padding: 0 5px;
  }

  .box::-webkit-scrollbar {
    width: 0px;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 130px;
    gap: 10px;
  }

  .social-icon {
    font-size: 10px;
    display: flex;
    align-items: start;
    width: 100%;
    gap: 10px;
    svg {
      height: 18px;
      width: 18px;
    }
    .social-value {
      font-size: 15px;
    }
  }

  .profile-btn {
    margin-top: 10px;
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    background: ${theme.buttonColor};
    color: ${theme.lightWhite};
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .profile-btn:hover {
    opacity: 0.8;
  }
`;
