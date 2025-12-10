
import { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import audioImage from "assets/audioImage.jpeg";
import { theme } from "util/theme";

const VideoSection = ({ url, type, thumbnail, title }) => {
  const videoRef = useRef(null);

  useEffect(
    () =>
      // Pause the video when the modal is closed
      () => {
        if (videoRef.current) videoRef.current.pause();
      },
    []
  );

  return (
    <>
      {type === "video" && (
        <VideoWrapper className="video-section">
          <video
            width="100%"
            height="100%"
            className="video-container"
            controls
            ref={videoRef}
          >
            <source src={url} />
            Your browser does not support the video tag.
          </video>
        </VideoWrapper>
      )}
      {type === "audio" && (
        <AudioWrapper className="audio-section">
          <div className="image-wrapper">
            <img
              src={thumbnail ?? audioImage}
              alt=""
              height="90px"
              width="100%"
              className="thumbnail-audio"
            />
          </div>
          <div className="audio-content">
            <div className="audio-title">{title}</div>
            <audio controls ref={videoRef}>
              <source src={url} />
            </audio>
          </div>
        </AudioWrapper>
      )}
    </>
  );
};
export default memo(VideoSection);

const VideoWrapper = styled.div`
  width: 90%;
  height: 380px;
  // for video tags all below css
  display: flex;
  align-items: center;
  justify-content: center;
  .video-container {
    background-color: black;
  }
  video {
    object-fit: contain;
  }
`;

const AudioWrapper = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  background: #f1f1f1;
  gap: 10px;
  width: 90%;
  .image-wrapper {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #c6c3c3;
  }
  .audio-title {
    padding: 10px 0 0 20px;
    font-size: 20px;
    text-transform: capitalize;
    font-weight: 500;
    color: ${theme.greyText};
  }
  .audio-content {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  audio {
    width: 100%;
  }
  .thumbnail-audio {
    object-fit: contain;
  }
`;
