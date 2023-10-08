
import React, {useRef}from 'react'
import { Container,Image, Button } from 'react-bootstrap'
import Spinner from '../utils/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import FormatCurrency from '../utils/FormatCurrency'
import { useStateContext } from '../libs/ContextApi'
import toast from 'react-hot-toast'


export default function FeatureProducts({data, loading, error}) {
    const scrollRef = useRef()
    const scroll = (direction) => {
        const{current} = scrollRef
        direction === 'left' ? (current.scrollLeft -= 500) : (current.scrollLeft += 500)   
    }

    const featureProducts = data.filter((product) => product.price >= 700 && product.price <= 5000)  
    console.log(featureProducts)

    const {increasedBagQuantity} = useStateContext() 

  return (
    <Container className='mt-5 p-3'>
        <h5 className='mt-5'>Feature Products</h5>
        {loading && <Spinner/>}
        {error || ( featureProducts && (
            <>
            {error && <p>{error.message}</p>}
            <div className='position-relative'>
                <Container ref={scrollRef} style={{scrollBehavior:'smooth'}} className='d-flex overflow-scroll scrollBody'>

                    {featureProducts.slice(0,9).map((product) => (
                        <div key={product.id} className='me-4'>
                            <Link to={`/products/${product.id}`}>
                                <div style={{width:'270px', height:'350px'}}>
                                    <Image src={product.images[0]} alt={product.title} 
                                    className='w-100 h-100'/>
                                </div>
                            </Link>

                            <p className='text-dark mb-4'>{product.title}</p>
                            <p className='text-secondary text-sm mb-4'>{FormatCurrency(product.price)}</p>
                            <Button variant='outline-dark' className='border-none rounded-0' 
                                onClick={() => {increasedBagQuantity(product.id); 
                                toast.success(`${product.title} Added to Bag`)}}> ADD TO BAG
                            </Button>

                        </div>
                    ))}

                </Container>

                <div className='d-none d-md-block w-100 position-absolute top-50'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <AiOutlineArrowLeft size='2rem' style={{cursor:'pointer'}} onClick={() => scroll('left')}/>
                        <AiOutlineArrowRight size='2rem' style={{cursor:'pointer'}} onClick={() => scroll('right')}/>
                    </div>
                </div>

            </div>
            </>
        ))}

    </Container>
  )
}
