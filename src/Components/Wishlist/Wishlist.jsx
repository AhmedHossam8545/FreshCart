// import React from 'react'

// export function Wishlist() {
//   return (
//     <div>Wishlist</div>
//   )
// }


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import CartProduct from '../CartProduct/CartProduct'
import { Link } from 'react-router-dom'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen'
import { Helmet } from 'react-helmet'
import WishlistProduct from '../WishlistProduct/WishlistProduct'

export  function Wishlist() {



  const [wishlist, setWishlist] = useState(null)
  const [isLoading , setIsLoading ] = useState(true);

  useEffect(() => {
    getUserwishlist()
  } ,[])




    async function getUserwishlist() {
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" ,{
      headers: {
        token : localStorage.getItem("token")
      }
    }).finally(()=>{
      setIsLoading(false)
    })
    setWishlist(data);
    console.log(data);
    
    
  }


  if (isLoading) {
    return <LoadingScreen/>
  }

  if (!wishlist || wishlist.data.length === 0) {
    return <h1 className='text-center text-4xl font-bold p-64'>Your Wishlist Is Empty <span className='text-5xl text-red-600' >.</span></h1>
  }

  return (
    <>
      <Helmet>
  <title>Wishlist</title>
</Helmet>
     {wishlist ? <section className="bg-custom py-8 mt-20   dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-cbold text-purple dark:text-white sm:text-2xl">Your Wishlist</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {wishlist?.data.map((product ,index) => {
                return <WishlistProduct key={index} product={product} setWishlist={setWishlist} wishlist={wishlist} />
              })}

            </div>

          </div>

        </div>
      </div>
    </section> : <h1 className='text-center text-4xl font-bold py-20' >Your Wishlist Is Empty</h1>}
    </>
  )
}





// import axios from 'axios';
// import React, { useState } from 'react';
// import { Bounce, toast } from 'react-toastify';
// import WishlistProduct from '../WishlistProduct/WishlistProduct';
// import { Link } from 'react-router-dom';
// import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
// import { Helmet } from 'react-helmet';
// import { QueryClient, useQuery } from '@tanstack/react-query';

// export function Wishlist() {
//   const [ wishlist,setWishlist] = useState(null);

//   // Function to fetch the user's wishlist
//   async function getUserWishlist() {
//     const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     });
//     return data;
//   }

//   // Use React Query to fetch the wishlist data
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['wishlist'],
//     queryFn: getUserWishlist,
//     onSuccess:setWishlist(data)
//   });

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (isError) {
//     return <div>Error loading wishlist. Please try again later.</div>;
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Wishlist</title>
//       </Helmet>
//       {wishlist?.data.length > 0 ? (
//         <section className="bg-custom py-8 antialiased dark:bg-gray-900 md:py-16">
//           <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Your Wishlist</h2>
//             <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//               <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//                 <div className="space-y-6">
//                   {wishlist.data.map((product, index) => (
//                     <WishlistProduct
//                       key={index}
//                       product={product}
//                       setWishlist={setWishlist}
//                       wishlist={wishlist}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <h1 className="text-center text-4xl font-bold py-20">Your Wishlist Is Empty</h1>
//       )}
//     </>
//   );
// }



// import axios from 'axios';
// import React, { useState } from 'react';
// import { Bounce, toast } from 'react-toastify';
// import WishlistProduct from '../WishlistProduct/WishlistProduct';
// import { Link } from 'react-router-dom';
// import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
// import { Helmet } from 'react-helmet';
// import { useQuery } from '@tanstack/react-query';

// export function Wishlist() {
//   const [wishlist, setWishlist] = useState(null);
//   useState
  
//   // Function to fetch the user's wishlist
//   async function getUserWishlist() {
//     let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     });
//     setWishlist(data)
//     // return data;
//   }

//   // Use React Query to fetch the wishlist data
//   // const { data, isLoading, isError } = useQuery({
//   //   queryKey: ['wishlist'],
//   //   queryFn: getUserWishlist,
    
//   //   // onSuccess: (data) => setWishlist(data),
//   //   // onSuccess:setWishlist(data),
//   // });
//   console.log(data);
//   // setWishlist(data)

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (isError) {
//     return <div>Error loading wishlist. Please try again later.</div>;
//   }
//   if (!data || !data.data || data.data.length === 0) {
//     return <h1 className="text-center text-4xl font-bold py-20">Your Wishlist Is Empty</h1>;
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Wishlist</title>
//       </Helmet>
//       {wishlist?.data.length > 0 ? (
//         <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//           <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Your Wishlist</h2>
//             <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//               <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//                 <div className="space-y-6">
//                   {wishlist?.data.map((product, index) => (
//                     <WishlistProduct
//                       key={index}
//                       product={product}
//                       setWishlist={setWishlist}
//                       wishlist={wishlist}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <h1 className="text-center text-4xl font-bold py-20">Your Wishlist Is Empty</h1>
//       )}
//     </>
//   );
// }
