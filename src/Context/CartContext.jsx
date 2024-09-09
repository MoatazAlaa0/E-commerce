import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast'

export const cartContextObj = createContext()

export default function CartContext({ children }) {
    const [allProducts, setallProducts] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [CartId, setCartId] = useState(null)
    const [cartOwner, setcartOwner] = useState(null)


    async function addProductToCart(id) {

        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { "productId": id }, {
            headers: {
                token: localStorage.getItem("Token")
            }
        }).then((res) => {
            setCartId(res.data.cartId)
            setcartOwner(res.data.data.cartOwner)
          
            
            userCart()
            return true
        })
            .catch((err) => {
                console.log(err)
                return false
            })
    }
    async function removeItem(id) {

        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token: localStorage.getItem("Token")
            }
        }).then((res) => {
            setallProducts(res.data.data.products)
            setnumOfCartItems(res.data.numOfCartItems)
            settotalCartPrice(res.data.data.totalCartPrice)

            return true
        })
            .catch((err) => {
                console.log(err)
                return false
            })
    }

    async function userCart() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("Token")
            }
        })
            .then((res) => {
                setallProducts(res.data.data.products)
                setnumOfCartItems(res.data.numOfCartItems)
                settotalCartPrice(res.data.data.totalCartPrice)

            })
            .catch((err) => {
                console.log(err)

            })
            

    }

    function updateUsercart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { "count": count }, {
            headers: {
                token: localStorage.getItem("Token")
            }
        })
            .then((res) => {
                setallProducts(res.data.data.products)
                setnumOfCartItems(res.data.numOfCartItems)
                settotalCartPrice(res.data.data.totalCartPrice)
                return true

            })
            .catch((err) => {
                console.log(err)
                return false
            })
    }

    function clearCart() {
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: localStorage.getItem("Token")
            }
        })
            .then((res) => {
                console.log(res);

                setallProducts(null)
                setnumOfCartItems(0)
                settotalCartPrice(0)
                return true

            })
    }
    function ClearUi() {
        setallProducts(null)
        setnumOfCartItems(0)
        settotalCartPrice(0)
        setCartId(null)
    }


    return (
        <cartContextObj.Provider value={{
            addProductToCart,
            userCart,
            allProducts,
            numOfCartItems,
            totalCartPrice,
            removeItem,
            updateUsercart,
            clearCart,
            ClearUi,
            CartId,
            cartOwner

        }}  >


            {children}
        </cartContextObj.Provider>
    )
}
