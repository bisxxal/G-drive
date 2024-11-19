import { Toaster } from 'react-hot-toast';
import { MdOutlineDriveFolderUpload } from "react-icons/md";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (  
    <div className=" h-screen w-full flex text-gray-200 justify-">
    <div className=" w-5/12 seccol flex flex-col items-center pt-40 gap-4">

    <div className=" flex items-center gap-2">
     <MdOutlineDriveFolderUpload className=" text-[#4bf478] text-6xl " />
        <h1 className=" text-4xl font-bold ">Upload-It</h1>
    </div>

     <div>
        <p className=" mt-5 text-xl font-semibold">All your files in one secure location</p>
     </div>
    
    </div>

    <section className="w-1/2 center h-screen ">
      {children}
      <Toaster />
    </section>
   </div>
  );
}