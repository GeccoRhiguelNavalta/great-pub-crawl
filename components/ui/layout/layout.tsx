"use client";

import Link from "next/link";
import { FaClipboardList, FaRegPlusSquare, FaCogs } from "react-icons/fa";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-100">
      <div className="flex p-5 md:p-10 overflow-y-scroll">{children}</div>
      <nav className="fixed bottom-0 left-0 w-full grid grid-cols-3 place-items-center place-content-center p-5 bg-slate-300 rounded-t-lg opacity-80">
        <Link href="/">
          <FaClipboardList size={25} />
        </Link>
        <Link href="/review">
          <FaRegPlusSquare size={25} />
        </Link>
        <Link href="/user">
          <FaCogs size={25} />
        </Link>
      </nav>
    </div>
  );
}
