
import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function ForgotPasswordCode() {
  const [otp, setOtp] = useState(Array(6).fill("")); // Array with 6 empty strings
  const inputRefs = useRef([]); // Array of refs for each input field
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()


  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  async function verifyCode() {
    setIsLoading(true)
     await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",{
        resetCode: otp.join(""),
    }).then(({data}) => {
        console.log("success");
        console.log(data);
                   
        toast.success("Code Is Verfied", {
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

        setIsLoading(false)
        navigate("/forgotPasswordNewPass")
        
    }).catch((error) => {
        setErrorMsg(error.response.data.message);
        toast.error(errorMsg, {
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
        setIsLoading(false)
        console.log("hhghghghg");
    })
    // console.log(data);
    // console.log(data?.response.data.message);
    
  }

  return (
    <div className="grid grid-cols-1 ">
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-custom py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16  grid grid-cols-1">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="font-semibold text-3xl">
                    <p>Code Verification</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                    <p>We have sent a code to your email which will be valid for 10 minutes only</p>
                    </div>
                </div>
            
                <div>
                <form id="otp-form" className="flex flex-col gap-2">
                <div className="flex justify-center items-center gap-4  mb-10">
                {otp.map((digit, index) => (
                    <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
                    />
                ))}
                </div>
                {/* You can conditionally render a submit button here based on otp length */}
                </form>
                <div className="flex flex-col space-y-5">
                    <div>
                        <button onClick={verifyCode} disabled={isLoading} className=" disabled:bg-gray-500 bg-purple hover:bg-purple-600 duration-300 flex flex-row items-center justify-center  text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white shadow-sm">
                        Verify Code {isLoading && <i className="fas fa-spinner fa-spin ms-3" ></i>}
                        </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't recieve code?</p> <Link to={"/forgotPasswordEmail"} className="flex flex-row items-center text-purple-600"  >Resend</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}



// ForgotPasswordCode

