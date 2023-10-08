
import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch'
import Spinner from '../utils/Spinner'


export default function Navlocker({isOpen , setOpen}) {
    const {data: categories, error, loading} = useFetch('https://ecommtest.onrender.com/categories')
    
    //console.log(categories)
    
  return (
    <div className='position-fixed h-100 top-0'>
        <div className='bg-light h-100 p-4' style={{width:'24rem'}}>
            <div style={{marginTop:'5rem'}}>
                <Link to='/products' onClick={()=> setOpen(!isOpen)}>
                    <p className='text-dark'>Products</p>
                </Link>

                <p>Categories</p>
                {loading && <Spinner/>}
                {error || (categories && (
                    <>
                    {error && <p>{error.message}</p>}
                    {categories.map((category) =>(
                        <Link to={`/categories/${category.id}`}key={category.id} onClick={()=> setOpen(!isOpen)}>
                            <p className='text-sm mt-4 text-secondary'>{ category.name}</p>
                        </Link>
                    ))}
                    </>
                ))}
                
            </div>
        </div>

    </div>
  )
}
