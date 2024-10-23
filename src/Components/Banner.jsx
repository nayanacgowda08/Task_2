// eslint-disable-next-line no-unused-vars
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../assets/images/ecom1.png"
import img2 from "../assets/images/ecom.png"
// import img3 from "../assets/images/ecom2.jpg"
import img4 from "../assets/images/ecom3.jpg"


const images = [
  img1,  
  img2,
  // img3,
  img4
];

const Banner = () => {
  const settings = {
    dots: true,          
    infinite: true,      
    speed: 500,          
    slidesToShow: 1,    
    slidesToScroll: 1,  
    autoplay: true,     
    autoplaySpeed: 3000, 
    arrows: true,       
  };

  return (
    <div style={{ margin: "15px auto", width: "90%" }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index}`} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
