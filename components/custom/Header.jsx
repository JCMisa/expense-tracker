"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-md">
      <div className="flex items-center gap-2">
        <Image src={"/wallet.png"} alt="logo" width={60} height={60} />
        <p className="text-xl font-bold sm:block hidden">FinTechFlow</p>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/dashboard"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
