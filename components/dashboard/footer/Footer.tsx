import React from "react";

const Footer = () => {
  return (
    <div className="bg-foreground px-6 py-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-7 ">
          <div className="text-sm text-white font-semibold">Privacy Policy</div>
          <div className="text-sm text-white font-semibold">
            Terms of Service
          </div>
          <div className="text-sm text-white font-semibold">Contact Us</div>
        </div>

        <div className="text-white text-center text-sm gap-7 mt-3">
          © 2024 Rate A Guard, LLC. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
