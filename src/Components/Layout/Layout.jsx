import { Link, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useContext, useEffect } from "react";
import AuthContext, { AuthProvider } from "../../Context/AuthContext";
import { cartContextObj } from "../../Context/CartContext";


export default function Layout() {
    const { numOfCartItems,userCart } = useContext(cartContextObj)
    const { token } = useContext(AuthProvider)
    useEffect(() => {
        userCart()
    
  
    }, )
    
    return (

        <>
            <Navbar />
            <Outlet />
            <Footer />

            {token ? (
                <Link to={"Cart"}>

                    <div className="bg-yellow-100 cursor-pointer fixed bottom-3 right-3 text-orange-600 w-[60px] h-[60px] rounded-full flex items-center justify-center ">
                        <div className='relative'>
                            <i className="text-3xl fa-solid fa-cart-shopping fa-flip-horizontal"></i>
                            <div className=' w-[20px] h-[20px] rounded-full bg-blue-950 text-yellow-100 absolute -top-1 -right-1 flex items-center justify-center'>
                                {numOfCartItems}

                            </div>
                        </div>

                    </div>

                </Link>
            ) : undefined}

        </>

    )
}
