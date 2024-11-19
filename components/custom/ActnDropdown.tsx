"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, }from "@/components/ui/dropdown-menu";
import { useState } from "react"; 
import { Models } from "node-appwrite"; 
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { deleteFile, renameFile, updateFileUsers } from "@/actions/file.actions";
import { FileDetails, ShareInput } from "./ActionServer";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { CgDetailsLess } from "react-icons/cg";
import { FaShare } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiSpinner } from "react-icons/pi";
interface ActionType {
    label: string;
    icon: JSX.Element;
    value: string;
  }

  export const actionsDropdownItems = [
    {
      label: "Rename",
      icon: <MdOutlineDriveFileRenameOutline />,
      value: "rename",
    },
    {
      label: "Details",
      icon: <CgDetailsLess />,
      value: "details",
    },
    {
      label: "Share"   ,
      icon: <FaShare />   ,
      value: "share",
    },
    {
      label: "Download",
      icon: <FaDownload />      ,
      value: "download",
    },
    {
      label: "Delete",
      icon: <MdDelete />,
      value: "delete",
    },
  ];

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    //   setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>renameFile({ fileId: file.$id, name, extenstion: file.extenstion, path }),  
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>deleteFile({ fileId: file.$id, bucketFileld: file.bucketFileld, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className=" backdrop-blur-md bg-[#ffffff18] px-7 inshadow border-2 border-[#ffffff25] !text-white button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>

          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete  
              <span className="brand"> {" "}{file.name}  {" "} </span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className=" bg-red-500 hover:bg-red-600 ">
              Cancel
            </Button>
            <Button onClick={handleAction} className=" bg-blue-500 hover:bg-blue-600 ">
              <p className="capitalize">{value}</p>
              {isLoading && (
                <PiSpinner className="animate-spin text-white" />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className=" !rounded-xl !bg-[#00000049] p-1 px-[1px]">
        <HiOutlineDotsVertical className=" text-2xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="  text-white seccol !w-52 border-2 rounded-3xl border-[#ffffff26]">
          <DropdownMenuLabel className="max-w-[200px]  ">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);

                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value,)  ) {  setIsModalOpen(true); }}} >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileld)}
                  download={file.name}
                  className="flex items-center gap-2"
                > 
                <h2 className=" text-xl">
                  {actionItem.icon}
                </h2>
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                 <h2 className=" text-xl">
                  {actionItem.icon}
                </h2>
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};
export default ActionDropdown;