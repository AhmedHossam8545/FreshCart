import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import { Radio, RadioGroup } from '@headlessui/react';
import { RatingStars } from '../RatingStars/RatingStars';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { ProductImageSlider } from '../ProductImageSlider/ProductImageSlider';
import { RelatedProducts } from '../RelatedProducts/RelatedProducts';
import { AuthContext } from '../../Contexts/AuthContext';
import { addProductToCart } from '../../cartService';
import 'flowbite'

export  function ProductDetails() {

    let {id} = useParams()
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let {userToken} =  useContext(AuthContext)
    

    useEffect(() => {
        getProductDetails()
    },[id])
    
    async function getProductDetails(){
        setIsLoading(true);
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/"+id)
        setProductDetails(data.data);
        getRelatedProduct(data.data?.category._id)
        console.log(data);
        setIsLoading(false);
        
    }

    async function getRelatedProduct(categoryId) {
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" , {
            params : {
                "category" :categoryId
            }
        })
        setRelatedProducts(data.data);
        console.log(data.data);
        

        

    }
    const items = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    document.getElementById('nextBtn')?.addEventListener('click', () => {
        items[currentItem].classList.remove('slider_active');
        currentItem = (currentItem + 1) % items.length;
        items[currentItem].classList.add('slider_active');
    });

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        items[currentItem].classList.remove('slider_active');
        currentItem = (currentItem - 1 + items.length) % items.length;
        items[currentItem].classList.add('slider_active');
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productDetails?.images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % productDetails?.images.length);
    };
  
    return (
        <>
            {
                isLoading ? <LoadingScreen/> :
                <div className="bg-custom overflow-hidden mt-20 lg:p-10 ">
                    <div className="pt-6 ">

            
                    {/* Image gallery */}
                    <div className=" sm:w-full md:w-1/2 lg:w-1/3  mx-auto lg:h-1/3 ">
                        {/* <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            alt={productDetails?.images[0]}
                            src={productDetails?.images[0]}
                            className="h-full w-full object-cover object-center"
                        />
                        </div>  
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                            alt={  productDetails?.images[1]}
                            src={  productDetails?.images[1]}
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                            alt={  productDetails?.images[2]}
                            src={  productDetails?.images[2]}
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img
                            alt={  productDetails?.images[3]}
                            src={  productDetails?.images[3]}
                            className="h-full w-full object-cover object-center"
                        />
                        </div> */}
                        {/* <img src={productDetails.images[0]} alt="" /> */}
                    <ProductImageSlider images ={productDetails?.images} />
                    </div>

            

            
                    {/* Product info */}
                    <div className=" shadow-lg  mt-10 mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-purple-900 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{  productDetails?.title}</h1>
                        </div>
            
                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0 shadow-lg shadow-black p-5">
                        <h2 className="sr-only">Product information</h2>
                        {/* <p className="text-3xl tracking-tight text-gray-900">${  productDetails.?price}</p> */}
                            <span className="text-3xl font-bold text-purple">${   productDetails?.priceAfterDiscount ?  productDetails?.priceAfterDiscount :  productDetails?.price} </span> 
                            {   productDetails?.priceAfterDiscount && <span className="text-sm text-slate-900 line-through">${  productDetails?.priceAfterDiscount ?  productDetails?.price : null}</span>}
            
                        {/* Reviews */}
                        <div className="mt-6">
                            {/* <h3 className="sr-only">Reviews</h3> */}
                            <div className="flex items-center">
                            <RatingStars ratingsAverage ={ productDetails?.ratingsAverage ?? 0}  />
                            {/* <p className="sr-only">{  productDetails.?ratingsAverage} out of 5 stars</p> */}
                            <a  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                {/* {productDetails.totalCount} reviews */}
                            </a>
                            </div>
                        </div>
                        <div className="mt-2 counter">
                                    <label className="text-purple-600 text-md font-bold" for="count">Count:</label>
                                    <div className="flex items-center mt-1">
                                        <button className="text-purple-500 focus:outline-none focus:text-purple-600">
                                            <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </button>
                                        <span className="text-purple-700 text-lg mx-2">20</span>
                                        <button className="text-purple-500 focus:outline-none focus:text-purple-600">
                                            <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </button>
                                    </div>
                                </div>
            
                            
            
                        <form className="mt-10">
                            {/* Colors */}
                            <div>
                            {/* <h3 className="text-sm font-medium text-gray-900">Color</h3> */}
            {/*   
                            <fieldset aria-label="Choose a color" className="mt-4">
                                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                                {relatedProducts.colors.map((color) => (
                                    <Radio
                                    key={color.name}
                                    value={color}
                                    aria-label={color.name}
                                    className={classNames(
                                        color.selectedClass,
                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                                    )}
                                    >
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                        color.className,
                                        'h-8 w-8 rounded-full border border-black border-opacity-10',
                                        )}
                                    />
                                    </Radio>
                                ))}
                                </RadioGroup>
                            </fieldset> */}
                            </div>
            
                            {/* Sizes */}
                            {/* <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Size guide
                                </a>
                            </div>
                                {/*   
                            <fieldset aria-label="Choose a size" className="mt-4">
                                <RadioGroup
                                value={selectedSize}
                                onChange={setSelectedSize}
                                className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                >
                                {relatedProducts.sizes.map((size) => (
                                    <Radio
                                    key={size.name}
                                    value={size}
                                    disabled={!size.inStock}
                                    className={classNames(
                                        size.inStock
                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                    )}
                                    >
                                    <span>{size.name}</span>
                                    {size.inStock ? (
                                        <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                        />
                                    ) : (
                                        <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                        <svg
                                            stroke="currentColor"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        >
                                            <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                        </svg>
                                        </span>
                                    )}
                                    </Radio>
                                ))}
                                </RadioGroup>
                            </fieldset> 
                            </div> */}
            
                            <Link onClick={() => addProductToCart(productDetails._id , userToken)} className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-purple hover:bg-purple-600 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            Add to Cart
                            </Link>
                        </form>
                        </div>
            
                        <div className="py-10  lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="text-gray-700 font-bold">Description :</h3>
                            <div className="space-y-6">
                            <p className="text-base text-gray-900">{  productDetails?.description}</p>
                            </div>
                        </div>
                        <div className="category my-3">
                                <label className='text-gray-700 font-bold ' > Category :  </label>
                                <h3> {  productDetails?.category.name} </h3>
                            </div>
                            <div className="sub-category my-3">
                                <label className='text-gray-700 font-bold' > SubCategory :  </label>
                                <h3> {  productDetails?.subcategory[0].name} </h3>
                            </div>
                            <div className="brand my-3">
                                <label className='text-gray-700 font-bold' > Brand :  </label>
                                <h3> {  productDetails?.brand.name} </h3>
                            </div>
            
                        {/* <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
            
                            <div className="mt-4">
                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                {product.highlights.map((highlight) => (
                                <li key={highlight} className="text-gray-400">
                                    <span className="text-gray-600">{highlight}</span>
                                </li>
                                ))}
                            </ul>
                            </div>
                        </div>
            
                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>
            
                            <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600">{product.details}</p>
                            </div>
                        </div> */}
                        </div>
                    </div>
                    </div>
                    <RelatedProducts products={relatedProducts} />

                    
                </div>
                

                
            }
        </>

    )

  }
  
