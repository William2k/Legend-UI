import { store } from "react-notifications-component";
import { NotificationType } from "./types";

const useNotification = () => {
  const notify = (
    title: string,
    message: string,
    type: NotificationType,
    duration: number = 3000
  ) => {
    store.addNotification({
      title,
      message,
      type,
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration
      }
    });
  };

  return { notify };
};

export default useNotification;
