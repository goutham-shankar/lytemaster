import React, { useState, useEffect, useRef } from "react";

export default function VideoCarousel({ videos }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetAutoplay = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % videos.length);
        }, 5000);
    };

    useEffect(() => {
        resetAutoplay();
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, [currentIndex]);

    return (
        <div className="w-full h-[50vh] hidden lg:block">
            <div className="relative overflow-hidden h-full">
                <video
                    key={currentIndex}
                    src={videos[currentIndex]}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                />
                {/* Overlaid Indicators */}
                <div
                    className="z-10 absolute top-0 left-0 w-full h-full py-4 flex flex-col justify-end items-center"
                    onMouseEnter={() =>
                        timeoutRef.current && clearTimeout(timeoutRef.current)
                    }
                    onMouseLeave={resetAutoplay}
                >
                    <div className=" flex space-x-2 bg-black/40 px-2 py-[0.4rem] rounded-full">
                        {videos.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-[0.4rem] rounded-full cursor-pointer transition-all hover:w-8 duration-500 ease-in-out ${
                                    idx === currentIndex
                                        ? "w-8 bg-white"
                                        : "w-[0.4rem] bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
