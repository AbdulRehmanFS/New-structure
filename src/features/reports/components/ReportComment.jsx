import { Avatar } from "antd";
import { HorizontalLine } from "@features/dashboard/utils/style.jsx";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getReportCommentListApi } from "../services/report.api";
import { errorMessage } from "@utils/commonSection";
import { Heart } from "@utils/svgFile";
import { theme } from "@utils/theme";

// Line component for vertical separator
const Line = ({ height = "15px", borderColor = theme.greyText }) => (
  <div
    className="border-r-2"
    style={{
      height: height,
      borderColor: borderColor,
      margin: "0 8px"
    }}
  />
);

export default function ReportComment() {
  const { state } = useLocation();

  const [commentData, setCommentData] = useState([]);
  const data = state?.reported_comment?.contentDetail;
  const getComment = useCallback(async () => {
    const payload = new URLSearchParams();
    payload.append("comment_id", state?.reported_comment?._id);
    const req = await getReportCommentListApi(payload);

    if (req?.status === 200) {
      setCommentData(req?.data);
    } else {
      errorMessage(req);
    }
  }, [state?.reported_comment?._id]);

  useEffect(() => {
    getComment();
  }, [getComment]);

  return (
    <div className="py-[5px]">
      <div className="title">
        <p className="text-xl font-semibold">{data?.title} </p>
        <div className="flex text-sm py-[15px] text-grey-text">
          {data?.duration} <Line height="15px" borderColor={theme.greyText} /> {data?.viewCount}{" "}
          views <Line height="15px" borderColor={theme.greyText} /> {data?.genre}
        </div>
      </div>

      <div className="text-primary font-semibold text-lg">{data?.user_name}</div>
      <div className="text-grey-text py-2.5 leading-5">{data?.description}</div>
      <div className="comment-data">
        <div className="text-xl font-semibold">Comments</div>
        <HorizontalLine borderColor={theme.greyText} />
        <div className="flex gap-2.5">
          <Avatar src={state?.reported_user?.profile_pic_url} />
          <div className="w-full">
            <div>
              <p className="text-white">{state?.reported_user?.user_name}</p>
              <p className="py-[5px] text-white">{commentData[0]?.comment}</p>
              <div className="flex items-center text-grey-text">
                <Heart height={20} />({commentData[0]?.like_count} likes)
              </div>
            </div>
            <div className="w-full flex justify-end">
              <div className="w-1/2 text-grey-text">
                Replies
                {commentData[0]?.replyOnComment?.map((e, i) => (
                  <div key={i} className="flex gap-2.5 py-2.5">
                    <Avatar src={e?.userDetail?.profile_pic_url} />
                    <div>
                      <p className="text-white">{e?.userDetail?.user_name}</p>
                      <p className="py-[5px] text-white">{e?.comment}</p>
                      <div className="flex items-center text-grey-text">
                        <Heart height={20} />
                        ({e?.like_count})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

