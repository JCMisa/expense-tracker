"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutGrid />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budget",
      icon: <PiggyBank />,
      path: "/dashboard/budget",
    },
    {
      id: 3,
      name: "Expenses",
      icon: <ReceiptText />,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: <ShieldCheck />,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow-lg">
      <Link href={'/'}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src={"/wallet.png"} alt="logo" width={40} height={40} />
          <p className="text-xl font-bold sm:block hidden">FinTechFlow</p>
        </div>
      </Link>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={menu.id}>
            <div>
              <h2
                className={`flex gap-2 items-center text-gray-400 font-medium p-5 cursor-pointer rounded-md hover:text-light hover:bg-secondary transition-all mb-2 ${path == menu.path && "text-light bg-secondary"
                  }`}
              >
                {menu.icon}
                {menu.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton /> Manage Profile
      </div>
    </div>
  );
};

export default SideNav;
