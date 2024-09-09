import { useFormik } from "formik"
import imgLogin from "../../assets/images/Tablet login-bro (1).png"
import * as Yup from 'yup';
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext";
import { cartContextObj } from "../../Context/CartContext";
export default function Login() {
  const {settoken}= useContext(AuthProvider)
    const navigate = useNavigate()
    const [isCliked, setisCliked] = useState(false)
 const {userCart} =  useContext(cartContextObj)

    function sendVales(values) {

        setisCliked(true)

        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .then((res) => {
                const token= res.data.token
                toast.success("Congratulation")
                localStorage.setItem("Token",token)
                settoken(token)
                userCart()
                
             
                setisCliked(false)
                setTimeout(() => {

                    navigate("/Home")

                }, 1000);


            })
            .catch((err) => {
                console.log(err.response.data.message);

                toast.error(err.response.data.message)
                setisCliked(false)



            })
    }

    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",

        },
        onSubmit: sendVales,
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters").required("Password is required"),



        })

    })




    return (
        <div className="container  mx-auto  md:mt-10 mb-14 ">
            <div className="grid md:grid-cols-2 grid-cols-1  items-center justify-center gap-2">

                <img src={imgLogin} className="w-full p-5 mt-5 md:p-5 md:mt-5 lg:p-0 lg:mt-5" alt="RegisterPhoto" />

                <div className="rounded-xl shadow-lg p-3 mx-3 md:mx-0 bg-white ">
                    <form onSubmit={registerFormik.handleSubmit} className="   rounded-xl   md:mt-9 lg:mt:0 gap-3 ">
                        <h3 className="text-3xl mb-5  text-yellow-950">Login Now :</h3>

                        <div className="relative z-0 w-full mb-5 group">
                            <input value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " required />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            {registerFormik.errors.email && registerFormik.touched.email ? <div className="p-4 mb-4 text-sm mt-1 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {registerFormik.errors.email}
                            </div> : undefined}


                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer" placeholder=" " required />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            {registerFormik.errors.password && registerFormik.touched.password ? <div className="p-4 mb-4 text-sm mt-1 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {registerFormik.errors.password}
                            </div> : undefined}


                        </div>


                        <button type="submit" className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                            {isCliked == false ? "Login" : <ColorRing
                                visible={true}
                                height="40"
                                width="50"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />}
                        </button>
                    </form>

                </div>




            </div>



        </div>
    )
}
