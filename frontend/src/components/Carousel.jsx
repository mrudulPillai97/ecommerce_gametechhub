import React, { useState, useRef, useEffect } from "react";

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const length = items?.length;

    const handleNext = () => {
        const nextIndex = (currentIndex === length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        carouselRef.current.scroll({
        left: nextIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth',
        });
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex === 0) ? length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        carouselRef.current.scroll({
        left: prevIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth',
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    })

    return(
        <div className="relative overflow-x-hidden w-full">
            <div
                ref={carouselRef}
                className="flex transition duration-500 ease-in-out"
            >
                {items.map((item, index) => (
                <div
                    key={index}
                    className="w-full flex-shrink-0"
                >
                    {/* Your carousel item content goes here */}
                    <img src={item} alt={"img"} className="w-full h-full object-cover" />
                </div>
                ))}
            </div>
            {/* <button onClick={handlePrev} className="absolute left-0 top-0 p-2 bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-white rounded-full">
                <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6l6-6" />
                </svg>
            </button>
            <button onClick={handleNext} className="absolute right-0 top-0 p-2 bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-white rounded-full">
                <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button> */}
        </div>
    )
}

export default Carousel;