const InputText = ({ placeholder, register, name, error }) => {
    return (
      <div className="w-full">
        <input
          placeholder={placeholder}
          {...register(name, {
            required: "Campo obrigatório",
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/,
              message: "Caracteres inválidos",
            },
          })}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  };
  
  export default InputText;
  