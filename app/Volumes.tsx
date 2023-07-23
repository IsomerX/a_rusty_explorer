"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Volume } from "@/types";

export default function Volumes({
    setDirectory,
}: {
    setDirectory: (path: string) => void;
}) {
    const [volumes, setVolumes] = useState<Volume[]>();
    useEffect(() => {
        invoke<string>("get_volumes")
            .then((data) => setVolumes(JSON.parse(data)))
            .catch(console.error);
    }, []);
    if (!volumes) return <></>;
    return (
        <div className="flex gap-3">
            {volumes.map((volume) => {
                return (
                    <button
                        key={volume.name}
                        className="rounded-md bg-[#171720] shadow-lg ring-1 ring-white/30 ring-opacity-5 focus:outline-none w-fit px-4 py-3 text-white/80"
                        onClick={() => setDirectory(volume.path)}
                    >
                        {volume.name}
                    </button>
                );
            })}
        </div>
    );
}
