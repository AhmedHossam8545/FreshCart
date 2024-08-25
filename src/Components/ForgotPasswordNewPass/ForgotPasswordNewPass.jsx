
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';
import { Bounce, toast } from 'react-toastify';



export  function ForgotPasswordNewPass() {

    const [isLoading , setIsLoading ] = useState(false);
    const [errorMsg ,setErrorMsg ] = useState("");
    const navigate = useNavigate()
    let {SetUserToken} = useContext(AuthContext)



    const initialValues = {
      "email":"bebohossam2004@gmail.com",
      "password":""
    }

    const validationSchema = Yup.object({
      email: Yup.string().required("Email is Required").email("Enter valid email"),
      password : Yup.string().required("Password is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ , "Minimum eight characters, at least one letter, one number and one special character"),
  })


    async function onSubmit(){
      setErrorMsg("")
      setIsLoading(true)
        await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",{
            "email":values.email,
            "newPassword":values.password
            
        }).then(({data}) => {
            setIsLoading(false)
            console.log(data);
            toast.success("Password Changed Successfully", {
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
            navigate("/login")
            
        }).catch((error) => {
            console.log(error);
            setIsLoading(false)
            
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
            <h1 className="text-xl font-bold text-center text-gray-700  mb-8">Welcome to FreshCart</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">


            <div className="flex items-start flex-col justify-start">
                <label htmlFor="email" className="text-sm text-gray-700 :text-gray-200 mr-2">Your Current Email:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                { touched.email && errors.email &&<p className='text-red-500' >{errors.email}</p>}

            </div>

            <div className="flex items-start flex-col justify-start">
                <label htmlFor="password" className="text-sm text-gray-700  mr-2">Your New Password:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3   py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                { touched.password && errors.password && <p className='text-red-500' >{errors.password}</p>}
            </div>

            <button type="submit" className="bg-purple hover:bg-purple-600 duration-300 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled = {isLoading} >Change The Password {isLoading && <i className='fas fa-spinner fa-spin' ></i>}</button>
            { errorMsg && <p className='text-red-500 text-center ' >{errorMsg}</p>}
            </form>

            
            {/* <Link to={"/forgotPasswordEmail"} className="text-red-500 hover:text-red-600">Forgot Password?</Link>
            <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 ">Does not have an account? </span>
            <Link to={"/register"} className="text-blue-500 hover:text-blue-600">Register</Link>
            </div> */}
            
        </div>
    </div>

  </>
}
