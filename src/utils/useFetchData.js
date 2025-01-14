import axios from 'axios';
import { useEffect, useState } from 'react';
import { DATA_API } from './constants';

const useFetchData = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(DATA_API);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return products;
}

export default useFetchData;
