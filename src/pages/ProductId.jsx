
import React, { useState, useEffect } from 'react'
import useFetch from '../Hooks/useFetch'
import { Link, useParams } from 'react-router-dom'
import { Col, Container, Image, Row, Button } from 'react-bootstrap'
import Spinner from '../utils/Spinner'
import FormatCurrency from '../utils/FormatCurrency'
import { useStateContext } from '../libs/ContextApi'
import toast from 'react-hot-toast'



export default function ProductId() {
    const [index, setIndex] = useState(0)
    const{productid} = useParams()
    

    const {data, loading, error} = useFetch(`https://ecommtest.onrender.com/products/${productid}`)
    //console.log('pid', data)

    const {data: products} = useFetch(`https://ecommtest.onrender.com/products/`)
    //console.log('produce', products)

    const {increasedBagQuantity} = useStateContext()

    const relatedProduct = products.filter((product) => product.category?.name === data.category?.name)
    //console.log(relatedProduct)

    const filterById = relatedProduct.filter((product) => product.id !== data.id)
    //console.log(filterById)

    useEffect(() => {
        window.scrollTo({behavior:'smooth', top:'0'})
    },[productid])

  return (
    <Container>
        {loading && <Spinner/>}
        {error || (data && (
            <>
            <Row className='mt-5 g-4 h-100'>
            {error && <p>{error.message}</p>}
                <Col md={8}>
                    <div className='d-md-flex align-items-center h-100 gap-4'>
                        <div className='mb-4 align-self-end gap-2'>
                            <h5 className='text-start'>{data.title}</h5>
                            <p>{data.category?.name}</p>
                        </div>
                        <div className='d-md-flex mb-4 adjustImg'>
                            <Image src={data.images && data.images[index]} 
                            alt={data.title} className='w-100 h-100'/>
                        </div>
                        <div className='d-flex flex-md-column align-self-start'>
                            {data.images?.map((image, i)=> (
                                <Image key={i} src={image} alt='...'
                                style={{height:'70px', width:'70px'}} 
                                className={i === index ? 'border border-dark' : '...'} 
                                onMouseEnter={()=> setIndex(i)}/>
                            ))}
                        </div>
                    </div>
                </Col>

                <Col md={4}>
                    <div className='d-md-flex align-items-center gap-4 h-100'>
                        <div className='align-self-end gap-2 mb-4'>
                            <h5 className='font-bold'>DESCRIPTION</h5>
                            <p className='text-sm text-secondary'>{data.description}</p>
                            <p>{FormatCurrency(data.price)}</p>
                            <Button className='border-none rounded-0 w-100' variant='dark' 
                                onClick={()=> {increasedBagQuantity(data.id);
                                    toast.success(`${data.title} Added to bag`)}}>
                                ADD TO BAG
                            </Button>
                        </div>
                    </div>
                </Col>

            </Row>
            </>
        ))}
        <div style={{marginTop:'5rem'}}>
            <h5 className='text-start text-sm font-bold'> SIMILAR ITEMS </h5>

            <div className='mt-5 d-flex overflow-auto gap-4 w-100'>
                {filterById.map((item) => (
                    <div className='flex-shrink-0' key={item.id}>
                        <Link to={`/products/${item.id}`}>
                            <div style={{width:'270px', height:'350px'}}>
                                <Image src={item.images[0]} alt={item.id} className='w-100 h-100'/>    
                            </div>
                        </Link>

                        <p className='text-black mb-0 text-sm'>{item.title}</p>
                        <p className='mb-0 text-sm'>{FormatCurrency(item.price)}</p>
                        <Button variant='outline-dark' className='border-none rounded-0'
                            onClick={()=> {increasedBagQuantity(item.id); 
                                toast.success(`${item.title} Added to bag`)}}>
                            ADD TO BAG
                        </Button>

                    </div>
                ))}
            </div>

        </div>
    </Container>
  )
}
