import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { RatingStars } from '../RatingStars/RatingStars'
import { addProductToCart } from '../../cartService';
import { AuthContext } from '../../Contexts/AuthContext';
import { Product } from '../Product/Product';

export  function RelatedProducts({products}) {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows : true
      };
    
    let {userToken} =  useContext(AuthContext)

  return (
    <div className="mt-12 ">
        <h1 className='text-4xl font-bold  text-center text-purple mb-10' >Related Products</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20 mb-10 ">
        {products.map((product , index) =>{
          return <Product key={index} product={product} />
          })
                }    
          </div>   
                  
         

    </div>
  )
}
