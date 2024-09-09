import React, { useContext, useEffect, useState } from 'react'
import { cartContextObj } from '../../Context/CartContext'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { BallTriangle } from 'react-loader-spinner';

export default function AllOrders() {
    const [allOrders, setallOrders] = useState(null)



    const token = localStorage.getItem("Token");
    const { id } = jwtDecode(token);
    console.log(id);



    useEffect(() => {
        getAllOrders()

    }, [])


    async function getAllOrders() {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            .then(response => {
                console.log(response.data);
                setallOrders(response.data)

            })
            // .cartItems[0].product
            .catch(error => {
                console.error(error);


            })
    }

    if (allOrders == null) {
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

    const cartItems = allOrders.flatMap(order => order.cartItems);


    return (
        <div className='container mx-auto my-24'>
            <h2 className='mb-5 mx-2 md:mx-0 text-3xl font-medium text-yellow-950'>These are All Orders :</h2>

            <div className='grid mx-5 md:mx-0 md:grid-cols-3 lg:grid-cols-5 gap-5 rounded-xl'>
                {cartItems.map((item) => (
                    <div key={item._id} className=' shadow-md text-center group  rounded-xl hover:shadow-2xl  transition-all '>
                        <div className=' overflow-hidden rounded-xl relative '>
                            <img src={item.product.imageCover} className='w-full  group-hover:scale-105  transition-all  ' alt={item.product.title} />

                        </div>
                        <div className='bg-orange-300 py-2 text-yellow-950 rounded-xl font-medium '   >
                            <h3 className=''>{item.product.title.split(" ").slice(0, 3).join(" ")}</h3>


                            <div className='w-16 h-[2px] mt-3  mx-auto bg-yellow-950 mb-2 group-hover:w-32 transition-all'></div>

                            <div className='flex items-center justify-between  px-2 '>
                                <p className='mt-1 mb-1'>

                                    <span className={item.priceAfterDiscount ? "line-through text-red-800" : ""}>£{item.price}</span>
                                    <span className='ms-2 '>{`${item.priceAfterDiscount ? `£ ${item.priceAfterDiscount} ` : ""} `}</span>

                                </p>

                                <div className='flex items-center'>
                                    <i className='fa-solid fa-star text-yellow-500 me-1'></i>
                                    <h3>{item.product.ratingsAverage}</h3>
                                </div>
                            </div>
                        </div>

                    </div>

                ))}
            </div>
        </div>
    );
}
