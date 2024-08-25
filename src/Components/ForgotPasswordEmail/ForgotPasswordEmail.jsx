import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';
import { Bounce, toast } from 'react-toastify';
// import { data } from 'autoprefixer';



export  function ForgotPasswordEmail() {


        // console.log("dddddddddddsdhiiiiiiiiiiiiiii");
        
    const [isLoading , setIsLoading ] = useState(false);
    const [errorMsg ,setErrorMsg ] = useState("");
    const [successMsg ,setSuccessMsg ] = useState("");
    const navigate = useNavigate()
    let {SetUserToken} = useContext(AuthContext)



    const initialValues = {
      "email":"ahmed@gmail.com",
    }

    const validationSchema = Yup.object({
      email: Yup.string().required("Email is Required").email("Enter valid email"),
  })


    async function onSubmit(){
      setErrorMsg("")
      setIsLoading(true)

        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" ,{
            "email":values.email
        }).then(({data}) =>{
            setIsLoading(false)
            // setSuccessMsg(data.message)
            
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

                navigate("/FreshCart/forgotPasswordCode")
            console.log(data.message);

            
        }).catch((error) => {
            
            setIsLoading(false)
            setErrorMsg(error.response.data.message)
            console.log(error.response.data.message);
        })
        

    }
    
    let {handleSubmit ,values ,handleChange , errors , touched ,handleBlur} = useFormik({
        initialValues ,
        onSubmit,
        validationSchema  
    })





  return <>
    
    <div className="min-h-screen flex justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/3  mx-auto  bg-white  rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center text-gray-700  mb-8">Enter Your Email To Send Verfication Code</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">


            <div className="flex items-start flex-col justify-start">
                <label htmlFor="email" className="text-sm text-gray-700 :text-gray-200 mr-2">Email:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                { touched.email && errors.email &&<p className='text-red-500' >{errors.email}</p>}

            </div>

            

            <button type="submit" className="bg-purple hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled = {isLoading} >Send Code {isLoading && <i className='fas fa-spinner fa-spin' ></i>}</button>
            { errorMsg && <p className='text-red-500 text-center ' >{errorMsg}</p>}
            { successMsg && <p className='text-green-500 text-center ' >{successMsg}</p>}
            </form>

            
        </div>
    </div>

  </>
}
