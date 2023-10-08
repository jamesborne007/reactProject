
import React from 'react'
import HeroProduct from '../components/HeroProduct'
import useFetch from '../Hooks/useFetch'
import HomeCategory from '../components/HomeCategory'
import FeatureProducts from '../components/FeatureProducts'

export default function Homepage() {
  const {data, loading, error} = useFetch('https://ecommtest.onrender.com/products')

  return (
    <>
      <HeroProduct data={data} loading={loading} error={error}/>
      <HomeCategory/>
      <FeatureProducts data={data} loading={loading} error={error}/>
    </>
  )
}
