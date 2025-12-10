import { Avatar } from "antd";
import { HorizontalLine, Line } from "page/style";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getReportCommentListApi } from "service/api/report";
import styled from "styled-components";

import { errorMessage } from "util/commonSection";
import { Heart } from "util/svgFile";
import { theme } from "util/theme";

export default function Reportcomment() {
  const { state } = useLocation();

  const [commentData, setCommentData] = useState([]);
  const data = state?.reported_comment?.contentDetail;
  const getComment =useCallback( async () => {
    const payload = new URLSearchParams();
    payload.append("comment_id", state?.reported_comment?._id);
    const req = await getReportCommentListApi(payload);

    if (req?.status === 200) {
      setCommentData(req?.data);
    } else {
      errorMessage(req);
    }
  },[state?.reported_comment?._id]);

  useEffect(() => {
    getComment();

  
  }, [getComment]);
  return (
    <>
      <Wrapper>
        <div className="title">
          <p className="title-text">{data?.title} </p>
          <div className="time">
            {data?.duration} <Line height="15px" borderColor={theme.greyText} /> {data?.viewCount}{" "}
            views <Line height="15px" borderColor={theme.greyText} /> {data?.genre}
          </div>
        </div>

        <div className="name">{data?.user_name}</div>
        <div className="desc">{data?.description}</div>
        <div className="comment-data">
          <div className="title-text">Comments</div>
          <HorizontalLine borderColor={theme.greyText} />
          <div className="comment-avatar">
            <Avatar src={state?.reported_user?.profile_pic_url}/>
            <div style={{ width: "100%" }}>
              <div>
                <p>{state?.reported_user?.user_name}</p>
                <p className="comment">{commentData[0]?.comment}</p>
                <div className="heart-like">
                  <Heart height={20} />({commentData[0]?.like_count} likes)
                </div>
              </div>
              <div className="reply">
                <div className="replies">
                  Replies
                  {commentData[0]?.replyOnComment?.map((e, i) => (
                    <div className="replies-comment" key={i}>
                      <Avatar src={e?.userDetail?.profile_pic_url}/>
                      <div>
                        <p style={{ color: theme.white }}>{e?.userDetail?.user_name}</p>
                        <p className="comment">{e?.comment}</p>
                        <div className="heart-like">
                          <Heart height={20} />
                          ({e?.like_count
})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 5px 0;

  .title-text {
    font-size: 20px;
    font-weight: 600;
  }
  .time {
    display: flex;
    font-size: 14px;
    padding: 15px 0px;
    color: ${theme.greyText};
  }
  .name {
    color: ${theme.primaryColor};
    font-weight: 600;
    font-size: 18px;
  }
  .desc {
    color: ${theme.greyText};
    padding: 10px 0;
    line-height: 20px;
  }
  .comment-avatar {
    display: flex;
    gap: 10px;
  }
  .comment {
    padding: 5px 0px;
    color: ${theme.white};
  }
  .heart-like {
    display: flex;
    align-items: center;
    color: ${theme.greyText};
  }
  .reply {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  .replies {
    width: 50%;
    color: ${theme.greyText};
  }
  .replies-comment {
    display: flex;
    gap: 10px;
    padding: 10px 0px;
  }
`;
