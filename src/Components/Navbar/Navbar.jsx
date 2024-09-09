import { useContext, useState } from "react"
import imgLogo from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom"
import { AuthProvider } from "../../Context/AuthContext"


export default function Navbar() {
    const navigate = useNavigate()
    const { token, settoken }= useContext(AuthProvider)
    const [menuOpen, setmenuOpen] = useState(false)

    function toggleMenu() {

        setmenuOpen(!menuOpen)
    }
    function handleSignOut() {
        settoken(null)
        localStorage.removeItem('Token')
        navigate("/Login")

    }

    return (
        <>
            <nav className=" border-gray-200 dark:bg-gray-900 bg-orange-300 fixed top-0 w-full z-30">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <Link to={"Home"}  >

                        <img src={imgLogo} className="h-8" alt="Freshcart-logo" />

                    </Link>


                    <div className="flex md:order-2 items-center ">
                        {token ? <>

                            <ul className=" hidden  sm:flex items-center gap-3 me-3 ">
                                <li className= " list-none  hover:text-blue-950 transition-all"><Link to={"Fav"}><i className="  fa-solid fa-heart text-xl" ></i></Link></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://www.facebook.com" target="_Blank"><i className="  fa-brands fa-facebook text-xl" ></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://www.instagram.com" target="_Blank"><i className=" fa-brands fa-instagram text-xl" ></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://x.com" target="_Blank"><i className="fa-brands fa-x-twitter text-xl" ></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://www.tiktok.com" target="_Blank" ><i className="fa-brands fa-tiktok text-xl" ></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://www.youtube.com" target="_Blank" ><i className="fa-brands fa-youtube text-xl " ></i></a></li>

                            </ul>


                        </> : ""}
                        <ul className="flex items-center md:gap-2 font-medium gap-0  ">

                            {token ? <>

                                <li onClick={handleSignOut}><span className="  cursor-pointer block py-1 px-1 md:px-2 md:py-3 text-gray-900 rounded md:hover:bg-transparent hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> Logout</span></li>

                            </> : <>

                                <li><NavLink to={"Register"} className="block py-1 px-1  text-gray-900 rounded md:hover:bg-transparent hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Register</NavLink> </li>
                                <li><NavLink to={"Login"} className="block py-1 px-1  text-gray-900 rounded md:hover:bg-transparent hover:text-yellow-700 md:p-0 md:dark:hover:text-yellow-50 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Login</NavLink> </li>


                            </>}

                        </ul>
                        {token ? <>

                            <button onClick={toggleMenu} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-yellow-950 rounded-lg lg:hidden hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-yellow-950 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>

                        </> : ""}
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">

                        <ul  className= " hidden lg:flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-orange-300 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {token ? <>

                                
                                <li>
                                    <NavLink  to="Home"  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-700 md:hover:bg-transparent md:bg-transparent hover:text-yellow-700  md:p-0 md:dark:text-yellow-50" aria-current="page">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="Products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-700 md:hover:bg-transparent hover:text-yellow-700 md:p-0 dark:text-white md:dark:hover:text-yellow-50 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
                                </li>
                             
                                <li>
                                    <NavLink to="Categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-700 md:hover:bg-transparent hover:text-yellow-700 md:p-0 dark:text-white md:dark:hover:text-yellow-50 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to="Brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-700 md:hover:bg-transparent hover:text-yellow-700 md:p-0 dark:text-white md:dark:hover:text-yellow-50 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
                                </li>


                            </> : ""}
                        </ul>
                    </div>
                </div>


                {menuOpen ? (
                    <>

                        <ul onClick={()=> setmenuOpen(false) }  className="lg:hidden   flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">

                            <li>
                                <NavLink  to={"Home"} className="block py-2 px-1 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-yellow-700 lg:p-0  lg:dark:hover:text-yellow-500  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"Products"} className="block py-2 px-1 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-yellow-700 lg:p-0 dark:text-white lg:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
                            </li>
                           
                            <li>
                                <NavLink to={"Categories"} className="block py-2 px-1 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-yellow-700 lg:p-0 dark:text-white lg:dark:hover:text-yellow-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
                            </li>
                            <li>
                                <NavLink to={"Brands"} className="block py-2 px-1 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-yellow-700 lg:p-0 dark:text-white lg:dark:hover:text-yellow-50 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
                            </li>
                            <ul className=" sm:hidden flex items-center gap-3 me-3 px-1 mt-3">
                            <li className= "  hover:text-blue-950 transition-all"><Link to={"Fav"} ><i className="  fa-solid fa-heart text-xl" ></i></Link></li>                                <li className="hover:text-blue-950 transition-all"><a href="https://www.facebook.com" target="_Blank"><i className="fa-brands fa-facebook text-xl"></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://www.instagram.com" target="_Blank"><i className="fa-brands fa-instagram text-xl"></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://x.com" target="_Blank"><i className="fa-brands fa-x-twitter text-xl"></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://www.tiktok.com" target="_Blank"><i className="fa-brands fa-tiktok text-xl"></i></a></li>
                                <li className="hover:text-blue-950 transition-all"><a href="https://www.youtube.com" target="_Blank"><i className="fa-brands fa-youtube text-xl "></i></a></li>

                            </ul>
                        </ul>

                    </>
                ) : null}


            </nav>

        </>
    )
}
