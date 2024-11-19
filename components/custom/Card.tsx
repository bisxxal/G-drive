import { Models } from "node-appwrite";
import Link from "next/link"; 
import { convertFileSize } from "@/lib/utils"; 
import Thumbnail from "./Thumbnail";
import ActnDropdown from "./ActnDropdown";
import FormattedDateTime from "./FormattedDataTime";

const Card = ({ file }: { file: Models.Document }) => {
  
  return (
    <Link href={file.url} target="_blank" className=" block mb-2 !w-[190px] h-[180px] rounded-2xl seccol inshadow ">
      <div className="flex justify-between p-2">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-24  object-cover rounded-2xl "
          imageClassName="!size-35 object-cover rounded-3xl "
        />

        <div className="flex flex-col items-end justify-between">
          <ActnDropdown file={file} />
          <p className=" text-xs fonnt-bold">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="px-2">
        <p className="text-sm  font-semibold line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="text-xs line-clamp-1 text-light-200">
          By: {file.owner.fullname}
        </p>
      </div>
    </Link>
  );
};
export default Card;