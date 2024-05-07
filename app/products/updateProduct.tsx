"use client"

import { useRouter } from 'next/navigation'
import React, { useState, SyntheticEvent } from 'react'
import Product from "../utilities/product"

export default function UpdateProduct(product: Product) {

    const [modal, setModal] = useState(false)

    const [isMutating, setIsMutating] = useState(false)
    const [title, setTitle] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const router = useRouter()

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)

        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                name: title,
                price: price,
            })
        })

        router.refresh()
        setModal(false)
    }

    const handleChange = () => {
        setModal(!modal)

    }
    return (
        <div>
            <button className='btn btn-info btn-sm' onClick={handleChange}>EDIT</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit product {product.name}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input type="text" className="input w-full input-bordered" placeholder='Product Name' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="text" className="input w-full input-bordered" placeholder='Price' value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className="modal-action">
                            <button type='button' className='btn' onClick={handleChange}>Close</button>
                            {!isMutating ? (
                                <button type='submit' className='btn btn-primary' >Update</button>
                            ) : (
                                <button type='button' className='btn loading-spinner' >Updating...</button>
                            )}


                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
