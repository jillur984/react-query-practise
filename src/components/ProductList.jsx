
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const retrieveProducts=async({queryKey})=>{
  const response=await axios(`http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`)
  return response.data
}

const productList=()=>{
 const[page,setPage]=useState(1)
  const{data:products,error,isLoading}=useQuery({
        queryKey:["products",{page}],
        queryFn:retrieveProducts,
        staleTime:5000

    })

    if(isLoading) return <div>Data Fetching...</div>
    if(error) return <div>No Data Error has Occured:{error.message}</div>

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
        <h2 className="text-3xl my-2">Products List</h2>
        <ul className="flex flex-wrap justify-center items-center">
            {products.data&& products.data.map((product)=>(
                <li key={product.id} className="flex flex-col items-center m-2 border rounded-sm">
                <img src={product.thumbnail} alt={product.title} className="object-cover h-64 w-96"/>
                <p>{product.title}</p>
                </li>
            ))}
        </ul>
        <div className='flex'>
          {
            products.prev && (
              <button
                className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                onClick={() => setPage(products.prev)} > Prev </button>
            )
          }
          {
            products.next && (
              <button
                className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                onClick={() => setPage(products.next)} > Next </button>
            )
          }

        </div>
    </div>

  )

}
export default productList