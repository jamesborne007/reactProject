
import React from 'react'
import { useStateContext } from '../libs/ContextApi'
import { Image } from 'react-bootstrap'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import FormatCurrency from '../utils/FormatCurrency'

export default function CartBagItem({id, data}) {
  const {removeFromBag, increasedBagQuantity, decreaseBagQuantity, getItemQuantity } = useStateContext()
  
  const item = data?.find((product) => product.id === id)
 
  if(item == null ){
    return null
  }
  
  const quantityCount = getItemQuantity(item.id)


  return (
    <div className='mt-2 '>
      <h5 className='text-start text-sm font-bold'>{item.title}</h5>
      <div className='d-md-flex gap-4 mt-5 '>
        <div className='mb-4 mb-md-0' style={{height:'270px'}}>
          <Image src={item.images[0]} alt={item.title} className='w-100 h-100' />
        </div>
        <div className='d-flex flex-md-column justify-content-between'>
          <div class='d-flex gap-3 align-items-center align-self-center'>
            <AiOutlineMinus onClick={()=> decreaseBagQuantity(item.id)} style={{cursor:'pointer'}}/>
            <span>{quantityCount}</span>
            <AiOutlinePlus onClick={()=> increasedBagQuantity(item.id)} style={{cursor:'pointer'}}/>
          </div>
          <p className='text-center text-sm'>{FormatCurrency(item.price)}</p>
          <p className='text-sm text-center' style={{cursor:'pointer'}} 
            onClick={()=> removeFromBag(id)} >Delete</p>

        </div>

      </div>

    </div>
  )
}
