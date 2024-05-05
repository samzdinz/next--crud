"use client"

import { useRouter } from 'next/navigation'
import React, { useState, SyntheticEvent } from 'react'

export default function AddProduct() {

    const [modal, setModal] = useState(false)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const router = useRouter()

    const handleSubmit = async(e:SyntheticEvent) => {
        e.preventDefault()

        await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                name: title,
                price: price,
            })
        })
        setTitle("")
        setPrice("")
        router.refresh()
        setModal(false)
    }

    const handleChange = () => {
        setModal(!modal)

    }
  return (
    <div>
        <button className='btn' onClick={handleChange}>Add New</button>

        <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add New Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" className="input w-full input-bordered" placeholder='Product Name' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" className="input w-full input-bordered" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="modal-action">
                        <button type='button' className='btn' onClick={handleChange}>Close</button>
                        <button type='submit' className='btn btn-primary' >Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
