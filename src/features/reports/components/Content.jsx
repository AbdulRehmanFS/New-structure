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

const Content = ({ data }) => {
  const contentDetail = data?.reported_content;

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
    </div>
  );
};
export default Content;

