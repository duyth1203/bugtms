import notification from "antd/lib/notification";

const Notification = (
  type = "error",
  message = "Error",
  description = "Error occured",
  duration = 2,
  placement = "topRight"
) =>
  notification[type]({
    message,
    description,
    duration,
    placement
  });

export default Notification;
