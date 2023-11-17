const LoadingCard = () => {
  return (
    <div className="border rounded-md mt-10 p-4 max-w-[305px]">
      <div className="w-full bg-gray-300 h-[220px] rounded-md p-3"></div>
      <div className="flex animate-pulse flex-col gap-y-5 my-4">
        <div className="flex flex-col space-y-3">
          <div className="w-2/3 bg-gray-300 h-6 rounded-md "></div>
          <div className="w-full bg-gray-300 h-6 rounded-md "></div>
          <div className="w-2/3 bg-gray-300 h-6 rounded-md "></div>
          <div className="w-1/3 bg-gray-300 h-6 rounded-md "></div>
          <div className="w-1/3 bg-gray-300 h-6 rounded-md "></div>

          <div className="w-full bg-gray-300 h-6 py-8 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
