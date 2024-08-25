import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Register } from './Components/Register/Register'
import { Login } from './Components/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './Components/Layout/Layout'
import { Home } from './Components/Home/Home'
import { Cart } from './Components/Cart/Cart'
import { Products } from './Components/Products/Products'
import { Categories } from './Components/Categories/Categories'
import { Brands } from './Components/Brands/Brands'
import { NotFound } from './Components/NotFound/NotFound'
import { AuthContextProvider } from './Contexts/AuthContext'
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute'
import { ProtectedAuthRoute } from './Components/ProtectedAuthRoute/ProtectedAuthRoute'
import { ProductDetails } from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import {ShippingAddress} from './Components/ShippingAddress/ShippingAddress'
import { Orders } from './Components/Orders/Orders'
import { Offline } from 'react-detect-offline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ProductsOfCategory } from './Components/ProductsOfCategory/ProductsOfCategory'
import { Wishlist } from './Components/Wishlist/Wishlist'
import { ForgotPasswordEmail } from './Components/ForgotPasswordEmail/ForgotPasswordEmail'
import ForgotPasswordCode from './Components/ForgotPasswordCode/ForgotPasswordCode'
import { ForgotPasswordNewPass } from './Components/ForgotPasswordNewPass/ForgotPasswordNewPass'

function App() {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path : "/FreshCart/", element : <Layout/> ,children : [
      {index : true , element : <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path : "login" , element : <ProtectedAuthRoute><Login/></ProtectedAuthRoute>},
      {path : "register" , element :<ProtectedAuthRoute><Register/></ProtectedAuthRoute>},
      {path : "cart" , element : <ProtectedRoute><Cart/></ProtectedRoute>},
      {path : "wishlist" , element : <ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path : "products" , element : <ProtectedRoute><Products/></ProtectedRoute>},
      {path : "categories" , element : <ProtectedRoute><Categories/></ProtectedRoute>},
      {path : "category/:categoryId" , element : <ProtectedRoute><ProductsOfCategory/></ProtectedRoute>},
      {path : "brands" , element : <ProtectedRoute><Brands/></ProtectedRoute>},
      {path : "allorders" , element : <ProtectedRoute><Orders/></ProtectedRoute>},
      {path : "shippingAddress/:cartId" , element : <ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path : "productDetails/:id" , element : <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path : "forgotPasswordEmail" , element :<ProtectedAuthRoute> <ForgotPasswordEmail/> </ProtectedAuthRoute>},
      {path : "forgotPasswordCode" , element :<ProtectedAuthRoute> <ForgotPasswordCode/> </ProtectedAuthRoute>},
      {path : "forgotPasswordNewPass" , element :<ProtectedAuthRoute> <ForgotPasswordNewPass/> </ProtectedAuthRoute>},
      {path : "*" , element : <NotFound/>},

    ]}
  ])
  

  return <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router = {router} ></RouterProvider>
        <ToastContainer />
        <Offline>
          <div className="fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200">
            You Are Offline
          </div>
        </Offline>
      </AuthContextProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
    </>
  
}

export default App
