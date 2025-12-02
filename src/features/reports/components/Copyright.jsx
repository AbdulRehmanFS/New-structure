import { Checkbox } from "antd";
import VideoSection from "@features/eventsContent/components/VideoSection";
import { theme } from "@utils/theme";

// Line component for vertical separator
const Line = ({ height = "16px", borderColor = theme.grey2 }) => (
  <div
    className="border-r-2"
    style={{
      height: height,
      borderColor: borderColor,
      margin: "0 8px"
    }}
  />
);

// UnderLine component for underlined text
const UnderLine = ({ children, color = theme.red, className = "" }) => (
  <div className={`underline underline-offset-1 ${className}`} style={{ color: color }}>
    {children}
  </div>
);

const CopyWrite = ({ data }) => {
  const infringement_info = data?.infringement_info;
  const contentDetail = data?.reported_content;
  const checkInfo = [
    "This information in this report is accurate.",
    "I have good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agents, or the law.",
    "I state under penalty of perjury that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed. "
  ];

  return (
    <div>
      <div className="flex justify-start">
        <VideoSection
          url={contentDetail?.content_url}
          type={contentDetail?.type}
          thumbnail={contentDetail?.thumbnail}
          title={contentDetail?.title}
        />
      </div>
      <div className="text-grey-text">
        <div>
          <div className="py-2.5 text-base">{contentDetail?.title}</div>
          <div className="flex text-base py-2.5">
            <div className="info-value">9 sec</div>
            <Line height="16px" borderColor={theme.grey2} />
            <div className="info-value">{contentDetail?.viewCount ?? 0} views</div>
            <Line height="16px" borderColor={theme.grey2} />
            <div className="info-value">{contentDetail?.genre}</div>
          </div>
          <UnderLine className="name" color={theme.red}>
            {data?.reported_user?.user_name}
          </UnderLine>
          <div className="py-2.5 text-base">{contentDetail?.description}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          Copyright Owner Name or Company :
          <span className="text-grey-text">{infringement_info?.company_name}</span>
        </div>
        <div>
          Full Legal Name :<span className="text-grey-text">{infringement_info?.full_name} </span>
        </div>
        <div>
          Phone Number :<span className="text-grey-text">{infringement_info?.contact_number} </span>
        </div>
        <div>
          Email :<span className="text-grey-text">{infringement_info?.email_address} </span>
        </div>
        <div>
          Street :<span className="text-grey-text">{infringement_info?.street} </span>
        </div>
        <div>
          State :<span className="text-grey-text">{infringement_info?.state} </span>
        </div>
        <div>
          Zip Code:<span className="text-grey-text">{infringement_info?.zip_code} </span>
        </div>
        <div>
          Country:<span className="text-grey-text">{infringement_info?.country} </span>
        </div>
        <div>
          Choose which of the work below you are claiming :
          <span className="text-grey-text">{infringement_info?.claim} </span>
        </div>
        <div>
          Please provide a detailed description of your work and provide as much details a possible
          :<span className="text-grey-text">{infringement_info?.work_description} </span>
        </div>
        <div>
          Identify the material you want removed :
          <span className="text-grey-text">{infringement_info?.request_info} </span>
        </div>
        <div>
          Upload any corresponding documents if applicable :<br></br>
          <div className="p-2.5">
            {infringement_info?.document_url ? (
              <a href={infringement_info?.document_url}>Legal_paperwork.pdf</a>
            ) : (
              "N/a"
            )}
          </div>
        </div>
        <div className="checkbox-div">
          {checkInfo.map((e, i) => (
            <div key={i} className="py-[5px]">
              <Checkbox checked={true} key={i} value={e}>
                <p className="text-white"> {e}</p>
              </Checkbox>
            </div>
          ))}
        </div>
        <div>
          Signature : <span className="text-grey-text">{infringement_info?.signature} </span>
        </div>
      </div>
    </div>
  );
};
export default CopyWrite;

