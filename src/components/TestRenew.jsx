import ProductCard from './ProductCard';
import useFetchData from '../utils/useFetchData';

const TestRenew = () => {
    const products = useFetchData();  

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default TestRenew;


//custum Data 
// useEffect(() => {
//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get(DATA_API);
//             setProducts(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };

//     fetchProducts();
// }, []);
