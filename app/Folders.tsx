/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Volume } from "@/types";
import Image from "next/image";

export default function Folders({
    path,
    setPath,
}: {
    path: string;
    setPath: (path: string) => void;
}) {
    const PATH = path;
    const [folders, setFolders] = useState<string[]>();
    useEffect(() => {
        invoke<string>("get_folders_in_dir", {
            path: PATH,
        })
            .then((data) => setFolders(JSON.parse(data)))
            .catch(console.error);
    }, [PATH]);
    if (!folders) return <></>;
    console.log(folders);
    return (
        <div className="grid grid-cols-4 xl:grid-cols-6 gap-5 py-10">
            {folders.map((folder) => {
                return (
                    <div
                        key={folder}
                        className="grid place-items-center w-full gap-1"
                        role="button"
                        onClick={() => setPath(folder)}
                    >
                        <img
                            src="/icons/folder.svg"
                            className="w-32 p-2 hover:bg-white/10 rounded-md transition-all duration-300"
                            alt="folder"
                            role="button"
                        />

                        <p className="text-white/80 truncate w-20 text-center">
                            {folder.replace(PATH, "")}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
