import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

export  function Categories() {

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    
  }
  
  let {data, isLoading} = useQuery({
    queryKey : ['category'],
    queryFn: getCategories,
  })

  let handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
};

if (isLoading) {
  return <LoadingScreen/>
}

// console.log(handleSelectCategory());


  console.log(data?.data.data[0]._id);
  

  return (
    <>
          <Helmet>
            <title>Categories</title>
          </Helmet>
          <div className="container m-auto flex justify-center items-center p-5 mt-20 ">
            <div className="grid sm:grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-10 m-auto ">
            {data?.data.data.map((category, index) => (
              // <CategoryCard key={index} category={category}  onSelectCategory={handleSelectCategory} />
              <div key={index}>
                  <CategoryCard 
                      category={category} 
                      onClick={() => setSelectedCategoryId(category._id)} 
                  />
                  {selectedCategoryId === category._id && (
                      <ProductsOfCategory categoryId={category._id} />
                  )}
              </div>
             
            ))}
          </div>
          </div>
  
          {/* {selectedCategoryId && <ProductsOfCategory categoryId={selectedCategoryId} />} */}
        
          
    </>
  )
}
