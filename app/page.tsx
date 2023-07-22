"use client";
import Volumes from "./Volumes";
import Folders from "./Folders";
import { useState } from "react";

export default function Home() {
    const [currentFolderPath, setCurrentFolderPath] = useState<string>("");
    return (
        <div className="bg-[#08090d] h-screen w-screen p-6">
            <div className="xl:max-w-4xl mx-auto">
                <Volumes setDirectory={setCurrentFolderPath} />
                <Folders
                    path={currentFolderPath}
                    setPath={setCurrentFolderPath}
                />
            </div>
        </div>
    );
}
