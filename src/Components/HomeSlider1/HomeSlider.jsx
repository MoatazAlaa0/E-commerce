import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import useAllCategories from "../../CustomHooks/useAllCategories";
export default function HomeSlider() { 
  const {data ,error,isLoading} = useAllCategories()
    // function getSubCategories() {
    //     return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    // }

    // const { data, error, isLoading } = useQuery({
    //     queryKey: ["subCategories"],
    //     queryFn: getSubCategories,
    // })


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


    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 500,
        cssEase: "linear",
        arrows:false,
      };

    const res = data?.data.data
    return (
        <Slider {...settings}>


            {res.map((cat) => ( 
                <div key={cat._id} className=" cursor-grab">
                    <Link to={"/Categories"}  >
                    <img src={cat.image} alt="image" className="w-full h-96 object-fill"></img>
                    
                    </Link>

                </div>
            ))}




        </Slider>
    );
}
