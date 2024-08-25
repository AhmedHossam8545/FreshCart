import React from 'react'
import { Link } from 'react-router-dom'

export function CategoryCard({category }) {
    console.log(category._id);
    
    
    return (
        <>
        <Link to={`/category/${category._id}`} className='cursor-default'>
            <img className="h-96 w-96 object-cover object-center  rounded-full hover:shadow-lg hover:shadow-purple-500 duration-300" src={category.image} alt={category.name} />
            <h1 className="text-3xl font-bold text-gray-900 text-center">{category.name}</h1>
        </Link>
    </>
  )
}
