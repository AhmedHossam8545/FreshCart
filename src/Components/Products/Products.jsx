// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react'
// import { Helmet } from 'react-helmet'
// import { Product } from '../Product/Product';

// export  function Products() {

//    function getProducts() {
//     return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    
//   }

//   let {data} = useQuery({
//     queryKey : ['products'],
//     queryFn: getProducts,
//   })
//   console.log(data);
  


//   return (
//     <>
//         <Helmet>
//           <title>Products</title>
//         </Helmet>
//         <div className="container  mx-auto mt-10">
//           <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20">
//             {data?.data.data.map((product , index) => {
//               return <Product key={index} product={product} />
//             })}
//           </div>
//         </div>
//     </>
//   )
// }


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Product } from '../Product/Product';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

export function Products() {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch products
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // Use react-query to fetch products
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Filter products based on search term
  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingScreen/>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container mx-auto mt-24">
        <div className="mb-5  grid-cols-1 justify-center flex">
          <input
            type="text"
            placeholder="Search products..."
            className="w-1/2  p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20 lg:p-10">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Product key={index} product={product} />
            ))
          ) : (
            <>
            <h1 className="text-5xl font-bold  text-purple  p-20">
              No Products Found<span className='text-red-600' >.</span>
            </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}
