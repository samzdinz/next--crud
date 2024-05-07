import AddProduct from "./addProduct"
import DeleteProduct from "./deleteProduct"
import UpdateProduct from "./updateProduct"
import Product from "../utilities/product"

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
            <thead className="text-lg">
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
                        <td className="flex gap-2">
                            <UpdateProduct {...product} />
                            <DeleteProduct {...product}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
  )
}
