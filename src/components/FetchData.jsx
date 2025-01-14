import { useEffect, useState } from 'react'
import axios from 'axios'

const FetchData = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {

        const dataFetch = async () => {
            try {
                const response = await axios.get("https://api.escuelajs.co/api/v1/products");
                console.log(response.data);
                setProduct(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        dataFetch()


    }, [])


    return (

        <div className='p-7'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {product.map((prod) => (
                    <div className=' border p-5 rounded-lg shadow-lg ' key={prod.id}>
                        <h1 className='text-2xl '>Title : {prod.title}</h1>
                        <h1 className='text-2xl'>price : {prod.price}</h1>
                        <img className='rounded-lg p-7' src={prod.images} alt='images'/>
                    </div>
                ))}
            </div>
        </div>
    )


}

export default FetchData;