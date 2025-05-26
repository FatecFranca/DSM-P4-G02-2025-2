/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import NotificationModal from "./NotificationModal";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import { toast } from "react-toastify";
import { FaFileSignature } from "react-icons/fa";
import { GiWateringCan } from "react-icons/gi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { isDarkMode } = useTheme();

  // Notificações lidas persistidas
  const [readNotifications, setReadNotifications] = useState(() => {
    const saved = localStorage.getItem("readNotifications");
    return saved ? JSON.parse(saved) : [];
  });

  const handleRedirect = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    localStorage.removeItem("readNotifications");
    window.location.href = "/login";
  };

  const [selectedUser] = useState(() => {
    const userData = localStorage.getItem("userData");
    try {
      return userData ? JSON.parse(userData) : { fullName: "Usuário" };
    } catch (error) {
      console.error("Erro ao ler userdata:", error);
      return { fullName: "Usuário" };
    }
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
      const nots = (response.data.latest_data || []).map((item) => ({
        id: item.timestamp, // Usa timestamp como id único
        att: `Umidade: ${item.humidity} - ${new Date(item.timestamp).toLocaleString()}`
      }));
      setNotifications(nots.reverse().filter(n => !readNotifications.includes(n.id)));
    } catch {
      setNotifications([]);
    }
  };

  // Atualiza notificações sempre que readNotifications mudar
  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, [readNotifications]);

  // Atualiza hasNotification quando notifications mudar
  useEffect(() => {
    setHasNotification(notifications.length > 0);
  }, [notifications]);

  const handleOpenModal = async () => {
    try {
      await fetchNotifications();
      setModalOpen(true);
    } catch {
      console.error("Erro ao abrir o modal de notificações");
    }
  };

  // Marca como lida e persiste no localStorage
  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const updatedRead = [...readNotifications, id];
    setReadNotifications(updatedRead);
    localStorage.setItem("readNotifications", JSON.stringify(updatedRead));
  };

  const sidebarBgImg = isDarkMode ? "./imgsidebar2.jpg" : "./imgsidebar.jpg";
  const logoImg = "./logosite.svg";
  const sidebarBg = isDarkMode ? "bg-gray-950" : "bg-gray-300";
  const sidebarText = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <div
      className={`fixed h-screen ${sidebarBg} ${sidebarText} transition-all duration-300 z-10 ${
        isOpen ? "w-64" : "w-20"
      } lg:block hidden`}
    >
      <div className="flex flex-col w-full ">
        <div className="relative">
          <img
            src={sidebarBgImg}
            alt="Sidebar Top Image"
            className="w-full h-24 object-cover "
          />
          <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? "bg-black/80" : "bg-black/70"} h-24 `}>
            <img
              src={logoImg}
              onClick={handleRedirect}
              className="h-30 w-30 cursor-pointer"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className={`flex items-center space-x-3 cursor-pointer hover:${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-md p-2`}>
            <div className={`w-10 h-10 ${isDarkMode ? "bg-gray-700" : "bg-gray-500"} rounded-full flex items-center justify-center text-white text-lg`}>
              {selectedUser.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              <span onClick={handleRedirect} className="cursor-pointer">{selectedUser.fullName}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/configuser"
              className={`hover:${isDarkMode ? "bg-gray-800" : "bg-gray-500"} px-4 py-2 rounded-md ${sidebarText} text-lg flex items-center gap-2`}
            >
              <IoIosSettings className={sidebarText} />
              <p className={sidebarText}>Configurações</p>
            </Link>
            <Link
              to="/dashboard"
              className={`hover:${isDarkMode ? "bg-gray-800" : "bg-zinc-500"} px-4 py-2 rounded-md ${sidebarText} text-lg flex items-center gap-2`}
            >
              <FaChartBar className={sidebarText} />
              <p className={sidebarText}>Dashboard</p>
            </Link>
            <Link
              to="/configsensor"
              className={`hover:${isDarkMode ? "bg-gray-800" : "bg-zinc-500"} px-4 py-2 rounded-md ${sidebarText} text-lg flex items-center gap-2`}
            >
              <GiWateringCan className={sidebarText} />
              <p className={sidebarText}>Sensor</p>
            </Link>
            <Link
              to="/relatorios"
              className={`hover:${isDarkMode ? "bg-gray-800" : "bg-zinc-500"} px-4 py-2 rounded-md ${sidebarText} text-lg flex items-center gap-2`}
            >
              <FaFileSignature className={sidebarText} />
              <p className={sidebarText}>Relatorios</p>
            </Link>
            <Link
              to="#"
              onClick={e => {
                e.preventDefault();
                handleOpenModal();
              }}
              className={`hover:${isDarkMode ? "bg-gray-800" : "bg-gray-100"} px-4 py-2 rounded-md ${sidebarText} text-lg flex items-center gap-2 relative`}
            >
              <IoMdNotifications className={sidebarText + " text-xl"} />
              {hasNotification && (
                <span className="absolute top-1 left-6 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
              )}
              <p className={sidebarText}>Notificações</p>
            </Link>
            <NotificationModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
            />
            <div className={`${sidebarText} hover:text-red-600`}>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className={`flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md transition-colors hover:text-red-600 hover:bg-white hover:border-2 hover:border-red-500 group`}
              >
                <FiLogOut className="text-lg text-white transition-colors group-hover:text-red-600" />
                <span className="transition-colors text-white group-hover:text-red-600">
                  Sair
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;