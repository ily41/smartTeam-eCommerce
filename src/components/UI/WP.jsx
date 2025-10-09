
import React from "react";

const WhatsAppIcon = () => {
  return (
    <a
      className="p-5 bg-white fixed bottom-5 right-5 z-[999] rounded-full shadow-sm"
      href="https://wa.me/0703569121" 
      target="_blank"
      rel="noopener noreferrer"
      
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        style={{ width: "50px", height: "50px" }}
      />
    </a>
  );
};

export default WhatsAppIcon;
