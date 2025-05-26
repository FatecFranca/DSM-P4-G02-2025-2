import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputEmail from "../components/Inputemail";
import Button from "../components/Button";
import InputPassword from "../components/InputSenha";
import InputText from "../components/InputText";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import axios from "axios";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const sanitizedData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };
    console.log("Dados enviados:", sanitizedData);
    try {
      const response = await axios.post(
        "https://back-end-pi-27ls.onrender.com/api/auth/register",
        sanitizedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Cadastro realizado com sucesso! ");
      } else {
        const result = response.data;
        if (result.error && result.error.includes("já está cadastrado")) {
          toast.error(result.error, {
            autoClose: 6000,
          });
        } else {
          toast.error(result.error || "Erro ao realizar cadastro");
        }
      }
    } catch (error) {
      const result = error.response?.data;
      if (result && result.error && result.error.includes("já está cadastrado")) {
        toast.error(result.error, {
          autoClose: 6000,
        });
      } else {
        toast.error(result?.error || "Não foi possível conectar ao servidor");
      }
      console.error("Erro na requisição:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel ">
         <img src="./logosite.svg" alt="Logo" className="logo h-100 " />
                <Lottie
                  animationData={animationData}
                  className="lottie-animation"
                  loop
                  autoplay
                />
      </div>
      <div className="right-panel">
        <h1 className="text-center mb-8 text-6xl">Criar conta</h1>
        <p className="mb-4">
          Já possui uma conta? <a href="/login">Login</a>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
          <div className="input-group mb-5">
            <InputText
              placeholder="Nome"
              register={register}
              name="firstName"
              error={errors.firstName}
            />
            <InputText
              placeholder="Sobrenome"
              register={register}
              name="lastName"
              error={errors.lastName}
            />
          </div>

          <InputEmail register={register} />

          <InputPassword register={register} />

          <Button
            loading={isSubmitting}
            label={isSubmitting ? "Cadastrando..." : "Criar conta"}
            className="full-width"
          />
        </form>
      </div>
    </div>
  );
}
