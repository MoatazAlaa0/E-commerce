import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContextObj } from '../../Context/CartContext'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import imgPay from "../../assets/images/Plain credit card-amico.png"

export default function Payment() {

    const [isCliked, setisCliked] = useState(false)
    const { CartId ,clearCart,ClearUi} = useContext(cartContextObj)



function orderPaing(values){
    if(isCliked){
        offlineCash(values)
    }
    else{
        payOnline(values)
    }
}



    async function offlineCash(values) {
        setisCliked(true)
        const sendAddress = {
            shippingAddress: values
        }

        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`, sendAddress, {
            headers: {
                token: localStorage.getItem("Token")
            }
        })
        // setisCliked(true)
            .then((response) => {
                console.log(response.data)
                toast("Order has been placed successfully👏")
                setisCliked(false)
                
               
            })
            .catch((err) => {
                console.log(err);
                toast("You Already Paid It  😊")

                
                setisCliked(false)

            })
    }
    async function payOnline(values) {
        // setisCliked(true)
        const sendAddress = {
            shippingAddress: values
        }

        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`, sendAddress, {
            headers: {
                token: localStorage.getItem("Token")
            },
            params:{
                url:"http://localhost:5173"
            }
        })
            .then((response) => {
                console.log(response.data)
                window.open(response.data.session.url,"_self")
                clearCart()
                setisCliked(false)
            })
            .catch((err) => {
                console.log(err);

            
                setisCliked(false)

            })
    }

    const PaymentFormif = useFormik({
        initialValues: {

            "details": "",
            "phone": "",
            "city": ""

        },
        onSubmit: orderPaing,

        validationSchema: Yup.object().shape({
            "details": Yup.string().required(),
            "phone": Yup.string().required(),
            "city": Yup.string().required(),
        })

    })





    return (
        <div className="container  mx-auto  md:mt-10 mb-14 ">
            <div className="grid md:grid-cols-2 grid-cols-1  items-center justify-center gap-2">

                <img src={imgPay} className="w-full p-5 mt-5 md:p-5 md:mt-5 lg:p-0 lg:mt-5" alt="RegisterPhoto" />

                <div className="rounded-xl shadow-lg p-3 mx-3 md:mx-0 bg-white ">
                    <form onSubmit={PaymentFormif.handleSubmit} className="   rounded-xl   md:mt-9 lg:mt:0 gap-3 ">
                        <h3 className="text-3xl mb-5  text-yellow-950">Payment Now :</h3>

                        <div className="relative z-0 w-full mb-5 group">
                            <input value={PaymentFormif.values.details} onChange={PaymentFormif.handleChange} onBlur={PaymentFormif.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " required />
                            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
                            {PaymentFormif.errors.details && PaymentFormif.touched.details ? <div className="p-4 mb-4 text-sm mt-1 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {PaymentFormif.errors.details}
                            </div> : undefined}


                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input value={PaymentFormif.values.phone} onChange={PaymentFormif.handleChange} onBlur={PaymentFormif.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " required />
                            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                            {PaymentFormif.errors.phone && PaymentFormif.touched.phone ? <div className="p-4 mb-4 text-sm mt-1 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {PaymentFormif.errors.phone}
                            </div> : undefined}


                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input value={PaymentFormif.values.city} onChange={PaymentFormif.handleChange} onBlur={PaymentFormif.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " required />
                            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                            {PaymentFormif.errors.city && PaymentFormif.touched.city ? <div className="p-4 mb-4 text-sm mt-1 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {PaymentFormif.errors.city}
                            </div> : undefined}


                        </div>

                        <div className='flex items-center justify-between '>

                            <button type="submit"disabled={ (PaymentFormif.values.city && PaymentFormif.values.phone && PaymentFormif.values.details )==""} onClick={()=> setisCliked (true)} className="me-5 text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                                {isCliked ? <ColorRing
                                    visible={true}
                                    height="40"
                                    width="50"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                /> : "Payment By Cash"}
                               
                            </button>
                            
                            <button type="submit" onClick={()=> setisCliked(false)} className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                                Payment By visa
                            </button>
                        </div>
                    </form>

                </div>




            </div>



        </div>
    )
}
