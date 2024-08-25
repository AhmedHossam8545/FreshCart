import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';



export  function Login() {

    const [isLoading , setIsLoading ] = useState(false);
    const [errorMsg ,setErrorMsg ] = useState("");
    const navigate = useNavigate()
    let {SetUserToken} = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  


    const initialValues = {
      "email":"",
      "password":""
    }

    const validationSchema = Yup.object({
      email: Yup.string().required("Email is Required").email("Enter valid email"),
      password : Yup.string().required("Password is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ , "Minimum eight characters, at least one letter, one number and one special character"),
  })


    async function onSubmit(){
      setErrorMsg("")
      setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values).then(({data}) => {
          setIsLoading(false)
          SetUserToken(data.token);
          localStorage.setItem("token" ,data.token)
          if (location.pathname == "/FreshCart/login") {
            navigate("/FreshCart/")
          }else{
            navigate(location.pathname)
          }
      }).catch((error) => {
          setIsLoading(false)
          console.log(error.response.data.message);
          setErrorMsg(error.response.data.message);
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
            <h1 className="text-xl font-bold text-center text-gray-700  mb-8">Welcome to <span className='text-purple-600 text-2xl'>Fresh Cart</span></h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">


            <div className="flex items-start flex-col justify-start">
                <label htmlFor="email" className="text-sm text-purple-700 font-bold mb-1 mr-2">Email:</label>
                <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                { touched.email && errors.email &&<p className='text-red-500' >{errors.email}</p>}

            </div>

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

            <button type="submit" className="bg-purple hover:bg-purple-600 duration-300 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled = {isLoading} >Login {isLoading && <i className='fas fa-spinner fa-spin' ></i>}</button>
            { errorMsg && <p className='text-red-500 text-center ' >{errorMsg}</p>}
            </form>

            
            <Link to={"/FreshCart/forgotPasswordEmail"} className="text-red-500 hover:text-red-600">Forgot Password?</Link>
            <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 ">Does not have an account? </span>
            <Link to={"/FreshCart/register"} className="text-purple-500 hover:text-purple-600">Register</Link>
            </div>
            
        </div>
    </div>

  </>
}
