import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

const Thumbnail =  ({
    type,
    extension,
    url = "",
    imageClassName,
    className,
  }: Props) => {
    const isImage = type === "image" && extension !== "svg";
  return (
    <figure className={cn(" ", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={200}
        height={200}
        className={cn(
          "size-10 rounded-2xl  object-contain",
          imageClassName,
          isImage && "thumbnail-image",
        )}
      />
    </figure>
  )
}

export default Thumbnail
