import React from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router";
import Button from "../components/Button";
import InputEmail from "../components/Inputemail";
import InputPassword from "../components/InputSenha";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json"; 

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const email = data.email?.trim?.().toLowerCase() || '';
      const password = data.password?.trim?.() || '';
        
      if (!email || !password) {
        toast.error("Preencha todos os campos");
        return;
      }
  
      const response = await fetch('https://back-end-pi-27ls.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Erro ao fazer login");
      }
  
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userData', JSON.stringify(result.user));
      
      toast.success(`Login realizado com sucesso! Bem-vindo ${result.user.email}`);
      setTimeout(() => {
        navigate("/dashboard", { state: { from: "login" } });
            }, 1500);
      
    } catch (error) {
      console.error("Erro no login:", error);
      let errorMessage = error.message;
      
      if (error.message.includes('Credenciais inválidas')) {
        errorMessage = "E-mail ou senha incorretos";
      } else if (error.message.includes('servidor')) {
        errorMessage = "Problema no servidor. Tente novamente mais tarde";
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <img src="./logosite.svg" alt="Logo" className="logo h-100 " />
        <Lottie
          animationData={animationData}
          className="lottie-animation"
          loop
          autoplay
        />
      </div>
      <div className="right-panel">
        <h1 className="text-center mb-8 text-6xl">Bem vindo de volta!</h1>
        <p className="mb-4">Não tem uma conta? <a href="/">Cadastre-se</a></p>

        <form onSubmit={handleSubmit(handleLogin)}>
          <InputEmail register={register} />
          <InputPassword register={register} />
          <Button 
            type="submit"
            label="Entrar" 
          />
        </form>
        <p className="text-sm text-center mt-4">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Esqueci minha senha
          </a>
        </p>
      </div>
      
      <ToastContainer />
    </div>
  );
}
