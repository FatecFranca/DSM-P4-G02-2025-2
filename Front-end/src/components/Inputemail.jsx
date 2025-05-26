const InputEmail = ({ register }) => {
    return (
      <input
        required
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full px-3 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    );
  };
  
  export default InputEmail;
  