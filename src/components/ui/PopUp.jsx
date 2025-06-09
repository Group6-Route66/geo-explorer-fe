const PopUp = ({ openPopUp, children }) => {
  if (openPopUp !== true) return null;

  return (
    // <div
    //   className="fixed inset-0 flex justify-center items-end lg:items-center bg-black/40 "
    // >
    //   <div className="h-2/3 lg:h-fit w-full max-w-full lg:max-w-[500px] p-2 flex justify-center items-start bg-white shadow-inner border-e-emerald-600 rounded-lg py-5">
    //     <div className="w-full p-3 items-center">{children}</div>
    //   </div>
    // </div>

    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/40 p-4 overflow-auto">
      <div
        className="
        w-full max-w-full lg:max-w-[500px] 
        bg-white shadow-inner border border-green rounded-t-2xl lg:rounded-xl 
        p-4 
        max-h-[90vh] overflow-y-auto
      "
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
