import { useState } from "react"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

export default function AddProduct() {
    const queryClient=useQueryClient()
    const[state,setState]=useState({
        title:"",
        description:"",
        price:0,
        rating:5,
        thumbnail:""
    })

    const mutation = useMutation({
        mutationFn: (newProduct) => axios.post("http://localhost:3000/products",newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        }
        
    });

    const submitData=(event)=>{
       event.preventDefault()
       const newData={...state,id:crypto.randomUUID().toString()}
       mutation.mutate(newData)
       
    }
    if (mutation.isLoading) {
        return <span>Submitting...</span>
    }
    if (mutation.isError) {
        return <span>Error: {mutation.error.message}</span>
    }
    const handleChange=(event)=>{
      const name=event.target.name
      const value=event.target.type==='number' ?event.target.valueAsNumber: event.target.value
      setState({
        ...state,
        [name]:value
      })
    }
  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
        <h2 className="text-2xl my-2">Add a Product</h2>
        {mutation.isSuccess && <>Product Added</>}
        <form className="flex flex-col " onSubmit={submitData}>
        <input type="text" value={state.title} name="title" onChange={handleChange} className="my-2 p-2 rounded-sm" placeholder="Enter a Product Title" />
        <textarea
                    value={state.description}
                    name="description"
                    onChange={handleChange}
                    className="my-2 border p-2 rounded"
                    placeholder="Enter a product description"
                />
         <input
                    type="number"
                    value={state.price}
                    name="price"
                    onChange={handleChange}
                    className="my-2 border p-2 rounded"
                    placeholder="Enter a product price"
                />
                <input
                    type="text"
                    value={state.thumbnail}
                    name="thumbnail"
                    onChange={handleChange}
                    className="my-2 border p-2 rounded"
                    placeholder="Enter a product thumbnail URL"
                />        
           <button
                    type="submit"
                    className="bg-black m-auto text-white text-xl p-1 rounded-md"
                >
                    Add
                </button>      
        </form>
    </div>
  )
}
