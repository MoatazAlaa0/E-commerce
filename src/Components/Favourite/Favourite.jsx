import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartContextObj } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { addProductToCart } = useContext(cartContextObj)

    const [clickedProductId, setClickedProductId] = useState(null)

    useEffect(() => {

        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    if (favorites.length === 0) {
        return (
            <div className="container mx-auto py-20 mt-10">
                <h2 className="text-3xl font-medium text-yellow-950 text-center">Your Favorites List is Empty</h2>
            </div>
        );
    }

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

    function handleRemoveFavorite(id) {
        const updatedFavorites = favorites.filter(product => product._id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast('Product removed from favorites 💔');
    }


    return (
        <div className="container mx-auto py-20">
            <h2 className="mb-5 mx-2 md:mx-0 text-3xl font-medium text-yellow-950">Your Favorite Products : </h2>
            <div className="grid mx-5 md:mx-0 md:grid-cols-3 lg:grid-cols-5 gap-5  rounded-xl">
                {favorites.map((product) => (
                    <div key={product._id} className="shadow-md text-center  group rounded-xl hover:shadow-2xl transition-all">


                        <div className="overflow-hidden rounded-xl relative">
                            <img src={product.imageCover} className="w-full group-hover:scale-105 transition-all" alt={product.title} />
                            <div  onClick={() => handleRemoveFavorite(product._id)} className=' opacity-0 transition-all group-hover:opacity-[1] absolute top-1 right-1 flex items-center justify-center w-10 h-10 rounded-full bg-blue-950 cursor-pointer text-white'>
                                <i className='fa-solid fa-close'></i>
                            </div>
                            <div className="bg-yellow-500-950 flex items-center justify-center gap-3 absolute bottom-0 translate-y-full transition-all group-hover:-translate-y-3 left-1/2 -translate-x-1/2">
                                <Link to={`/ProductDetails/${product._id}`}>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-950 cursor-pointer text-white">
                                        <i className="fa-solid fa-eye"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-orange-300 py-2 text-yellow-950 rounded-xl font-medium">
                            <h3>{product.title.split(" ").slice(0, 3).join(" ")}</h3>
                            <p className="mt-1 mb-1">
                                <span className={product.priceAfterDiscount ? "line-through text-red-800" : ""}>£{product.price}</span>
                                <span className="ms-2">{product.priceAfterDiscount ? `£${product.priceAfterDiscount}` : ""}</span>
                            </p>
                            <div className="w-16 h-[2px] mx-auto bg-yellow-950 mb-2 group-hover:w-32 transition-all"></div>

                            <div className="flex items-center justify-between px-2">

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

                                <div className="flex items-center">
                                    <i className="fa-solid fa-star text-yellow-500"></i>
                                    <h3>{product.ratingsAverage}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}