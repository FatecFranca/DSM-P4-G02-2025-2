import React from "react";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "../contexts/ThemeContext";
import { FaCheckCircle } from "react-icons/fa";

const NotificationModal = ({ open, onClose, notifications, onMarkAsRead }) => {
  const { isDarkMode } = useTheme();

  if (!open) return null;

  const bgModal = isDarkMode ? "bg-gray-800" : "bg-white";
  const textModal = isDarkMode ? "text-white" : "text-gray-800";
  const bgOverlay = isDarkMode ? "bg-black/70" : "bg-black/40";
  const bgItem = isDarkMode ? "bg-gray-700" : "bg-gray-100";
  const textItem = isDarkMode ? "text-white" : "text-gray-800";
  const textSecondary = isDarkMode ? "text-gray-300" : "text-gray-500";
  const textButton = isDarkMode ? "text-green-400" : "text-green-600";
  const hoverButton = isDarkMode ? "hover:text-green-300" : "hover:text-green-800";
  const hoverClose = isDarkMode ? "hover:text-red-400" : "hover:text-red-500";

  return (
    <div className={`fixed inset-0 z-50 min-h-dvh flex items-center justify-center ${bgOverlay}`}>
      <div
        className={`rounded-lg shadow-lg w-96 p-6 relative transition-colors ${bgModal} ${textModal}`}
      >
        <button
          className={`absolute top-2 right-3 text-xl ${hoverClose}`}
          onClick={onClose}
          aria-label="Fechar"
        >
          <IoMdClose />
        </button>
        <h2 className="text-lg font-bold mb-4">Notificações</h2>
        {notifications.length === 0 ? (
          <p className={`${textSecondary}`}>Sem atualizações recentes</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`flex justify-between items-center rounded p-2 ${bgItem} ${textItem}`}
              >
                <span>{n.att}</span>
                <button
                  className={`text-xs ${textButton} ${hoverButton} hover:underline`}
                  onClick={() => onMarkAsRead(n.id)}
                >
                  Marcar como lida <FaCheckCircle className="inline-block ml-1" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;