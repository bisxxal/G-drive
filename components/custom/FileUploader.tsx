'use client'
import { convertFileToUrl, getFileType } from '@/lib/utils'; 
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { MdOutlineCloudUpload } from "react-icons/md";
import Thumbnail from './Thumbnail';
import { usePathname } from 'next/navigation';
import { MAX_FILE_SIZE } from '@/lib/contants'; 
import { uploadFile } from '@/actions/file.actions';
import { LuLoader } from "react-icons/lu";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import toast from 'react-hot-toast';
interface Props {
    ownerId: string;
    accountId: string;
    className?: string;
  }
const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname(); 
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {


        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );

          return toast.error(`${file.name} is too large. Max file size is 50MB.`); 
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              toast.success(`${file.name} uploaded successfully`);
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
            }
          },
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button className=' px-4 font-semibold py-1 rounded-2xl flex items-center gap-2 bg-[#26c851]'>
      Upload <MdOutlineCloudUpload size={22} />

      </button>
      {
        files.length > 0 && ( 
          <div className=' absolute right-10 max-md:left-0 bottom-8 !bg-zinc-950  rounded-3xl  p-2 '>
            <h4 className=' text-sm mt-2 ml-3'>Uploading</h4>
            
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="  mt-2 p-2 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="preview-item-name text-sm">
                    {file.name}
                    <LuLoader className=' text-xl animate-spin' />
                  </div>
                </div>

                <IoIosRemoveCircleOutline  className=' text-3xl'  onClick={(e) => handleRemoveFile(e, file.name)} />
                {/* <Image

                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                 
                /> */}
              </li>
            );
          })}
          </div>
        )
      }
     
    </div>
  )
}

export default FileUploader
