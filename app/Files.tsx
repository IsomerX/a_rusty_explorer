/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Tooltip } from "react-tooltip";

export default function Files({
    path,
    setPath,
}: {
    path: string;
    setPath: (path: string) => void;
}) {
    const PATH = path;
    const [files, setFiles] = useState<string[]>();
    useEffect(() => {
        invoke<string>("get_files_in_dir", {
            path: PATH,
        })
            .then((data) => setFiles(JSON.parse(data)))
            .catch(console.error);
    }, [PATH]);
    if (!files) return <></>;
    return (
        <div className="grid grid-cols-4 xl:grid-cols-6 gap-5 py-10">
            {files.map((file) => {
                return (
                    <div key={file}>
                        <Tooltip id={file} content={file.replace(PATH, "")} />
                        <div
                            key={file}
                            className="grid place-items-center w-full gap-1"
                            role="button"
                            onClick={() => setPath(file)}
                            data-tooltip-id={file}
                        >
                            <img
                                src="/icons/unknown_file.svg"
                                className="w-32 p-3 hover:bg-white/10 rounded-xl transition-all duration-300"
                                alt="folder"
                                role="button"
                            />

                            <p className="text-white/80 truncate w-20 text-center">
                                {file.replace(PATH, "")}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
