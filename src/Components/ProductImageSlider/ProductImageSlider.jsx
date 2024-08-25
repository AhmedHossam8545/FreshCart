import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export  function ProductImageSlider({images}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
      };
  return (
    <Slider {...settings} >
        {images?.map((img,index) => {
            return <img src={img} className="  w-full mx-auto rounded-md object-contain object-center  "  key={index} alt="" />
        })}
    </Slider>
  )
}
