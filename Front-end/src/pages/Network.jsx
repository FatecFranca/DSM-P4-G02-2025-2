import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";

const Network = () => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkConnection = () => {
      if (navigator.onLine) {
        setChecking(false);
      } else {
        setTimeout(() => {
          navigate("/505");
        }, 6000);
      }
    };

    checkConnection();

    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);
    };
  }, [navigate]);

  if (!checking) {
    navigate(-1);
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Spinner className="w-32 h-32 mb-6" />
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Verificando sua conexão...
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Aguarde enquanto verificamos sua conexão com a internet.
      </p>
    </div>
  );
};

export default Network;