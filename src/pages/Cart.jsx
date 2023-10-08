
import React from 'react'
import { useStateContext } from '../libs/ContextApi'
import useFetch from '../Hooks/useFetch'
import { Container } from 'react-bootstrap'
import Spinner from '../utils/Spinner'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import CartBagItem from '../components/CartBagItem'
import FormatCurrency from '../utils/FormatCurrency'

export default function Cart() {
    const { data, loading, error} = useFetch( 'https://ecommtest.onrender.com/products' )
    const {bagItems} = useStateContext()

    const getTotalItems = bagItems?.reduce((total, bagItem) => {
        const totalItem = data.find((i) => i.id === bagItem.id)
        return total + (totalItem?.price || 0) * bagItem.quantity
    }, 0)


  return (
    <Container style={{paddingTop: '6rem'}}>
        {bagItems?.length ? (
            <h5 className='font-bold text-start text-sm'> CART{bagItems.length}</h5>
        ): (
            <h5 className='text-start text-sm font-bold'>Your ADD TO BAG is Empty</h5>
        )}

        {loading && <Spinner/>}
        {error || (data && (
            <div className='h-100'>
                {error && <p>{error.message}</p>}
                {data && (
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}>
                    <Masonry gutter='30px'>
                        {bagItems.map((item, index)=>(
                            <CartBagItem key={index} {...item} data={data}/>
                        ))}
                    
                    </Masonry>
                </ResponsiveMasonry>
                )}

                <div className='d-flex gap-3 font-bold text-sm mt-3 justify-content-end'>
                    <p>total {'='}
                        <span className='fw-bold text-lg ms-2'> {FormatCurrency(getTotalItems)} </span> 
                    </p>    
                </div>

            </div>
        ))}

    </Container>
  )
}
