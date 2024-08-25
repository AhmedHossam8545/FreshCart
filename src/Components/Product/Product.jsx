import React, { useContext, useEffect, useState } from 'react'
import { RatingStars } from '../RatingStars/RatingStars'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Contexts/AuthContext'
import { Bounce, toast } from 'react-toastify'
import { addProductToCart } from '../../cartService'

export  function Product({product}) {

    let {userToken} =  useContext(AuthContext)
    const [isCllicked, setIsCllicked] = useState(localStorage.getItem("isClicked"))
    const [isLoading, setIsLoading] = useState(null)
    

    useEffect(() => {
        // Retrieve the state from localStorage when the component mounts
        const storedState = localStorage.getItem(`isClicked-${product._id}`)
        if (storedState !== null) {
            setIsCllicked(JSON.parse(storedState))
        }
    }, [product._id])


    async function addProductToWishlist(productId ,userToken ) {
    setIsCllicked(false)
    setIsLoading(true)
        
    if (isCllicked == false) {
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" ,{
            productId : productId
        },{
            headers:{
                token : userToken
            }
        })
        console.log(data);
    
        toast.success(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        
            console.log("hfhfgfgfgfgf");
            setIsCllicked(true)    
            // localStorage.setItem("isClicked" , isCllicked)
            localStorage.setItem(`isClicked-${productId}`, true)
    }   
    else if (isCllicked == true) {
        let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId ,{
            headers : {
              token : localStorage.getItem("token")
            }
          })
          toast.success("Product Removed Successfully From Your Wishlist", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });      

            setIsCllicked(false)
            // localStorage.setItem("isClicked" , isCllicked)
            localStorage.setItem(`isClicked-${productId}`, false)
    }


    setIsLoading(false)

    
    } 
    // localStorage.removeItem("isClicked")


    return <div className=" w-full     ">
        <div  className="relative bg-custom-sec m-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                
                <Link to={"/productDetails/" + product._id} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                    <img className="object-contain w-full" src={product.imageCover} alt="product image" />
                {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
                </Link>
                <div className="mt-4 px-5 pb-5">
                <Link to={"/productDetails/" + product._id}>
                    <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1"> {product.title} </h5>
                    <p className='line-clamp-2' > {product.description} </p>
                </Link>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                    {/* <span className="text-3xl font-bold text-slate-900">${product.price} </span> */}
                    {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
                    <span className="text-3xl font-bold text-slate-900">${ product.priceAfterDiscount ? product.priceAfterDiscount : product.price} </span> 
                    { product.priceAfterDiscount && <span className="text-sm text-slate-900 line-through">${ product.priceAfterDiscount ? product.price : null}</span>}
                    </p>
                    <RatingStars ratingsAverage ={product.ratingsAverage} />
                </div>


                <div className="flex ">
                    <button onClick={() => addProductToCart(product._id , userToken)} className="flex items-center w-full justify-center rounded-md bg-slate-900 bg-purple   px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart
                    </button>

                    {isLoading ? <i className='fas fa-heart fa-bounce fa-xl mt-5 ms-5' ></i>  :  <i onClick={() => addProductToWishlist(product._id , userToken)} className= {isCllicked ? ' fas fa-heart fa-xl mt-5 ms-5 cursor-pointer text-red-600 ' : ' fas fa-heart fa-xl mt-5 ms-5 cursor-pointer ' } ></i>}
                </div>  
                </div>
            </div>
    </div>
    
}
