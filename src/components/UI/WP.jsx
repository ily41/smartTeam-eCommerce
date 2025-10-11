
import React from "react";

const WhatsAppIcon = () => {
  return (
    <a
      className="p-4 lg:p-5 bg-white border-1 border-[#d7d7d7] fixed bottom-5 right-5 z-[999] rounded-full shadow-sm"
      href="https://wa.me/0703569121" 
      target="_blank"
      rel="noopener noreferrer"
      
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        className="w-[40px] h-[40px]  md:w-[45px] md:h-[45px] lg:w-[50px] lg:h-[50px]"
      />
    </a>
  );
};

export default WhatsAppIcon;
