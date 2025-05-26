import { useState } from "react";
import { FaEye } from "react-icons/fa"; 
import { FaEyeSlash } from "react-icons/fa6";

const InputPassword = ({ register }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        placeholder="Sua senha"
        type={showPassword ? "text" : "password"}
        {...register("password", {
          required: "Campo obrigatório",
          minLength: {
            value: 6,
            message: "Mínimo 6 caracteres",
          },
        })}
        className="w-full px-3 py-2 text-white rounded-md border mt-5 border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
      >
        {showPassword ? <FaEyeSlash className="text-white mt-5" size={20} /> : <FaEye size={20} className="text-white mt-5" />}
      </button>
    </div>
  );
};

export default InputPassword;
