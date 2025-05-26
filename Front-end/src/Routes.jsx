import { Route, Routes } from "react-router";
import Login from "./Login/Login";
import Cadastro from "./Login/cadastro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import UpdateUser from "./pages/ConfigUSer";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from "./Login/resetsenha";
import { ThemeProvider } from './contexts/ThemeContext'
import Error505 from "./pages/505";
import Network from "./pages/Network";
import NotificationPage from "./pages/NotificationPage";
import ReportPage from "./Relatorio/pages/ReportPage";
import ConfigSensor from "./Config/Pages/ConfigSensor";

export default function Rotas() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
          <ThemeProvider>
          <NotificationPage />

      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/configuser" element={<UpdateUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/network" element={<Network />} />
        <Route path="/505" element={<Error505 />} />
        <Route path="*" element={<Error505 />} />
        <Route path="/relatorios" element={<ReportPage />} />
        <Route path="/configsensor" element={<ConfigSensor />} />
      </Routes>
      </ThemeProvider>

    </>
  );
}
