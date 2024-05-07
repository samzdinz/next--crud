"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Product from "../utilities/product"

export default function DeleteProduct(product: Product) {

    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    const handleDelete = async (productId: number) => {
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${productId}`, {
            method: "DELETE",

        })
        router.refresh()
        setModal(false)
    }

    const handleChange = () => {
        setModal(!modal)
    }

    return (
        <div>
            <button className='btn btn-error btn-sm' onClick={handleChange}>DELETE</button>

            <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are You Sure Delete this {product.name}?</h3>

                    <div className="modal-action">
                        <button type='button' className='btn' onClick={handleChange}>Close</button>
                        {!isMutating ? (
                            <button type='button' onClick={() => handleDelete(product.id)} className='btn btn-error' >Delete</button>
                        ) : (
                            <button type='button' className='btn btn-error' >Deleting...</button>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}
