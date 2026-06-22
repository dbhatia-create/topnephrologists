import React from "react";

export default function TabletFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-gray-900 border-[10px] sm:border-[12px] rounded-[1.5rem] sm:rounded-[2rem] h-[550px] w-[380px] sm:h-[650px] sm:w-[460px] bg-white overflow-hidden shadow-2xl flex-shrink-0">
      {/* Camera Dot */}
      <div className="absolute top-[4px] sm:top-[5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full shadow-inner z-20" />
      
      {/* Content */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-white relative z-10" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
    </div>
  );
}
