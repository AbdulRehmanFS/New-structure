import { PersonProfileIcon } from "util/svgFile";
import { theme } from "util/theme";
import styled from "styled-components";

export const CastListing = ({ heading = "Cast", castLists }) => (
  <CastListingWrapper>
    {castLists?.length ? <div className="cast-heading">{heading}</div> : ""}
    {castLists?.map((list) => (
      <div className="cast-detail" key={list?.name}>
        <div className="image-wrapper">
          {(list?.image ?? list?.profile_pic_url) ? (
            <img src={list?.image ?? list?.profile_pic_url} alt="" height="100%" width="100%" />
          ) : (
            <PersonProfileIcon />
          )}
        </div>
        <div className="cast-name">{list?.name ?? list?.user_name}</div>
      </div>
    ))}
  </CastListingWrapper>
);

const CastListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  .cast-heading {
    font-weight: 600;
  }
  .cast-detail {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
  }
  .image-wrapper {
    height: 28px;
    width: 28px;
    border-radius: 50px;
    overflow: hidden;
    background: ${theme.midGrey};
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      object-fit: contain;
    }
  }
  .cast-name {
    text-transform: capitalize;
    color: ${theme.lightWhite};
  }
`;
