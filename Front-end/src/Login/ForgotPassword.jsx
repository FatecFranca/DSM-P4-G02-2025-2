/* eslint-disable no-unused-vars */
// pages/ForgotPassword.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Digite um e-mail válido");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://back-end-pi-27ls.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Verifique seu e-mail para redefinir a senha.");
        navigate("/login");
      } else {
        toast.error(data.error || "Erro ao solicitar recuperação.");
      }
    } catch (err) {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Esqueceu sua senha?</h2>
        <p className="text-sm text-gray-600 text-center">
          Informe seu e-mail para receber um link de redefinição.
        </p>

        <div className="relative">
          <FiMail className="absolute left-4 top-3.5 text-gray-500 text-lg" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
            placeholder="Seu e-mail"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
        >
          {loading ? "Enviando..." : "Enviar link de recuperação"}
        </button>
      </form>
    </div>
  );
}
