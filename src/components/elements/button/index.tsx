const Button = ({ ...otherProps }) => {
  return (
    <button
      className="w-full p-4 my-4 font-bold text-white bg-green-700 border rounded-lg hover:bg-green-800"
      {...otherProps}
    >
      Pay
    </button>
  );
};

export default Button;
