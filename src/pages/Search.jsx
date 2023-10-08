
import React,{useEffect, useState} from 'react'
import useFetch from '../Hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Spinner from '../utils/Spinner'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ProductContainer from '../components/ProductContainer'
import { AiOutlineClose } from 'react-icons/ai'

export default function Search() {
    const[query, setQuery] = useState('')
    const {data, loading, error} = useFetch('https://ecommtest.onrender.com/products')

    //console.log('query', query)

    const navigate = useNavigate()


    useEffect(()=>{
        const getSearch = setTimeout(()=>{
            if(query && query.length > 0){
                setQuery(query)
            }
        }, 3000);
        return() => clearTimeout(getSearch)
    },[query])

    useEffect(()=>{
        const params = new URLSearchParams()
        if (query){
            params.append('name',query)
        }else{
            params.delete('name')
        }
        navigate({search: params.toString()})
    },[query,  navigate])

    const filterData = data.filter((res) => {
        const filter = res.title === query || res.category?.name === query
        if(query !== ''){
            return (
                res.title.toLowerCase().includes(query) || 
                res.category?.name.toLowerCase().includes(query) || filter
            ) 
        }else{
            return false
        }
    })

  return (
    <Container style={{marginTop:'7rem'}}>
        <div className='position-relative pb-2 mb-4 border-bottom border-dark'>
            <input className='small w-100 border-0 no-outline'
                id='search' type='text' placeholder='SEARCH products' 
                value={query} onChange={(e)=> setQuery(e.target.value)}
             />

             {query.length > 0 && (
                <AiOutlineClose className='position-absolute end-0'
                 style={{cursor:'pointer'}} onClick={()=> setQuery('')}/>
             )}
        </div>

        {loading && <Spinner/>}
        {error || (filterData &&(
            <div className='mt-5'>
                {error && <p>{error.message}</p>}

                <div className='d-flex align-items-center'>
                    <p>{filterData.length} results</p>   
                </div>

                {filterData && (
                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}>
                        <Masonry gutter='30px'>
                            {filterData.map((product)=>(
                                <ProductContainer key={product.id} {...product}/>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>   
                )}

            </div>
        ))}
    </Container>
  )
}
