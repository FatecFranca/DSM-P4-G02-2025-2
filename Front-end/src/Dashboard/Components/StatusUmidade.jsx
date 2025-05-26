import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTint } from "react-icons/fa";
import SkeletonStatusUmidade from "./Skeletoncard";

const StatusUmidade = () => {
    const [humidity, setHumidity] = useState(null);
    const [status, setStatus] = useState("");
    const [color, setColor] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHumidity = async () => {
            try {
                const response = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
                const humidityValue = response.data.latest_data[0].humidity;
                setHumidity(humidityValue);
                updateStatusAndColor(humidityValue);
            } catch (error) {
                console.error("Erro ao buscar dados do sensor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHumidity();
    }, []);

    const updateStatusAndColor = (value) => {
        if (value < 30) {
            setStatus("Crítico");
            setColor("bg-red-500");
        } else if (value >= 30 && value < 50) {
            setStatus("Baixo");
            setColor("bg-orange-500");
        } else if (value >= 50 && value < 70) {
            setStatus("Médio");
            setColor("bg-yellow-500");
        } else if (value >= 70 && value <= 100) {
            setStatus("Bom");
            setColor("bg-green-500");
        } else if (value > 100) {
            setStatus("Sobrecarregado");
            setColor("bg-purple-500");
        }
    };

    if (loading) {
        return <SkeletonStatusUmidade />;
    }

    return (
        <div
            className={`flex flex-col items-center justify-center w-72 h-36 rounded-lg text-white relative shadow-lg overflow-hidden ${color}`}
        >
            <h3 className="text-lg font-semibold">Status Atual de Umidade</h3>
            <p className="text-xs text-gray-100">Valor referente as ultimas duas horas </p>
            <p className="text-2xl font-bold">
                {humidity !== null ? `${humidity.toFixed(2)}%` : ""}
            </p>
            <p className="text-sm">{status}</p>
            <FaTint
                className="absolute bottom-[-20px] right-[-20px] text-[120px] text-white opacity-20"
            />
        </div>
    );
};

export default StatusUmidade;
