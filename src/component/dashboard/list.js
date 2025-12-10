const { theme } = require("util/theme");
import { styled } from "styled-components";
import { ImageIcon } from "util/svgFile";

const List = ({ data, className }) => (
  <ListWrapper className={className}>
    <div className="userInfo">
      <div className="image-wrapper">
        {data?.profile_pic_url ? (
          <img src={data?.profile_pic_url} alt="" className="image-icon" />
        ) : (
          <div className="image-icon flex-wrap">
            <ImageIcon height="12px" width="12px" />
          </div>
        )}
      </div>
      <div className="content-wrapper">
        <div className="name">{data?.user_name}</div>
        <div className="subscription">{data?.subscribers_count} Subscribers</div>
      </div>
    </div>
    <div className="new-button">
      <span>New</span>
    </div>
  </ListWrapper>
);

export default List;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
  gap: 8px;
  .userInfo {
    display: flex;
    gap: 10px;
  }
  .image-icon {
    height: 30px;
    width: 30px;
    border-radius: 5px;
    background: ${theme.midGrey};
  }
  .subscription {
    font-size: 12px;
    color: ${theme.midGrey};
  }
  .new-button {
    display: flex;
    align-items: center;
    span {
      display: flex;
      background: #c4c4c49c;
      color: #000;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
    }
  }
`;
