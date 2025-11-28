import { memo, useEffect, useRef } from "react";

const VideoSection = ({ url, type, thumbnail, title }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    return () => {
      // Pause the video when the component unmounts
      if (videoRef.current) videoRef.current.pause();
    };
  }, []);

  return (
    <>
      {type === "video" && (
        <div className="w-full">
          <video
            width="100%"
            height="100%"
            className="w-full"
            controls
            ref={videoRef}
          >
            <source src={url} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {type === "audio" && (
        <div className="flex gap-4 items-center bg-[rgba(255,255,255,0.1)] p-4 rounded-lg">
          <div className="w-[90px] h-[90px] flex-shrink-0">
            <img
              src={thumbnail || "/audioImage.jpeg"}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold mb-2">{title}</div>
            <audio controls ref={videoRef} className="w-full">
              <source src={url} />
            </audio>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(VideoSection);

