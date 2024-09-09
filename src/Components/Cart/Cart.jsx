import React, { useContext, useEffect, useState } from 'react'
import { cartContextObj } from '../../Context/CartContext'
import img from "../../assets/images/blog-img-1.jpeg"
import { BallTriangle, CirclesWithBar } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
export default function Cart() {
    const [loadingProducts, setLoadingProducts] = useState({});
    const [isClicked, setisCliked] = useState(false)
    const [isClickedClear, setisClickedClear] = useState(false)
    const { userCart, allProducts, numOfCartItems, totalCartPrice, removeItem, updateUsercart, clearCart } = useContext(cartContextObj)

    useEffect(() => {
        userCart()

    }, [])



    async function handleRemoveItem(id) {
        setLoadingProducts((prev) => ({ ...prev, [id]: true }));
        const resFalg = await removeItem(id);
        if (resFalg) {
            setLoadingProducts((prev) => ({ ...prev, [id]: false }));
        }
    }

    async function handleRemoveCart() {
        setisClickedClear(true)
        const resFalg = await clearCart()
        if (resFalg) {
            setisClickedClear(false)
        }



    }
    async function handleUpdateItem(id, count) {

        const resFalg = await updateUsercart(id, count)



    }

    if (allProducts?.length === 0) {
        return <div className="container mx-auto py-20 mt-10">
            <h2 className="text-3xl font-medium text-yellow-950 text-center">The Cart Is Empty </h2>
        </div>
    }



    return (
        <>
            {allProducts == null ? (
                <div className='flex items-center justify-center h-screen bg-orange-50 '><BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="orange"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /> </div>
            ) : <div className='container md:mx-auto bg-blue-950  mt-24 mb-5 p-3 '>
                <div className='HeadCart flex bg-orange-300 items-center p-3 justify-between rounded-lg ' >
                    <h2 className='uppercase text-sm md:text-lg font-medium text-blue-950  '>Your Cart</h2>
                    <h2 className='uppercase text-sm md:text-lg font-medium text-blue-950 '>Cart Items : {numOfCartItems}</h2>
                    <button onClick={handleRemoveCart} className='uppercase text-sm md:text-lg font-medium text-orange-300 p-2 bg-blue-950 hover:bg-blue-950 hover:text-orange-300 transition-all  rounded-full'>

                        {isClickedClear ? <CirclesWithBar
                            height="50"
                            width="50"
                            color="#fdba74 "
                            outerCircleColor="#fdba74 "
                            innerCircleColor="#fdba74 "
                            barColor="#fdba74 "
                            ariaLabel="circles-with-bar-loading"
                            visible={true}
                        /> : "Clear Cart"}

                    </button>

                </div>
                <div className='grid grid-cols-1'>
                    <div className='flex items-center mt-2 justify-between  bg-orange-300 p-3 rounded-lg'>
                        <div className=''>
                            <h2 className='text-sm md:text-lg font-medium text-blue-950 '>Products</h2>
                        </div>
                        <div className=''>
                            <ul className='flex items-center gap-5'>
                                <li className='text-sm md:text-lg font-medium text-blue-950 '>Quantity</li>
                                <li className='text-sm md:text-lg font-medium text-blue-950 '>Price</li>
                                <li className='text-sm md:text-lg font-medium text-blue-950 '>Remove</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='grid grid-cols-1 mt-5 '>


                    {allProducts?.map((product) => (
                        <div key={product._id}>

                            <div className='flex items-center justify-between  p-3  border-b border-dotted border-orange-300  ' >
                                <div className=' me-3 md:me-0'>
                                    <div className='overflow-hidden rounded-xl relative   group transition-all'>
                                        <img src={product.product.imageCover} className='w-44 md:w-44   mb-2 me-1 rounded-xl  group-hover:scale-105  transition-all' alt={product.product.title} />

                                    </div>
                                    <div className='flex items-center justify-between mt-1 gap-3 '>
                                        <div className=''>
                                            <h3 className='text-sm md:text-lg  me-7 md:me-0 text-orange-300 font-medium'>{product.product.title?.split(" ").splice(0, 2).join(" ")}</h3>
                                        </div>
                                        <div className='flex  items-center'>
                                            <span className='text-sm md:text-lg  me-1 text-orange-300 font-medium'>{product.product.ratingsAverage}</span>
                                            <i className='fa-solid fa-star text-yellow-500'></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-start'>
                                    <ul className='flex items-center gap-5'>
                                        <li className='text-sm md:text-lg font-medium text-orange-300 flex items-center gap-3'>
                                            <button  disabled={product.count == 1} onClick={() => handleUpdateItem(product.product._id, product.count - 1)} className='text-sm md:text-lg font-medium bg-orange-300 text-blue-950 cursor-pointer w-8 md:h-10 md:w-10 h-8 rounded-full flex items-center justify-center'>

                                                <i className='fa-solid fa-minus'></i>

                                            </button >
                                            <span className='text-sm md:text-lg font-medium text-orange-300'>{product.count}</span>
                                            <button  onClick={() => handleUpdateItem(product.product._id, product.count + 1)} className='text-sm md:text-lg font-medium bg-orange-300 text-blue-950 cursor-pointer w-8 md:h-10 md:w-10 h-8 rounded-full flex items-center justify-center'>

                                                <i className='fa-solid fa-plus'></i>

                                            </button >
                                        </li>
                                        <li className='text-sm md:text-lg font-medium text-orange-300'>£{product.price}</li>
                                   
                                         <li onClick={() => handleRemoveItem(product.product._id)} className='text-sm md:text-lg font-medium bg-orange-300 text-blue-950 cursor-pointer w-8 md:h-10 md:w-10 h-8 rounded-full flex items-center justify-center'>
                                                {loadingProducts[product.product._id] ? (
                                                    <CirclesWithBar
                                                        height="35"
                                                        width="35"
                                                        color="#172554"
                                                        outerCircleColor="#172554"
                                                        innerCircleColor="#172554"
                                                        barColor="#172554"
                                                        ariaLabel="circles-with-bar-loading"
                                                        visible={true}
                                                    />
                                                ) : (
                                                    <i className='fa-solid fa-close'></i>
                                                )}
                                            </li>
                                    </ul>
                                </div>
                            </div>
                        </div>



                    ))}

                </div>
                <div className='flex items-center justify-between'>
                    <Link to={"/Payment"}>

                        <div className=' cursor-pointer text-center bg-orange-300 p-3 rounded-lg mt-3 ' >
                            <h2 className='uppercase md:text-lg text-sm font-medium text-blue-950  '>Check out</h2>

                        </div>

                    </Link>
                    <div className=' text-center bg-orange-300 p-3 rounded-lg mt-3 ' >
                        <h2 className='uppercase md:text-lg text-sm font-medium text-blue-950  '>Total cart price : £{totalCartPrice}</h2>

                    </div>

                </div>
            </div>}



        </>
    )
}
