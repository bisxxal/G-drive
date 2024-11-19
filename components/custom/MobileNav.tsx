"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation"; 
import Link from "next/link";
// import { Separator } from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; 
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa6";
import { MdEmergencyRecording } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/actions/user.actions";
import { GoSidebarExpand } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
interface Props {
  $id: string;
  accountId: string;
  fullname: string;
  avatar: string;
  email: string;
}
export const navItems = [
  {
    name: "Dashboard",
    icon: <MdDashboard/> ,
    url: "/",
  },
  {
    name: "Documents",
    icon: <IoDocumentsSharp/> ,
    url: "/documents",
  },
  {
    name: "Images",
    icon: <FaImages/> ,
    url: "/images",
  },
  {
    name: "Media",
    icon: <MdEmergencyRecording/> ,
    url: "/media",
  },
  {
    name: "Others",
    icon: <FaChartPie/> ,
    url: "/others",
  },
];
const MobileNav = ({
  $id: ownerId,
  accountId,
  fullname,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();


  return (
    <header className=" hidden max-md:flex seccol justify-between px-4">
        <MdOutlineDriveFolderUpload className=" text-[#4bf478] text-5xl " />


    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
      <GoSidebarExpand  className=" text-2xl "/>

      </SheetTrigger>
      <SheetContent className=" !backdrop-blur-md text-zinc-300 bg-[#ffffff16] h-screen px-3">
        <SheetTitle>
          <div className="header-user">
            <Image
              src={avatar}
              alt="avatar"
              width={44}
              height={44}
              className=" rounded-full "
            />
            <div className="sm:hidden text-gray-200 lg:block">
              <p className="subtitle-2 capitalize">{fullname}</p>
              <p className="caption">{email}</p>
            </div>
          </div>
          {/* <Separator className="mb-4 bg-light-200/20" /> */}
        </SheetTitle >

        <nav className=" mt-3">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="">
              <h2
                className={cn(
                  "flex items-center gap-2 rounded-3xl hover:bg-[#4bf478] hover:text-white transition-all p-2",  
                  pathname === url && "   bg-[#4bf478] text-white ",
                )}
              >
                
                {icon } 
                <p className=" text-white text-sm ">{name}</p>
              </h2>
            </Link>
          ))}
        </ul>
      </nav>
        {/* <Separator className="my-5 bg-light-200/20" /> */}

        <div className="flex flex-col justify-between gap-5 pb-5">
          <FileUploader ownerId={ownerId} accountId={accountId} />
          <Button
            type="submit"
            className=" bg-red-500 "
            onClick={async () => await signOutUser()}
          >
           <IoLogOutOutline className=" !text-2xl" />

            <p>Logout</p>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  </header>
  )
}

export default MobileNav
