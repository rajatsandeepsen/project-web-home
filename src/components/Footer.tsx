import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex z-50 items-center justify-center relative h-20 border-t-2 overflow-scroll md:overflow-hidden text-xs md:text-1xl">
      <div className="border-r-1 px-2 w-fit min-w-28 md:px-10 flex justify-center items-center">
        100 cookies blocked
      </div>
      <div className="w-[2px] h-5 bg-white rounded-md"></div>
      <div className="border-r-1 px-2 w-fit min-w-28 md:px-10 flex justify-center items-center">
        34Mbps & 20Mbps{" "}
      </div>
      <div className="w-[2px] h-5 bg-white rounded-md"></div>
      <div className="border-r-1 px-2 w-fit min-w-28 md:px-10 flex justify-center items-center">
        weather is rainy today
      </div>
      <div className="w-[2px] h-5 bg-white rounded-md"></div>
      <div className="border-r-1 px-2 w-fit min-w-28 md:px-10 flex justify-center items-center">
        you have visited 2700 unique websites
      </div>
      <div className="w-[2px] h-5 bg-white rounded-md"></div>
      <div className="border-r-1 px-2 w-fit min-w-28 md:px-10 flex justify-center items-center">
        you have spent 300 hours and 47 minutes here with us
      </div>
    </div>
  );
};

export default Footer;
