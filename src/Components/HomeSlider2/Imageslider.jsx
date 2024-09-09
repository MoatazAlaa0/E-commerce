
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
function ImageSlider({ id }) {

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['ImageProduct', id],
    queryFn: getProductDetails,
  });


  if (error) {
    return <Navigate to="/NotFound" />

  }
  if (isLoading) {
    return <div className='flex items-center justify-center h-auto bg-orange-50 '><BallTriangle
      height={100}
      width={100}
      radius={5}
      color="orange"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    /> </div>
  }
  
  
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4 ,
    slidesToScroll: 2,
    arrows: false
  };


  const res = data?.data.data

  return (
    <Slider {...settings}>

      {res.images.map( ( img ) => (
        
        <img src={img}  key={id} className="w-[100px] cursor-grab px-2 shadow-md rounded-xl" alt="SliderIamge" />
      ))}



    </Slider>
  );
}

export default ImageSlider;
