
import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormatCurrency from '../utils/FormatCurrency'

export default function ProductContainer({id, title, price, images}) {

  return (
    <Link to={`/products/${id}`}>
        <>
        <div style={{height:'420px'}}>
            <Image src={images[0]} alt={title} className='w-100 h-100'/>
        </div>
        <div className='d-flex justify-content-between'>
            <p className='text-dark'>{title}</p>
            <p className='text-xs text-secondary'>{FormatCurrency(price)} </p>

        </div>
        </>
    </Link>
  )
}
