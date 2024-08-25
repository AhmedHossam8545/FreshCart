import axios from "axios";
import { Bounce, toast } from "react-toastify";



export async function addProductToWishlist(productId ,userToken ) {
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
        
    
}