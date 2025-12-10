/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Col, Image, Row } from "antd";
import moment from "moment";
import { theme } from "util/theme";
import {
  CalenderIcon,
  EmailIcon,
  LocationIcon,
  PersonIcon,
  PhoneIcon,
  TicketIcon,
  TimeIcon,
} from "util/svgFile";
import { CastListing } from "component/castListing/CastListing";

const Listing = ({ content, icon }) => (
  <div className="list-wrapper">
    {icon}
    <div className="list-data">{content}</div>
  </div>
);



export default function LiveEventCard({ eventDetail }) {
  return (
    <EventCardWrapper>
      <Col span={14} className="content-section">
        <div className="heading">{eventDetail?.title}</div>
        <Listing
          icon={<LocationIcon height="14px" width="14px" color={theme.white} />}
          content={eventDetail?.venue || "N/A"}
        />
        <div className="flex-space">
          <Listing
            icon={<EmailIcon height="14px" width="14px" color={theme.white} />}
            content={eventDetail?.user_account?.email}
          />
          <Listing
            icon={<PhoneIcon height="14px" width="14px" color={theme.white} />}
            content={eventDetail?.user_account?.phone_number}
          />
        </div>
        <div className="flex-space">
          <Listing
            icon={
              <CalenderIcon height="12px" width="12px" color={theme.white} />
            }
            content={moment(eventDetail?.scheduled_date).format("DD MMM, yyyy")}
          />
          <Listing
            icon={<TimeIcon height="14px" width="14px" color={theme.white} />}
            content={moment.unix(eventDetail?.start_time).format("hh:mm A")}
          />
        </div>
        <div className="flex-space">
          <Listing
            icon={<PersonIcon height="14px" width="14px" color={theme.white} />}
            content={eventDetail?.user_account?.user_name}
          />
          <Listing
            icon={<TicketIcon height="14px" width="14px" color={theme.white} />}
            content={`$${eventDetail?.ticket_amount}USD`}
          />
        </div>
        <div className="description">Description</div>
        <div className="description-content">{eventDetail?.description}</div>
        <CastListing castLists={eventDetail?.cast_users} />
      </Col>
      <Col span={10}>
        <div className="image-section">
          <img
            className="event-image"
            src={eventDetail?.cover_photo_url}
            width="100%"
            height="100%"
            alt=""
            loading="lazy"
          />
          {eventDetail?.icon ? (
            <div className="creator-profile-image">
              <Image
                src={eventDetail?.icon}
                alt="profile"
                height="100%"
                width="100%"
              />
            </div>
          ) : (
            <div className="no-image">
              <PersonIcon height="60px" width="60px" />
            </div>
          )}
        </div>
      </Col>
    </EventCardWrapper>
  );
}

const EventCardWrapper = styled(Row)`
  padding: 25px 20px 40px 20px;
  min-height: 150px;
  background: ${theme.grey2};
  margin-top: 30px;
  border-radius: 6px;
  .content-section {
    padding: 0 20px;
  }
  .heading {
    font-size: 25px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .list-wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
    margin: 8px 0;
  }
  .list-data {
    color: ${theme.lightWhite};
  }
  .flex-space {
    display: flex;
    justify-content: space-between;
    width: 65%;
    flex-wrap: wrap;
    gap: 10px;
  }
  .description {
    font-size: 16px;
    font-weight: 500;
    margin-top: 18px;
  }
  .description-content {
    margin: 8px 0;
    color: ${theme.greyText};
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    width: 82%;
  }
  .event-image {
    object-fit: contain;
  }
  .image-section {
    position: relative;
    // aspect-ratio: 7 / 4;
    // width: 100%;
    // height: auto;
    min-height: 150px;
    // background: ${theme.black};
  }
  .creator-profile-image {
    position: absolute;
    height: 75px;
    width: 75px;
    border-radius: 50px;
    overflow: hidden;
    bottom: -30px;
    left: 15px;
    background: ${theme.screenBackground};
    img {
      object-fit: contain;
    }
  }
  .no-image {
    position: absolute;
    height: 75px;
    width: 75px;
    border-radius: 50px;
    overflow: hidden;
    bottom: -30px;
    left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: lightgrey;
    margin: auto;
  }
`;

