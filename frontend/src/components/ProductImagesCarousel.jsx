import React, {useEffect, useState} from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductImagesCarousel = ({ data }) => {
    const [current, setCurrent] = useState(0);
    const length = data?.length;

    const prevSlide = () => {
        setCurrent(current === 0 ? length-1 : current-1);
    }
    
    const nextSlide = () => {
        setCurrent(current === length-1 ? 0 : current+1);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current === length-1 ? 0 : current+1);
        }, 3000);
        return () => clearInterval(interval);
    })

    if(!Array.isArray(data) || data.length <= 0) {
        return null;
    }

    // onMouseMove={(e) => magnifyImage(e)} onMouseLeave={() => normalImage()}

    return(
        <div className="md:pl-14 md:px-4 md:w-full w-full md:sticky md:top-[11vh]">
            <div className="relative mx-4">
                {
                    data?.map((image, index) => {
                        return(
                            <img key={index} className={index === current ? "select-none pb-4 w-full h-[450px] object-contain" : "hidden"} src={image.imageUrl} alt="img" />
                            )
                        })
                    }
            <IoIosArrowBack className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30 cursor-pointer hover:opacity-100" size={25} onClick={prevSlide} />
            <IoIosArrowForward className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 cursor-pointer hover:opacity-100" size={25} onClick={nextSlide} />
            </div>
            <div className="flex w-full flex-wrap gap-2">
                {
                    data?.map((image, index) => {
                        return(
                            <img key={index} onClick={() => setCurrent(index)} className={index === current ? "w-[70px] aspect-square object-contain border-[1px] border-gray-900 cursor-pointer" : "w-[70px] aspect-square object-contain border-[1px] cursor-pointer opacity-90"} src={image.imageUrl} alt="img" />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductImagesCarousel;