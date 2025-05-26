import { useEffect } from "react";
import axios from "axios";

const NotificationPage = () => {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const checkNotification = async () => {
      try {
        const response = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
        const latestData = response.data.latest_data || [];
        if (latestData.length === 0) return;

        const readNotifications = JSON.parse(localStorage.getItem("readNotifications") || "[]");

        const novas = latestData.filter(item => !readNotifications.includes(item.timestamp));

        novas.forEach((item) => {
          if (Notification.permission === "granted") {
            new Notification("Seu sensor enviou uma nova notificação", {
              body: `Umidade: ${item.humidity} - ${new Date(item.timestamp).toLocaleString()}`,
              icon: "./logosite.svg",
            });
          }
          readNotifications.push(item.timestamp);
        });

        if (novas.length > 0) {
          localStorage.setItem("readNotifications", JSON.stringify(readNotifications));
        }
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    checkNotification();
    const interval = setInterval(checkNotification, 50000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default NotificationPage;