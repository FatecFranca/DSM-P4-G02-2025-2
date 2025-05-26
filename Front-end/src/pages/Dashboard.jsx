import { useEffect, useState } from "react";
import Navbar from "../components/MenuMoblie";
import Sidebarmenu from "../components/Sidebar";
import { DashboardSkeleton } from "../components/Skeleton";
import CardDash from "./CardsDahs";
import { useNavigate, useLocation } from "react-router";
import Breadcrumb from "../components/BreadCrumb";
import { useTheme } from "../contexts/ThemeContext";
import { LoadingPage } from "../components/Loadingpage";
import StatsDashboard from "../Dashboard/Card";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loaderType, setLoaderType] = useState("skeleton");  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }
  
    if (location.state?.from === "login" || location.state?.from === "/") {
      setLoaderType("loadingpage");
    } else {
      setLoaderType("skeleton");
    }
  
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
  
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark-bg dark-text" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Navbar />
      <Sidebarmenu isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`ml-0 md:ml-64 p-4 transition-all mt-20 md:mt-0 duration-300`}>
        {loading ? (    
          loaderType === "loadingpage" ? <LoadingPage /> : <DashboardSkeleton />
) : (
          <div>
            <Breadcrumb items={[]} currentPage="Dashboard" />
            <CardDash />
          </div>
        )}
      </div>
    </div>
  );
}