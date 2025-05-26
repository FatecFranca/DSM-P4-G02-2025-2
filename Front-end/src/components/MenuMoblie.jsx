import { useState } from "react";
import { Link } from "react-router";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedUser] = useState(() => {
    const userData = localStorage.getItem("userData");
    try {
      return userData ? JSON.parse(userData) : { fullName: "Usuário" };
    } catch (error) {
      console.error("Erro ao ler userdata:", error);
      return { fullName: "Usuário" };
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");

    window.location.href = "/login";
  };

  return (
    <nav className="md:hidden fixed top-0 w-full bg-gray-800 text-white z-50">
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl p-2 hover:bg-gray-700 rounded"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <img
              src="./logosite.svg"
              className="h-25 w-30"
              style={{ objectFit: "contain" }}
            />
        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-sm">
          {selectedUser.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full w-full bg-gray-800 shadow-lg">
          <div className="p-4 border-t border-gray-700">
            <div className="mb-4 text-center">
              <p className="font-medium">{selectedUser.fullName}</p>
              <p className="text-sm text-gray-400">{selectedUser.email}</p>
            </div>

            <Link
              to="/configuser"
              className=" p-3 hover:bg-gray-700 rounded flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoIosSettings className="text-white" />
              <p className="text-white">Configurações</p>
            </Link>
            <Link
                          to="/dashboard"
                          className="hover:bg-gray-700 px-4 py-2 rounded-md text-white text-lg flex items-center gap-2"
                        >
                          <VscGraph className="text-white" />
                          <p className="text-white">Dashboard</p>
                        </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-3 hover:bg-gray-700 rounded text-red-400"
            >
              <FiLogOut className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
