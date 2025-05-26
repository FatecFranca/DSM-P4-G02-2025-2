const Button = ({ label }) => {
    return (
      <button
        data-ripple-light="false"
        className="rounded-md w-full mt-5 bg-sky-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-sky-700 focus:shadow-none active:bg-sky-700 hover:bg-sky-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="submit"
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  