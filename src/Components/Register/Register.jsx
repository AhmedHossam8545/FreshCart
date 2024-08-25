import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

export  function Register() {


    const [isLoading , setIsLoading ] = useState(false);
    const [errorMsg ,setErrorMsg ] = useState("");
    const [successMsg ,setSuccessMsg ] = useState("");
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    async function onSubmit(){
        setErrorMsg("");
        setSuccessMsg("");
        setIsLoading(true);


        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values).then(({data}) => {
            setIsLoading(false)
            console.log(data);
            setSuccessMsg(data.message)
            setTimeout(() => {
                navigate("/login")
            }, 500);
        }).catch((error) => {
            setIsLoading(false)
            console.log(error.response.data.message);
            setErrorMsg(error.response.data.message);
        })
        setIsLoading(false)
        // console.log(data);

    }

    const initialValues = {
        "name": "",
        "email":"",
        "password":"",
        "rePassword":"",
        "phone":""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is Required").min(3 , "Name length must be more than 2").max(20 , "Name length Must be less than 20"),
        email: Yup.string().required("Email is Required").email("Enter valid email"),
        password : Yup.string().required("Password is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ , "Minimum eight characters, at least one letter, one number and one special character"),
        rePassword : Yup.string().required("Re-Password is Required").oneOf([Yup.ref("password")] , "Password and Repassword must be matched"),
        phone: Yup.string().required("Phone is Required").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/ , "Phone Number is not correct")
    })

    let {handleSubmit ,values ,handleChange , errors , touched ,handleBlur} = useFormik({
        initialValues ,
        onSubmit,
        validationSchema  
    })


  return <>
    
    <div className="min-h-screen flex justify-center items-center mt-16">
            <div className="w-full md:w-1/2 lg:w-1/3  mx-auto  bg-white  rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center text-gray-700  mb-8">Welcome to <span className='text-purple-600 text-2xl'>Fresh Cart</span></h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
                <label htmlFor="username" className="text-sm text-purple-700 font-bold  mr-2 mb-1">Name:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="username" name="name" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                { touched.name && errors.name && <p className='text-red-500' >{errors.name}</p>}
            </div>

            <div className="flex items-start flex-col justify-start">
                <label htmlFor="email" className="text-sm text-purple-700 font-bold mb-1 mr-2">Email:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                { touched.email && errors.email &&<p className='text-red-500' >{errors.email}</p>}

            </div>

            {/* <div className="flex items-start flex-col justify-start">
                <label htmlFor="password" className="text-sm text-purple-700 font-bold mb-1  mr-2">Password:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3   py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                { touched.password && errors.password && <p className='text-red-500' >{errors.password}</p>}
            </div> */}

            <div className="flex items-start flex-col justify-start">
                <label htmlFor="password" className="text-sm text-purple-700 font-bold mb-1  mr-2">Password:</label>
                <div className="w-full relative">
                <input onBlur={handleBlur} onChange={handleChange} value={values.password} type={showPassword ? 'text' : 'password'} id="password" name="password" className="  w-full px-3   py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                <FontAwesomeIcon
                  icon={showPassword ? faLockOpen : faLock}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-purple-600"
                  onClick={togglePasswordVisibility}
                />
                </div>
                { touched.password && errors.password && <p className='text-red-500' >{errors.password}</p>}
            </div>  

            <div className="flex items-start flex-col justify-start">
                <label htmlFor="confirmPassword" className="text-sm text-purple-700 font-bold mb-1 mr-2">Confirm Password:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="confirmPassword" name="rePassword" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                { touched.rePassword && errors.rePassword && <p className='text-red-500' >{errors.rePassword}</p>}
            </div>

            {/* confirm pass with Lock */}
            {/* <div className="flex items-start flex-col justify-start">
                <label htmlFor="confirmPassword" className="text-sm text-purple-700 font-bold mb-1 mr-2">Confirm Password:</label>
                <div className="w-full relative">
                <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type={showPassword ? 'text' : 'password'} id="confirmPassword" name="rePassword" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                <FontAwesomeIcon
                  icon={showPassword ? faLockOpen : faLock}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-purple-600"
                  onClick={togglePasswordVisibility}
                />
                </div>
                { touched.rePassword && errors.rePassword && <p className='text-red-500' >{errors.rePassword}</p>}
            </div> */}

            <div className="flex items-start flex-col justify-start">
                <label htmlFor="phone" className="text-sm text-purple-700 font-bold mb-1 mr-2">Phone Number:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                { touched.phone && errors.phone &&<p className='text-red-500' >{errors.phone}</p>}

            </div>


            <button type="submit" className="bg-purple hover:bg-purple-600 duration-300 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400 " disabled = {isLoading} >Register {isLoading && <i className='fas fa-spinner fa-spin' ></i>} </button>
            { errorMsg && <p className='text-red-500 text-center ' >{errorMsg}</p>}
            { successMsg && <p className='text-green-500 text-center ' > {successMsg} </p>}
            </form>

            <div className="mt-4 text-center">
            <span className="text-sm text-purple-500 ">Already have an account? </span>
            <Link to={"/login"} className="text-purple-500 hover:text-purple-600 font-bold">Login</Link>
            </div>
            
        </div>
    </div>

  </>
}
