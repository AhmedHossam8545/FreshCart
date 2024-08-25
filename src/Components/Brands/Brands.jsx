import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet'
import BrandCards from '../BrandCard/BrandCards';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

export  function Brands() {


  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    
  }
  
  let {data ,isLoading} = useQuery({
    queryKey : ['brands'],
    queryFn: getBrands,
  })
  
  console.log(data?.data.data);

if (isLoading) {
  return<LoadingScreen/>
}

  return (
    <div>
          <Helmet>
            <title>Brands</title>
          </Helmet>
           <div className="mt-20">
            {/* <h1 className=' text-center text-4xl font-bold text-purple '>Our Brands </h1> */}
            <div className="container m-auto flex justify-center items-center p-5 ">
              <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 m-auto ">
              {data?.data.data.map((brands, index) => (
                <BrandCards key={index} brands={brands} />
              ))}
            </div>
            </div>
           </div>
    </div>
  )
}
