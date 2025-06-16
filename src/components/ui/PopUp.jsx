const PopUp = ({ openPopUp, children }) => {
  if (openPopUp !== true) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/40  overflow-auto">
      <div
        className="
        w-full max-w-full lg:max-w-[500px] 
        bg-white dark:bg-gray-800 shadow-inner border border-green dark:border-transparent rounded-t-2xl lg:rounded-xl 
        p-4 
       max-h-120 overflow-y-auto
      "
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
