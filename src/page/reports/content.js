// import { Checkbox } from "antd";
import VideoSection from "component/videoSection";
import { Line, UnderLine } from "page/style";
import styled from "styled-components";
import { theme } from "util/theme";

const Content = ({ data }) => {
  console.log(data, "data");
//   const infringement_info = data?.infringement_info;
  const contentDetail = data?.reported_content;
//   const checkInfo = [
//     "This information in this report is accurate.",
//     "I have good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agents, or the law.",
//     "I state under penalty of perjury that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed. "
//   ];

  return (
    <Wrapper>
      <div className="video-audio-section">
        <VideoSection
          url={contentDetail?.content_url}
          type={contentDetail?.type}
          thumbnail={contentDetail?.thumbnail}
          title={contentDetail?.title}
        />
      </div>
      <div className="content-details">
        <div>
          <div className="title">{contentDetail?.title}</div>
          <div className="podcast-date-time">
            <div className="info-value">9 sec</div>
            <Line height="16px" borderColor={theme.grey2} />
            <div className="info-value">{contentDetail?.viewCount ?? 0} views</div>
            <Line height="16px" borderColor={theme.grey2} />
            <div className="info-value">{contentDetail?.genre}</div>
          </div>
          <UnderLine className="name" color={theme.red}>
            {data?.reported_user?.user_name}
          </UnderLine>
          <div className="description">{contentDetail?.description}</div>
        </div>
      </div>
      {/* <div className="info">
        <div>
          Copyright Owner Name or Company :
          <span className="ans">{infringement_info?.company_name}</span>
        </div>
        <div>
          Full Legal Name :<span className="ans">{infringement_info?.full_name} </span>
        </div>
        <div>
          Phone Number :<span className="ans">{infringement_info?.contact_number} </span>
        </div>
        <div>
          Email :<span className="ans">{infringement_info?.email_address} </span>
        </div>
        <div>
          Street :<span className="ans">{infringement_info?.street} </span>
        </div>
        <div>
          State :<span className="ans">{infringement_info?.state} </span>
        </div>
        <div>
          Zip Code:<span className="ans">{infringement_info?.zip_code} </span>
        </div>
        <div>
          Country:<span className="ans">{infringement_info?.country} </span>
        </div>
        <div>
          Choose which of the work below you are claiming :
          <span className="ans">{infringement_info?.claim} </span>
        </div>
        <div>
          Please provide a detailed description of your work and provide as much details a possible
          :<span className="ans">{infringement_info?.work_description} </span>
        </div>
        <div>
          Identify the material you want removed :
          <span className="ans">{infringement_info?.request_info} </span>
        </div>
        <div>
          Upload any corresponding documents if applicable :<br></br>
          <div style={{padding:"10px"}}>{infringement_info?.document_url?<a href={infringement_info?.document_url} >Legal_paperwork.pdf</a>:"N/a"}</div>
        </div>
        <div className="checkbox-div">
          {checkInfo.map((e, i) => (
            <div key={i} className="checkbox">
              <Checkbox checked={true} key={i} value={e}>
                <p style={{ color: theme.white }}> {e}</p>
              </Checkbox>
            </div>
          ))}
        </div>
        <div>
          Signature : <span className="ans">{infringement_info?.signature}  </span>
        </div>
      </div> */}
    </Wrapper>
  );
};
export default Content;

const Wrapper = styled.div`
  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ans {
    color: ${theme.greyText};
  }
  .video-audio-section {
    display: flex;
    justify-content: start;
  }
  .content-details {
    color: ${theme.greyText};
  }
  .title {
    padding: 10px 0;
    font-size: 16px;
  }
  .description {
    padding: 10px 0;
    font-size: 16px;
  }

  .podcast-date-time {
    display: flex;
    font-size: 16px;
    padding: 10px 0;
  }
  .checkbox {
    padding: 5px 0;
  }
`;
