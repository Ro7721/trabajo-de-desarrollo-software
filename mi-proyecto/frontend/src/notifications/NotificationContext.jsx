import { createContext, useContext, useState, useCallback } from "react";
import EdgeNotification from "./EdgeNotification";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = "info") => {
        const id = Date.now() + Math.random();
        setNotifications((prev) => {
            // Limit to 5 notifications max on screen
            const limited = prev.length >= 5 ? prev.slice(1) : prev;
            return [...limited, { id, message, type }];
        });

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3800);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {/* Notification stack container */}
            {notifications.map((n, i) => (
                <EdgeNotification
                    key={n.id}
                    message={n.message}
                    type={n.type}
                    index={i}
                    onClose={() => removeNotification(n.id)}
                />
            ))}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}