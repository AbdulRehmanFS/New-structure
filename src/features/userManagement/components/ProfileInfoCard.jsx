import { Col, Image, Row } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { FiDollarSign } from "react-icons/fi";
import { theme } from "@utils/theme";
import Loader from "@components/Loader";
import { PersonIcon } from "@utils/svgFile";
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

  return (
    <div className="relative rounded-[10px] border border-grey-border pb-[10px] profile-wrapper">
      <div className="bg-button-color py-2.5 sm:py-3 px-3 sm:px-[18px] rounded-[6px] text-light-white text-sm sm:text-base">Personal Details</div>
      {list ? (
        <Row gutter={[20, 0]} className={`${type === "viewer" ? "py-3 px-3 sm:py-5 sm:px-5" : "py-3 px-3 sm:py-5 sm:px-[10px] pb-6 sm:pb-10"} flex flex-wrap md:flex-nowrap items-center md:items-start`}>
          {/* LEFT SIDE IMAGE */}
          {type === "viewer" ? (
            <Col xs={24} sm={24} md={6} lg={6} className="flex justify-center md:justify-start flex-col mb-4 md:mb-0">
              <div className="flex justify-center items-center h-[130px]">
                {!profilePic ? (
                  <div className="w-[94px] h-[94px] flex items-center justify-center bg-[lightgrey] rounded-full m-auto">
                    <PersonIcon height="60px" width="60px" />
                  </div>
                ) : (
                  <Image
                    height="150px"
                    width="120px"
                    src={profilePic}
                    className="object-cover"
                    style={{ borderRadius: "8px" }}
                  />
                )}
              </div>
            </Col>
          ) : (
            <Col xs={24} sm={24} md={6} lg={6} className="relative flex justify-center md:justify-start flex-col mb-4 md:mb-0">
              {coverImage ? (
                <Image
                  className="object-cover"
                  height="150px"
                  width="100%"
                  src={coverImage}
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <div className="flex items-center justify-center h-[150px]">
                  <FileImageOutlined style={{ fontSize: "32px" }} />
                </div>
              )}
              {profilePic ? (
                <div className="absolute h-20 w-20 rounded-[50px] overflow-hidden bottom-[-35px] left-[50%] md:left-[25px] translate-x-[-50%] md:translate-x-0">
                  <Image height="100%" width="100%" src={profilePic} alt="profile" />
                </div>
              ) : (
                <div className="absolute w-[94px] h-[94px] flex items-center justify-center bg-[lightgrey] rounded-full m-auto bottom-[-35px] left-[50%] md:left-[25px] translate-x-[-50%] md:translate-x-0">
                  <PersonIcon height="60px" width="60px" />
                </div>
              )}
            </Col>
          )}

          {/* RIGHT SIDE INFO */}
          <Col xs={24} sm={24} md={type === "viewer" ? 18 : 18} lg={type === "viewer" ? 20 : 18} className="flex flex-col">
            <div className="text-light-white min-h-[200px] md:h-[200px] flex flex-col flex-wrap gap-[18px] overflow-auto px-[5px] [&::-webkit-scrollbar]:w-0">
              {Object.entries(rest).map(([key, value]) =>
                key !== "Social Links" ? (
                  <div className="flex p-0 flex-col sm:flex-row" key={key}>
                    <div className={`w-auto sm:w-[50px] mr-0 sm:mr-5 text-[13px] capitalize flex-shrink-0 mb-1 sm:mb-0 ${align === "right" ? "text-right" : "text-left"}`}>
                      {key}:
                    </div>
                    <div className="text-left max-w-full sm:max-w-[280px] break-words">{value || "N/A"}</div>
                  </div>
                ) : (
                  <div className="flex p-0 flex-col sm:flex-row" key={key}>
                    {value.length > 0 ? <div className={`w-auto sm:w-[50px] mr-0 sm:mr-5 text-[13px] capitalize flex-shrink-0 mb-1 sm:mb-0 ${align === "right" ? "text-right" : "text-left"}`}>{key}:</div> : ""}
                    <div className="flex flex-wrap w-full sm:w-[130px] gap-[10px]">
                      {value.map(
                        (list1, i) =>
                          list1?.value && (
                            <div className="text-[10px] flex items-start w-full gap-[10px]" key={i}>
                              <div className="[&_svg]:h-[18px] [&_svg]:w-[18px]">
                                {list1.icon}
                              </div>
                              <p className="text-[15px]">{list1.value}</p>
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
        <div className="flex p-[15px] items-center justify-center text-grey-text">No Data</div>
      )}

      {location.pathname === "/user-management/creator-profile" && (
        <div
          className={`inline-flex items-center gap-2 py-2 px-[10px] rounded-lg font-semibold bg-[#2b2b2bff] absolute bottom-[15px] right-[15px] md:right-[15px] ${
            isEligible ? "border-2 border-green text-green" : "border-2 border-[#D80C0C] text-[#D80C0C]"
          }`}
        >
          <FiDollarSign className="text-xl" />
          <span>{"Eligible"} </span>
        </div>
      )}
    </div>
  );
}
