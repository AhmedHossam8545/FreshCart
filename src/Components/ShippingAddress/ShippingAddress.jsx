import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';


export  function ShippingAddress() {
    let {cartId} = useParams()

    const [isLoading , setIsLoading ] = useState(false);

    const initialValues = {
        "details": "details",
        "phone": "01010700999",
        "city": "Cairo street"
    }

    const validationSchema = Yup.object({
      city: Yup.string().required("City is Required"),
      phone : Yup.string().required("Phone is Required"),
      details : Yup.string().required("Details is Required"),
  })


    async function onSubmit(){
      setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId , { shippingAddress: values} ,{
            headers: {
                token : localStorage.getItem("token")
            },
            params: {
                url :"http://localhost:5173"
            }
        }).then(({data}) => {
          setIsLoading(false)
          console.log(data.session.url);
          location.href = data.session.url; 
          

      }).catch((error) => {
          setIsLoading(false)

      })

        console.log(values);
        
    }
    
    let {handleSubmit ,values ,handleChange , errors , touched ,handleBlur} = useFormik({
        initialValues ,
        onSubmit,
        validationSchema  
    })





  return <>
    
    <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/3  mx-auto  bg-white  rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center text-purple-600  mb-8">Add Your Shipping Address</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">


            <div className="flex items-start flex-col justify-start">
                <label htmlFor="city" className="text-sm text-gray-700 :text-gray-200 mr-2">City:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" id="city" name="city" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                { touched.city && errors.city &&<p className='text-red-500' >{errors.city}</p>}

            </div>

            <div className="flex items-start flex-col justify-start">
                <label htmlFor="details" className="text-sm text-gray-700 :text-gray-200 mr-2">Details:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" id="details" name="details" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                { touched.details && errors.details &&<p className='text-red-500' >{errors.details}</p>}

            </div>

            <div className="flex items-start flex-col justify-start">
                <label htmlFor="phone" className="text-sm text-gray-700 :text-gray-200 mr-2">Phone:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                { touched.phone && errors.phone &&<p className='text-red-500' >{errors.phone}</p>}

            </div>


            <button type="submit" className="bg-purple hover:bg-purple-600 duration-300 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled = {isLoading} >CheckOut {isLoading && <i className='fas fa-spinner fa-spin' ></i>}</button>
            </form>
        </div>
    </div>

  </>
}
