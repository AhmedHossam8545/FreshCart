import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';

export default function CartProduct({product , setCart ,cart}) {

    const [isIncreaseLoading, setIsIncreaseLoading] = useState(false)
    const [isDecreaseLoading, setIsDecreaseLoading] = useState(false)
    const [productCount, setProductCount] = useState(product.count)

    async function removeProductFromCart(productId) {
        
        let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId ,{
          headers : {
            token : localStorage.getItem("token")
          }
        })
        setCart(data);
        toast.success("Product Has Been Removed Successfully", {
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
    }


    async function updateProductCount(productId , count) {
        if (count > product.count) {
            setIsIncreaseLoading(true)
        }else{
            setIsDecreaseLoading(true)
        }
        let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId , {
            count
        },{
            headers :{
                token : localStorage.getItem("token")
            }
        })
        setCart(data);
        setIsIncreaseLoading(false)
        setIsDecreaseLoading(false)
        
    }

    useEffect(() =>{
        setProductCount(product.count);

    } ,[cart])


    


  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="shrink-0 md:order-1">
                <img className="h-20 w-20 dark:hidden" src={product.product.imageCover} alt="imac image" />
                {/* <img className="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" /> */}
              </a>

              <label for="counter-input" className="sr-only">Choose quantity:</label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button disabled = {product.count == 1 || isDecreaseLoading} onClick={() => updateProductCount(product.product._id , product.count -1 )} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    { isDecreaseLoading ? <i className='fas fa-spinner fa-spin' ></i> : <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>}
                  </button>
                  <input onBlur={() => product.count != productCount && updateProductCount(product.product._id ,productCount)} onChange={(e) =>setProductCount(e.target.value) } type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={productCount} required />
                  <button disabled ={isIncreaseLoading} onClick={() => updateProductCount(product.product._id , product.count +1 )} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    { isIncreaseLoading ? <i className='fas fa-spinner fa-spin' ></i> : <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>}
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">${product.price * product.count }</p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{product.product.title}</a>

                <div className="flex items-center gap-4">
                  {/* <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to Wishlist
                  </button> */}
                  {/* {isLoading ? <i className='fas fa-heart fa-bounce fa-xl mt-5 ms-5' ></i>  :  <i onClick={() => addProductToWishlist(product._id , userToken)} className= {isCllicked ? ' fas fa-heart fa-xl mt-5 ms-5 cursor-pointer text-red-600 ' : ' fas fa-heart fa-xl mt-5 ms-5 cursor-pointer ' } ></i>} */}


                  <button onClick={() => {removeProductFromCart(product.product._id)} } type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}
