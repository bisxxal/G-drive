import React from 'react'
import { Button } from '../ui/button';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
 
import { signOutUser } from '@/actions/user.actions';
import FileUploader from './FileUploader';
import Search from './Search';
import { IoLogOutOutline } from 'react-icons/io5';

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  // console.log("Header", userId , accountId);
  
  return (
    <header className="flex seccol py-4 px-3 w-full max-md:hidden justify-between">
    <Search />
    <div className="flex gap-4 ">
      <FileUploader ownerId={userId} accountId={accountId} />
      <form
        action={async () => {
          "use server";

          await signOutUser();
        }}
      >
        <Button type="submit" className=" bg-red-700 group  !transition-all rounded-full hover:bg-red-500 ">
        <IoLogOutOutline size={30} className=" !size-5 text-2xl" />
        <h1 className='hidden group-hover:transition-all group-hover:block'>Sign-Out</h1>
        </Button>
      </form>
    </div>
  </header>

  )
}

export default Header
