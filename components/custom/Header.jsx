import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="p-5 flex justify-between items-center border shadow-md">
      <div className="flex items-center gap-2">
        <Image src={"/wallet.png"} alt="logo" width={60} height={60} />
        <p className="text-xl font-bold sm:block hidden">FinTechFlow</p>
      </div>
      <Button>Get Started</Button>
    </div>
  );
};

export default Header;
