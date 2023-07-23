/* eslint-disable @next/next/no-img-element */
"use client";
import Volumes from "./Volumes";
import Folders from "./Folders";
import { useState } from "react";
import Files from "./Files";
import "react-tooltip/dist/react-tooltip.css";
import useStack from "./useStack";

export default function Home() {
    const [currentFolderPath, setCurrentFolderPath] = useState<string>(".");
    const {
        peek: backNavigatorPeek,
        pop: backNavigatorPop,
        push: backNavigatorPush,
        isEmpty: backNavigatorIsEmpty,
    } = useStack<string>();

    const {
        peek: forwardNavigatorPeek,
        pop: forwardNavigatorPop,
        push: forwardNavigatorPush,
        isEmpty: forwardNavigatorIsEmpty,
        clear: forwardNavigatorClear,
    } = useStack<string>();

    const handleSetCurrentFolderPath = (path: string) => {
        backNavigatorPush(currentFolderPath);
        setCurrentFolderPath(path);
        forwardNavigatorClear();
    };

    const handleBacknavigation = () => {
        const path = backNavigatorPeek();
        backNavigatorPop();
        if (path) {
            forwardNavigatorPush(currentFolderPath);
            setCurrentFolderPath(path);
        }
    };

    const handleForwardNavigation = () => {
        const path = forwardNavigatorPeek();
        forwardNavigatorPop();
        if (path) {
            backNavigatorPush(currentFolderPath);
            setCurrentFolderPath(path);
        }
    };

    return (
        <div className="bg-[#08090d] h-screen w-screen p-6 overflow-x-hidden">
            <div className="xl:max-w-4xl mx-auto">
                <div className="w-full flex items-center justify-between">
                    <div className="space-x-1">
                        <button
                            className={`${
                                backNavigatorIsEmpty ? "opacity-25" : ""
                            } p-3 hover:bg-white/10 transition-all rounded-full aspect-square`}
                            disabled={backNavigatorIsEmpty}
                            onClick={handleBacknavigation}
                        >
                            <img
                                src="/icons/arrow.svg"
                                alt="arrow"
                                className="rotate-180"
                            />
                        </button>

                        <button
                            className={`${
                                forwardNavigatorIsEmpty ? "opacity-25" : ""
                            } p-3 hover:bg-white/10 transition-all rounded-full aspect-square`}
                            disabled={forwardNavigatorIsEmpty}
                            onClick={handleForwardNavigation}
                        >
                            <img src="/icons/arrow.svg" alt="arrow" />
                        </button>
                    </div>
                    <Volumes setDirectory={handleSetCurrentFolderPath} />
                </div>
                <Folders
                    path={currentFolderPath}
                    setPath={handleSetCurrentFolderPath}
                />
                <Files
                    path={currentFolderPath}
                    setPath={handleSetCurrentFolderPath}
                />
            </div>
        </div>
    );
}
