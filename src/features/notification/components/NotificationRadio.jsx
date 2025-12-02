import { PushNotifiation, AutomatedNotification } from "@utils/svgFile";

const NotificationRadio = ({ onChange, value }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
      <div
        className={`flex items-center gap-2.5 text-sm sm:text-base cursor-pointer ${
          value === 1 ? "text-white" : "text-grey-text"
        }`}
        onClick={() => onChange(1)}
      >
        <PushNotifiation color={value === 1 ? "white" : undefined} />
        <span>Push Notification</span>
      </div>
      <div
        className={`flex items-center gap-2.5 text-sm sm:text-base cursor-pointer ${
          value === 2 ? "text-white" : "text-grey-text"
        }`}
        onClick={() => onChange(2)}
      >
        <AutomatedNotification color={value === 2 ? "white" : undefined} />
        <span>Automated Notification</span>
      </div>
    </div>
  );
};

export default NotificationRadio;

