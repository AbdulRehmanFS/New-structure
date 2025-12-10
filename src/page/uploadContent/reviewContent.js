import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { font, theme } from "util/theme";
import Button from "component/fields/button";
import VideoSection from "component/videoSection";
import { FlexRow } from "../style";
import { addCreatorContentAPI } from "service/api/collections";
import Message from "component/messages";
import { clearUploadContent } from "store/contentSlice";
import { errorMessage } from "util/commonSection";

function ReviewContent() {
  const { uploadContent } = useLocation()?.state || {};
  const [uploadLoading, setUploadLoading] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todayDate = moment().format("DD-MMM-yyyy");

 

  const handleSubmitData = async () => {
    setUploadLoading(true);
    const { cast, creator, ...rest } = uploadContent;
    const parseCast = await cast?.map((list) => ({
      user_id: JSON.parse(list)?.userId
    }));
    const finalList = {
      user_id: creator,
      uploaded_by_admin: true,
      cast: parseCast,
      ...rest
    }; // parse cast data here
    const res = await addCreatorContentAPI(finalList);
    if (res?.status === 200) {
      Message.success(res?.message || "Content upload successfully");
      dispatch(clearUploadContent());
      navigate("/creator/audio-video");
    } else errorMessage(res);
    setUploadLoading(false);
  };

  return (
    <ReviewWrapper>
      <div className="top-section">
        <div className="header">Review Content</div>
        <FlexRow>
          <Button
            htmlType="button"
            width="120px"
            text="Edit Content"
            bg={theme.backgroundGray}
            onClick={() => navigate("/creator/upload-content", { state: { uploadContent } })}
          />
          <Button
            htmlType="button"
            width="120px"
            text="Submit"
            bg={theme.primaryColor}
            onClick={handleSubmitData}
            loading={uploadLoading}
          />
        </FlexRow>
      </div>

      {trailer && (
        <div className="video-section">
          {" "}
          <VideoSection
            url={uploadContent?.trailer}
            type={uploadContent?.type}
            thumbnail={uploadContent?.thumbnail}
          />{" "}
        </div>
      )}

      {!trailer && (
        <div className="video-section">
          {" "}
          <VideoSection
            url={uploadContent?.content_url}
            type={uploadContent?.type}
            thumbnail={uploadContent?.thumbnail}
          />
        </div>
      )}

      <div className="title-btn">
        <div className="title">{uploadContent?.title}</div>
        {uploadContent?.trailer && (
          <div>
            <Button
              htmlType="button"
              width="120px"
              text={trailer ? <p>Watch Video</p> : <p>Watch Trailer</p>}
              bg={theme.primaryColor}
              onClick={() => setTrailer((e) => !e)}
            />
          </div>
        )}
      </div>
      <CardWrapper>
        <div className="description-heading">Description</div>
        <div className="description subtext">{uploadContent?.description}</div>
        <div className="genre subtext">{uploadContent?.genre}</div>
        <div className="date subtext">{todayDate}</div>
      </CardWrapper>
      <CardWrapper>
        <div className="cast-heading">Cast</div>
        {uploadContent?.cast ? (
          uploadContent?.cast?.map((list, i) => {
            const data = JSON.parse(list);
            return (
              <FlexRow key={i}>
                <img src={data?.profile_pic_url} alt="" className="cast-image" />
                <div>{data?.first_name}</div>
              </FlexRow>
            );
          })
        ) : (
          <div className="flex-center subtext">No Cast List</div>
        )}
      </CardWrapper>
    </ReviewWrapper>
  );
}

export default ReviewContent;

const ReviewWrapper = styled.div`
  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header {
    font-size: 20px;
  }
  .video-section {
    margin: 20px 0;
    video {
      max-width: 100%;
    }
    .video-container {
      border: 1px solid ${theme.midGrey};
    }
  }
  .cast-heading {
    font-weight: 500;
    font-size: ${font.mid16};
  }
  .cast-image {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    overflow: hidden;
  }
  .title {
    font-size: ${font.mid};
    font-weight: 700;
    padding: 0px 10px;
  }
  .title-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${theme.grey2};
  margin: 10px 0;
  border-radius: 8px;
  padding: 24px;
  .description-heading {
    line-height: 21.86px;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: ${font.mid16};
  }
  .subtext {
    color: ${theme.fieldBg};
  }
`;
