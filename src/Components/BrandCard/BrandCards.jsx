import React from 'react'
import { Link } from 'react-router-dom'

export default function BrandCards({brands}) {
  return (
    <Link className='cursor-default'>
        <img className="h-96 w-96  object-center object-fill  rounded-full hover:shadow-xl hover:shadow-purple-600 duration-300" src={brands.image} alt={brands.name} />
        {/* <h1 className="text-3xl font-bold text-gray-900 text-center">{brands.name}</h1> */}
    </Link>
  )
}
