import { useNotification } from "./NotificationContext";
export const useNotify = () => {
    const { showNotification } = useNotification();
    return {
        success: (msg) => showNotification(msg, "success"),
        error: (msg) => showNotification(msg, "error"),
        warning: (msg) => showNotification(msg, "warning"),
        info: (msg) => showNotification(msg, "info"),
    };
};