import AddProduct from "./addProduct"

type Product = {
    id: number
    name: string
    price: number
}

const getProducts = async() =>{
    const res = await fetch(`http://localhost:5000/products`, {cache: "no-store",});
    return res.json()
}

export default async function ProductList() {
    const products: Product[] = await getProducts()

  return (
    <div className="px-10 py-10">
        <div className="py-2">
            <AddProduct />
        </div>
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
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index + 1}</td>
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
