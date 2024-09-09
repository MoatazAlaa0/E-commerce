
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout';
import Notfound from './Components/Notfound/Notfound';
import AuthContext from './Context/AuthContext';
import Register from './Components/Register/Register';
import { Toaster } from 'react-hot-toast';
import Login from './Components/Login/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Products from './Components/Products/Products';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import CartContext from './Context/CartContext';
import Cart from './Components/Cart/Cart';
import Favorites from './Components/Favourite/Favourite';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';

const reactQuery = new QueryClient()



const router = createBrowserRouter([
  {
    path:"E-commerce" , element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'Home', element: <Home /> },
      { path: 'Register', element: <Register /> },
      { path: 'Login', element: <Login /> },
      { path: 'Products', element: <ProtectedRoute> <Products /></ProtectedRoute> },
      { path: 'ProductDetails/:id', element: <ProtectedRoute> <ProductsDetails /></ProtectedRoute> },
      { path: 'Categories', element: <ProtectedRoute> <Categories /></ProtectedRoute> },
      { path: 'Brands', element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: 'Fav', element: <ProtectedRoute> <Favorites /></ProtectedRoute> },
      { path: '/Payment', element: <ProtectedRoute> <Payment /></ProtectedRoute> },
      { path: '/allorders', element: <ProtectedRoute> <AllOrders /></ProtectedRoute> },
      { path: '*', element: <Notfound /> },
    ]
  }
])
function App() {
//  
  return (
    <>
      <AuthContext>
        <CartContext>


          <QueryClientProvider client={reactQuery} >

            <RouterProvider router={router}></RouterProvider>
            <Toaster />

          </QueryClientProvider>

        </CartContext>
    
      </AuthContext>



    </>
  )
}

export default App
