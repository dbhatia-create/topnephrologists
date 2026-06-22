import React from "react";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-gray-900 border-[6px] rounded-[2rem] sm:rounded-[2.5rem] h-[520px] sm:h-[600px] w-[260px] sm:w-[280px] bg-white overflow-hidden shadow-2xl flex-shrink-0">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl z-20 flex justify-center items-center">
        <div className="w-10 h-1 bg-gray-800 rounded-full shadow-inner"></div>
      </div>
      
      {/* Content */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden pt-1 bg-white relative z-10" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
    </div>
  );
}
