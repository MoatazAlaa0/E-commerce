import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BallTriangle, Bars, RotatingLines } from 'react-loader-spinner'
import { Link, Navigate } from 'react-router-dom'
import { cartContextObj } from '../../Context/CartContext'

export default function Products() {
    const [searchQuery, setSearchQuery] = useState("")
    const { addProductToCart } = useContext(cartContextObj)
    const [clickedProductId, setClickedProductId] = useState(null)
    const [favorites, setFavorites] = useState(() => {

        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });


    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


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

    function toggleClass(event, product) {



        const isFavorite = favorites.some(fav => fav._id === product._id);

        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav._id !== product._id));
            toast("Removed from favorites 💔");

        } else {
            setFavorites([...favorites, product]);
            toast("Add to favorites ❤️");
            //
        }





    }



    function allProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }


    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: allProducts
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
    const filteredProducts = res.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className='container mx-auto py-20'>
                <h2 className='mb-5 mx-2 md:mx-0 text-3xl font-medium text-yellow-950'>Shop Popular Products :</h2>
                <div className='mb-5 mx-2 md:mx-0'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="p-2 border-0 border-gray-300 rounded w-full  border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-950 focus:outline-none focus:ring-0 focus:border-blue-950 peer"

                    />
                </div>
                <div className='grid mx-5 md:mx-0 md:grid-cols-3 lg:grid-cols-5 gap-5 rounded-xl'>

                    {filteredProducts.map((product) => (
                        <div key={product._id} className=' shadow-md text-center group  rounded-xl hover:shadow-2xl  transition-all '>
                            <div className=' overflow-hidden rounded-xl relative '>
                                <img src={product.imageCover} className='w-full  group-hover:scale-105  transition-all  ' alt={product.title} />
                                <div className=' bg-yellow-500-950 flex items-center justify-center gap-3 absolute bottom-0  translate-y-full transition-all group-hover:-translate-y-3  left-1/2 -translate-x-1/2'>
                                
                                    <div onClick={(e) => toggleClass(e, product)} className={`flex items-center justify-center w-10 h-10 rounded-full bg-blue-950 cursor-pointer heart  ${favorites.some(fav => fav._id === product._id) ?'text-orange-300' : 'text-white'}`}>
                                        <i className="fa-solid fa-heart"></i>
                                    </div>


                                    <Link to={`/ProductDetails/${product._id}`}>

                                        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-950 cursor-pointer text-white'>

                                            <i className="fa-solid fa-eye"></i>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className='bg-orange-300 py-2 text-yellow-950 rounded-xl font-medium '   >
                                <h3 className=''>{product.title.split(" ").slice(0, 3).join(" ")}</h3>
                                <p className='mt-1 mb-1'>

                                    <span className={product.priceAfterDiscount ? "line-through text-red-800" : ""}>£{product.price}</span>
                                    <span className='ms-2 '>{`${product.priceAfterDiscount ? `£ ${product.priceAfterDiscount} ` : ""} `}</span>

                                </p>

                                <div className='w-16 h-[2px]  mx-auto bg-yellow-950 mb-2 group-hover:w-32 transition-all'></div>

                                <div className='flex items-center justify-between  px-2 '>
                                    {clickedProductId === product._id ? <Bars
                                        height="30"
                                        width="30"
                                        color="#172554 "
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    /> : (

                                        <div onClick={() => handleAddProducts(product._id)} className='flex items-center cursor-pointer'>
                                            <h3 className='bg-orange-300 text-yellow-950  uppercase text-xs font-bold'>Add To Cart</h3>
                                            <i className="fa-solid fa-angles-right ms-1 group-hover:translate-x-1 transition-all"></i>

                                        </div>
                                    )}

                                    <div className='flex items-center'>
                                        <i className='fa-solid fa-star text-yellow-500'></i>
                                        <h3>{product.ratingsAverage}</h3>
                                    </div>
                                </div>
                            </div>

                        </div>


                    ))}
                </div>



            </div>


        </>
    )
}
