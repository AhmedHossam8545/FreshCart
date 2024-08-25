// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { Product } from '../Product/Product';
// import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

// export function ProductsOfCategory() {
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(null)

//     let {categoryId} = useParams()


//     console.log(categoryId);
    
    
//     async function getRelatedProduct() {
//       setIsLoading(true)
//         let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" , {
//             params : {
//                 "category" :categoryId
//             }
//         })
//         setRelatedProducts(data.data);
//         console.log(data.data);
//         setIsLoading(false)
        
//     }

    

//     useEffect(() => {
//       getRelatedProduct(categoryId)
//   },[])

// console.log(relatedProducts[0]);


//   if (isLoading) {
//     return <LoadingScreen/>
//   }

//   return (
//     <>
//    { relatedProducts[0] != undefined ? <div className="container mx-auto mt-10" >
//       <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20">
//         {relatedProducts.map((product , index) => {
//           return <Product product={product} key={index} />
//         })}
//       </div>
//     </div> : <h1 className='text-5xl font-bold text-center p-20'>There is NO Products for this category Now</h1> 
//     }
//     </>
//   )
// }



import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../Product/Product';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { useQuery } from '@tanstack/react-query';

export function ProductsOfCategory() {
    const { categoryId } = useParams();

    // Function to fetch related products
    const fetchRelatedProducts = async () => {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products/", {
            params: { "category": categoryId },
        });
        return response.data.data;
    };

    // Use react-query's useQuery hook to fetch data
    const { data: relatedProducts, isLoading, isError } = useQuery({
        queryKey: ['products', categoryId],
        queryFn: fetchRelatedProducts,
        enabled: !!categoryId, // Only run the query if categoryId is available
    });

    // Show loading screen while data is loading
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Handle any errors
    if (isError) {
        return <h1 className="text-5xl font-bold text-center p-20">Failed to load products. Please try again later.</h1>;
    }

    // Render the products or a message if no products are found
    return (
        <>
            {relatedProducts && relatedProducts.length > 0 ? (
                <div className="container mx-auto mt-24 lg:p-10">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20">
                        {relatedProducts.map((product, index) => (
                            <Product product={product} key={index} />
                        ))}
                    </div>
                </div>
            ) : (
                <h1 className="text-5xl font-bold text-center p-20">There Are NO Products For This Category Right Now</h1>
            )}
        </>
    );
}
