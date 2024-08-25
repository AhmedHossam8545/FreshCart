import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'

export  function Orders() {


  let token = localStorage.getItem("token")
  console.log(token);
  let userId = jwtDecode(token).id
  console.log(userId);
  async function getUserOrders() {
    // let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/"+userId)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    console.log(data);
    console.log(userId);
    
    
  }
  useEffect(() => {
    getUserOrders()
  } , [])
  return (
    <div className='mt-20'>Orders</div>
  )
}
