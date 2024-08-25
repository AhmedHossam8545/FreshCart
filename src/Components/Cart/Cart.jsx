import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import CartProduct from '../CartProduct/CartProduct'
import { Link } from 'react-router-dom'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen'
import { Helmet } from 'react-helmet'

export  function Cart() {



  const [cart, setCart] = useState(null)
  const [isLoading , setIsLoading ] = useState(true);

  useEffect(() => {
    getUserCart()
  } ,[])




  async function getUserCart() {
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{
      headers: {
        token : localStorage.getItem("token")
      }
    }).finally(()=>{
      setIsLoading(false)
    })
    setCart(data);
    
  }

  async function clearCart() {
    let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,{
      headers: {
        token : localStorage.getItem("token")
      }
    }).finally(() =>{
      setCart(null);
    })
    
  }

  if (isLoading) {
    return <LoadingScreen/>
  }

  if (!cart || cart.data.length === 0) {
    return <h1 className='text-center text-4xl font-bold text-purple p-64'>Your Cart Is Empty <span className='text-5xl text-red-600' >.</span></h1>
  }

  return (
    <>
      <Helmet>
  <title>Cart</title>
</Helmet>
{     cart ? <section className="bg-custom py-8 antialiased dark:bg-gray-900 md:py-16 mt-20">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-bold text-purple dark:text-white sm:text-2xl ">Your Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart?.data.products.map((product ,index) => {
                return <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
              })}

            </div>
            <button onClick={clearCart} className=' mt-12 text-red-700 border-2 border-red-700 rounded-md px-4 py-2 hover:text-white hover:bg-red-700' >Clear the Cart</button>

          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

              <div className="space-y-4">
                {/* <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                    <dd className="text-base font-medium text-green-600">-$299.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                  </dl>
                </div> */}

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">${cart?.data.totalCartPrice}</dd>
                </dl>
              </div>

              <Link to={"/FreshCart/shippingAddress/" + cart?.data._id} href="#" className="flex w-full items-center justify-center rounded-lg  px-5 py-2.5 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-purple hover:bg-purple-600">Proceed to Checkout</Link>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link to={"/FreshCart/products"} href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-purple-700 underline hover:no-underline dark:text-primary-500">
                  Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white "> Do you have a voucher or gift card? </label>
                  <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                </div>
                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-purple hover:bg-purple-600">Apply Code</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section> : <h1 className='text-center text-4xl font-bold py-20' >Your Cart Is Empty</h1>}
    </>
  )
}



// import axios from 'axios';
// import React, { useState } from 'react';
// import { Bounce, toast } from 'react-toastify';
// import CartProduct from '../CartProduct/CartProduct';
// import { Link } from 'react-router-dom';
// import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
// import { Helmet } from 'react-helmet';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// export function Cart() {
//   const queryClient = useQueryClient();
//   const [cart, setCart] = useState(null);

//   // Function to fetch the user's cart
//   async function getUserCart() {
//     const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     });
//     return data;
//   }

//   // Use React Query to fetch the cart data
//   const { isLoading, isError } = useQuery({
//     queryKey: ['cart'],
//     queryFn: getUserCart,
//     onSuccess: (data) => {
//       setCart(data);
//     },
//   });

//   // Function to clear the cart
//   const clearCartMutation = useMutation({
//     mutationFn: async () => {
//       await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//     },
//     onSuccess: () => {
//       setCart(null); // Clear the local cart state
//       queryClient.invalidateQueries(['cart']); // Refetch the cart data after clearing
//     },
//     onError: () => {
//       toast.error("Failed to clear the cart.");
//     },
//   });

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (isError) {
//     return <div>Error loading cart. Please try again later.</div>;
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Cart</title>
//       </Helmet>
//       {cart?.data?.products?.length > 0 ? (
//         <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//           <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

//             <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//               <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//                 <div className="space-y-6">
//                   {cart.data.products.map((product, index) => (
//                     <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => clearCartMutation.mutate()}
//                   className="mt-12 text-red-700 border-2 border-red-700 rounded-md px-4 py-2 hover:text-white hover:bg-red-700"
//                 >
//                   Clear the Cart
//                 </button>
//               </div>

//               <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
//                 <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//                   <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

//                   <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
//                     <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
//                     <dd className="text-base font-bold text-gray-900 dark:text-white">${cart?.data.totalCartPrice}</dd>
//                   </dl>
//                 </div>

//                 <Link
//                   to={`/shippingAddress/${cart?.data._id}`}
//                   className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Proceed to Checkout
//                 </Link>

//                 <div className="flex items-center justify-center gap-2">
//                   <span className="text-sm font-normal text-gray-500 dark:text-gray-400">or</span>
//                   <Link
//                     to="/"
//                     className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
//                   >
//                     Continue Shopping
//                   </Link>
//                 </div>
//               </div>

//               <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//                 <form className="space-y-4">
//                   <div>
//                     <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
//                       Do you have a voucher or gift card?
//                     </label>
//                     <input
//                       type="text"
//                       id="voucher"
//                       className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
//                       placeholder=""
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                   >
//                     Apply Code
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <h1 className="text-center text-4xl font-bold py-20">Your Cart Is Empty</h1>
//       )}
//     </>
//   );
// }
