const CustomError = () => {
  return (
    <div className="flex justify-center items-center h-150">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md text-center max-w-md">
        <span className="text-4xl mb-2">🚨</span>
        <strong className="text-lg block mb-1">
          Oops! Something went wrong.
        </strong>
        <p className="text-sm mb-3">
          We're having trouble loading the data. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default CustomError;
