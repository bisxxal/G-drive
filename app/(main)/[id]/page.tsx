// /* eslint-disable no-unused-vars */
import React from "react";
import { Models } from "node-appwrite";
import { getFileTypesParams } from "@/lib/utils";
import Sort from "@/components/custom/Sort";
import { getFiles } from "@/actions/file.actions";
import Card from "@/components/custom/Card";


type FileType = | "image" | "document"| "video" | "audio" | "other";

  interface SearchParamProps {
    params?: Promise<SegmentParams>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
const SinglePage = async ({ searchParams, params }: SearchParamProps) => {

  const type = ((await params)?.id as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || ""; 

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });

  // console.log(files);
  
 
  return (
    <div className="  w-full h-full">
      <section className="w-full">
        <h1 className="">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

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