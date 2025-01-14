/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
    return (
        <div className="product-card bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Product Image */}
            <div className="product-image h-72 overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Product Details */}
            <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="product-title text-lg font-bold text-gray-800 truncate">{product.title}</h2>
                <p className="product-price text-xl font-semibold text-green-600 mt-2">${product.price}</p>
                <p className="product-price text-xl font-semibold text-green-600 mt-2">{product.description}</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;