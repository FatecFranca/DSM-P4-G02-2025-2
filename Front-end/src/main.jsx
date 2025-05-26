import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router";
import Rotas from "./Routes";
import './app.css'

function GlobalNetworkListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOffline = () => {
      navigate("/network");
    };
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, [navigate]);

  return null;
}

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <GlobalNetworkListener />
    <Rotas />
  </BrowserRouter>
);
