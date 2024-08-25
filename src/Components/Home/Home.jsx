// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Product } from '../Product/Product'
// import { Helmet } from 'react-helmet'

// export  function Home() {


//   const [products, setProducts] = useState([])

//   useEffect(() => {
//     getProducts()
//   } , [])

//   async function getProducts() {
//     let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
//     setProducts(data.data);
//     console.log(data.data);
    
//   }

  

//   return (
//     <>
//       <Helmet>
//         <title>Home</title>
//       </Helmet>
//       <div className="container mx-auto mt-10">
//         <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-20 ">
//           {products.map((product , index) => {
//             return <Product product ={product} key={index} />
//           })}
//         </div>
//       </div>
      
//     </>
//   )
// }


// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Product } from '../Product/Product'
// import { Helmet } from 'react-helmet'
// import { useQuery } from '@tanstack/react-query'

// export  function Home() {


//   // const [products, setProducts] = useState([])

//   // useEffect(() => {
//   //   getProducts()
//   // } , [])

//   async function getProducts() {
//     return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    
//   }

//   let {data} = useQuery({
//     queryKey : ['products'],
//     queryFn: getProducts,
//   })    
//   // setProducts(data?.data);   
//    console.log(data?.data.data);




//   return (
//     <>
//       <Helmet>
//         <title>Home</title>
//       </Helmet>
//       <div className="container mx-auto mt-10">
//         <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-20 ">
//           {data?.data.data.map((product , index) => {
//             return <Product product ={product} key={index} />
//           })}
//         </div>
//       </div>
      
//     </>
//   )
// }








import axios from 'axios';
import React from 'react';
import { Product } from '../Product/Product';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';

export function Home() {
  // Function to fetch products
  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // Use react-query to fetch products
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Sorting and filtering logic
  const products = data?.data.data || [];

  const highestRatedProducts = products
    .slice()
    .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
    .slice(0, 8); // Get top 8 highest-rated products

  const mostSoldProducts = products
    .slice()
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 8); // Get top 8 most-sold products

  if (isLoading) {
    return <LoadingScreen/>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      
      <div className="container flex justify-center mt-20 ">
        <img src="https://cdn.midjourney.com/1d05e36c-cf66-40f7-b530-e3fad0bb8f12/0_0.png" className=' shadow-lg shadow-black rounded-lg   h-screen ' alt="" />
      </div>

      <div className="container mx-auto mt-10 flex flex-col lg:p-10">
        <h2 className="text-3xl font-bold mb-5 text-center text-purple ">Our Highest Rated Products</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20 mx-auto">
          {highestRatedProducts.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-20 mb-5 text-center text-purple">The Most Sold Products</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20">
          {mostSoldProducts.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>

          <div className="mx-auto">
            <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 my-10">See More Products</button>
          </div>
      </div>
    </>
  );
}
