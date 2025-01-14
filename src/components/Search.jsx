import { useEffect, useState } from 'react';
import axios from "axios";

const Search = () => {
    const [products, setProducts] = useState([]); // Original product list
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.escuelajs.co/api/v1/products");
                console.log(response.data);
                setProducts(response.data); // Save the full product list
                setFilteredProducts(response.data); // Initialize the filtered list
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        console.log("Search");
        const filtered = products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredProducts(filtered); // Update only the filtered list
    };

    return (
        <div>
            <div className='p-5'>
                <input
                    type='text'
                    placeholder='Search'
                    className='border p-2 rounded-md'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch} className='ml-4 border p-2 rounded bg-gray-100'>Search</button>
            </div>

            <div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
                    {filteredProducts.map((prod) => (
                        <div className='p-5 border rounded-lg shadow-lg' key={prod.id}>
                            <h1 className='text-2xl'> Title : {prod.title}</h1>
                            <p className='font-bold'>Price : {prod.price}</p>
                            <img
                                className='rounded-lg mt-4 transition-transform duration-300 hover:scale-110'
                                src={prod.images}
                                alt='product-image'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
