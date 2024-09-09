import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { BallTriangle, Bars } from "react-loader-spinner"
import { Link, Navigate, useParams } from "react-router-dom"

import IamgeSlider from "../HomeSlider2/Imageslider"
import HomeSlider from "../HomeSlider1/HomeSlider"
import { useContext, useState } from "react"
import { cartContextObj } from "../../Context/CartContext"
import toast from "react-hot-toast"


export default function ProductsDetails() {

  const { addProductToCart } = useContext(cartContextObj)
  const [clickedProductId, setClickedProductId] = useState(null)

  const { id } = useParams()
  console.log(id);


  async function handleAddProducts(id) {

    setClickedProductId(id)

    const resFalg = await addProductToCart(id)
    if (resFalg) {

      toast.success('Product added to cart Successfully👍')
    }
    else {

      toast.error('Failed to add product to cart Try Agian😢')
    }
    setClickedProductId(null)

  }


  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: getProductDetails
  })



  if (error) {
    return <Navigate to="/NotFound" />

  }
  if (isLoading) {
    return <div className='flex items-center justify-center h-screen bg-orange-50 '><BallTriangle
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
  const res = data?.data.data


  return (
    <div className="container mx-auto pt-28 pb-20  ">
      <div className="relative">


        <div className="grid grid-cols-1 md:grid-cols-2 mx-5 md:mx-0 gap-3 md:gap-0  ">
          <div className=" " key={res._id} >
            <img src={res.imageCover} className="w-[full] mb-2 shadow-md rounded-xl " alt={res.title} />
            <IamgeSlider id={id} />
          </div>

          <div className="bg-orange-300 shadow-md rounded-xl p-5  text-yellow-950   ">
            <h3 className="text-xl font-medium"><span className="text-black font-semibold ">Title :</span> {res.title}</h3>
            <p className="text-xl font-medium mt-3"><span className="text-black font-semibold ">Description :</span> {res.description}</p>

            <p className="text-xl font-medium mt-3 mb-5" ><span className="text-black font-semibold ">Price : </span>£{res.price}</p>
            <hr className="mb-3" />

            <h3 className=" md:text-xl text-lg mb-10 text-black font-semibold uppercase">There are Another categoriues you can watch it :</h3>
            <HomeSlider />
          </div>
          <button onClick={() => handleAddProducts(id)} type="submit" className="  inline-flex items-center  justify-center px-5 py-2 mt-3 font-semibold text-white transition-all duration-200 w-full bg-blue-950 rounded-md hover:bg-blue-950 focus:bg-blue-950 uppercase">
            {clickedProductId === res._id ?
              <Bars
                height="30"
                width="30"
                color="#fff "
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : (
                "ADD TO CART"
              )}
          </button>




        </div>
        <Link to={"/Products"}>
          <div className="absolute cursor-pointer  md:-right-6 right-4 hover:bg-blue-950 hover:text-orange-300 transition-all -top-11 w-10 h-10 bg-orange-300 text-white rounded-full flex items-center justify-center">
            <i className="fa-solid fa-close text-2xl "></i>
          </div>
        </Link>

      </div>

    </div>
  )

}
