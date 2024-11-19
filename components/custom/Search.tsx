//@ts-nocheck
//@ts-ignore
"use client";
import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { getFiles } from "@/actions/file.actions";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDataTime";
import { CiSearch } from "react-icons/ci";
const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`,
    );
  };

  return (
    <div className=" w-[200px]">
      <div className="  ">
     <div className=" !w-[200px] flex bg-[#00000052] rounded-full max-md:py-1 px-5 py-2 items-center">
     <CiSearch size={30} />
        <Input
          value={query}
          placeholder="Search..."
          className=" border-none  "
          onChange={(e) => setQuery(e.target.value)}
        />
     </div>

        {open && (
          <div className=" absolute !w-[200px] !backdrop-blur-[10px] py-2 bg-[#ffffff23] flex flex-col !z-[100] rounded-xl px-2">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center mb-4 justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className=" font-semibold line-clamp-1 text-gray-300 ">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="text-gray-600 line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="w-[200px]">No files found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;