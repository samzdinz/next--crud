type Products = {
    id: number
    name: string
    price: number
}

const getProducts = async() =>{
    const res = await fetch(`http://localhost:5000/Products`, {cache: "no-store",});
    return res.json()
}

export default async function ProductList() {
    const products: Products[] = await getProducts()

  return (
    <div className="px-10 py-10">
        <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
  )
}
