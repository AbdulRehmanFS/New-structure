import { memo } from "react";
import { Col, Image, Row } from "antd";
import moment from "moment";
import { theme } from "@utils/theme";
import {
  CalenderIcon,
  EmailIcon,
  LocationIcon,
  PersonIcon,
  PhoneIcon,
  TicketIcon,
  TimeIcon,
} from "@utils/svgFile";

const Listing = ({ content, icon }) => (
  <div className="flex items-center gap-1.5 my-2">
    {icon}
    <div className="text-[rgba(255,255,255,0.79)]">{content || "N/A"}</div>
  </div>
);

const LiveEventCard = ({ eventDetail }) => {
  return (
    <Row className="p-6 min-h-[150px] bg-[rgba(255,255,255,0.1)] mt-7 rounded-md">
      <Col span={14} className="px-5">
        <div className="text-[25px] mb-5 font-semibold text-white">{eventDetail?.title}</div>
        <Listing
          icon={<LocationIcon height="14px" width="14px" color={theme.white} />}
          content={eventDetail?.venue}
        />
        <div className="flex justify-between w-[65%] flex-wrap gap-2.5">
          <Listing
            icon={<EmailIcon height="14px" width="14px" color={theme.white} />}
            content={eventDetail?.user_account?.email}
          />
          <Listing
            icon={<PhoneIcon height="14px" width="14px" color={theme.white} />}
            content={eventDetail?.user_account?.phone_number}
          />
        </div>
        <div className="flex justify-between w-[65%] flex-wrap gap-2.5">
          <Listing
            icon={<CalenderIcon height="12px" width="12px" color={theme.white} />}
            content={moment(eventDetail?.scheduled_date).format("DD MMM, yyyy")}
          />
          <Listing
            icon={<TimeIcon height="14px" width="14px" color={theme.white} />}
            content={moment.unix(eventDetail?.start_time).format("hh:mm A")}
          />
        </div>
        <div className="flex justify-between w-[65%] flex-wrap gap-2.5">
          <Listing
            icon={<PersonIcon height="14px" width="14px" color={theme.white} />}
            content={eventDetail?.user_account?.user_name}
          />
          <Listing
            icon={<TicketIcon height="14px" width="14px" color={theme.white} />}
            content={`$${eventDetail?.ticket_amount}USD`}
          />
        </div>
        <div className="text-base font-medium mt-4.5 text-white">Description</div>
        <div className="mt-2 text-[rgba(116,116,116,1)] text-sm leading-4 w-[82%]">
          {eventDetail?.description}
        </div>
        {eventDetail?.cast_users && eventDetail?.cast_users?.length > 0 && (
          <div className="mt-4">
            <div className="text-base font-medium text-white mb-2">Cast</div>
            <div className="flex flex-wrap gap-2">
              {eventDetail?.cast_users?.map((cast, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded text-white text-sm"
                >
                  {cast?.user_name || cast?.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </Col>
      <Col span={10}>
        <div className="relative min-h-[150px]">
          <img
            className="w-full h-full object-contain"
            src={eventDetail?.cover_photo_url}
            alt=""
            loading="lazy"
          />
          {eventDetail?.icon ? (
            <div className="absolute h-[75px] w-[75px] rounded-full overflow-hidden bottom-[-30px] left-4 bg-[rgba(19,19,19,1)]">
              <Image
                src={eventDetail?.icon}
                alt="profile"
                height="100%"
                width="100%"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="absolute h-[75px] w-[75px] rounded-full overflow-hidden bottom-[-30px] left-4 bg-lightgrey flex items-center justify-center">
              <PersonIcon height="60px" width="60px" />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default memo(LiveEventCard);

