
import React from "react";
import { Models } from "node-appwrite";
import { getFileTypesParams } from "@/lib/utils";
import Sort from "@/components/custom/Sort";
import { getFiles } from "@/actions/file.actions";
import Card from "@/components/custom/Card";


type FileType = | "image" | "document"| "video" | "audio" | "other";

  interface SearchParamProps {
    params?: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
const SinglePage = async ({ searchParams, params }: SearchParamProps) => {

  const type = ((await params)?.id as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || ""; 

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });

 
  return (
    <div className=" relative w-full h-full">
      <section className="w-full px-4 mt-5">
        <h1 className=" text-4xl mb-4 capitalize font-bold ">{type}</h1>

        <div className=" flex justify-between ">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>

          <div className="sort-container">
            
            <Sort />
          </div>
        </div>
      </section>
 
      {files.total > 0 ? (
        <section className="flex flex-wrap justify-between p-4  ">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default SinglePage;