import React from 'react';

const ProductCard = ({ product }) => {
    const hasDiscount = product.discountPrice && product.discountPrice < product.price;

    return (
        <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
            <div className="h-48 flex justify-center items-center mb-4">
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="max-h-full object-contain"
                />
            </div>
            <div className="text-xs text-gray-500 mb-1">{product.category?.name}</div>
            <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
                {product.name}
            </h3>

            <div className="mt-2">
                {hasDiscount ? (
                    <>
                        <div className="text-xs text-gray-400 line-through">S/ {product.price}</div>
                        <div className="text-xl font-bold text-red-600">S/ {product.discountPrice}</div>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                        </span>
                    </>
                ) : (
                    <div className="text-xl font-bold text-gray-800">S/ {product.price}</div>
                )}
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-medium text-sm">
                Agregar al Carro
            </button>
        </div>
    );
};

export default ProductCard;