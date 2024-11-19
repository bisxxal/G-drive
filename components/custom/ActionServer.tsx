import { Models } from "node-appwrite"; 
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDataTime";
import { CiCircleRemove } from "react-icons/ci";
const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="file-details-thumbnail ">
    <Thumbnail className="  " type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="font-semibold mb-1">{file.name}</p>
      <FormattedDateTime date={file.$createdAt} className="" />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="file-details-label text-left">{label}</p>
    <p className="file-details-value text-left">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format: " value={file.extenstion} />
        <DetailRow label="Size: " value={convertFileSize(file.size)} />
        <DetailRow label="Owner: " value={file.owner.fullname} />
        <DetailRow label="Last edit :" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="">
        <p className="subtitle-2 pl-1 text-light-100">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="bg-red-600"
                >
                 <CiCircleRemove size={38} className=" !text-3xl" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};