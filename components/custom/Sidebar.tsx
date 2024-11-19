"use client";

import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa6";
import { MdEmergencyRecording } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
 
interface Props {
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
const Sidebar = ({ fullname, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className=" w-[15%] p-4 max-md:hidden seccol flex flex-col justify-between">
      <Link className="flex items-center gap-1" href="/">
      <MdOutlineDriveFolderUpload className=" text-[#4bf478] text-6xl " />
      <h1 className=" text-gray-300 text-2xl max-lg:hidden font-bold ">Upload It</h1>
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <h2
                className={cn(
                  "flex items-center gap-2 rounded-3xl hover:bg-[#4bf478] hover:text-white transition-all p-2",  
                  pathname === url && "   bg-[#4bf478] text-white ",
                )}
              >
                
                {icon }
            
                <p className="hidden text-sm lg:block">{name}</p>
              </h2>
            </Link>
          ))}
        </ul>
      </nav>

     

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullname}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;