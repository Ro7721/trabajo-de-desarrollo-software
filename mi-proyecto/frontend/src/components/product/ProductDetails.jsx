import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

const ProductDetails = ({ product, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }
    //const [quantity, setQuantity] = useState(1);
    //const [activeTab, setActiveTab] = useState('description');
    /*const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        } else if (quantity > product.stock) {
            alert(` Stock insufieciente, la cantidad disponible es ${product.stock}`)
        }
    }*/

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fadeIn">
            <div className="bg-white  rounded-2xl max-w-4xl w-full max-h[90vh] overflow-y-auto relative p-8 flex flex-col md:flex-row gap-8">
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bolt">
                    &times;
                </button>
                <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-10">
                    <img src={product.imageUrl} className=" max-h-[400px] object-contain hover-scale-105 transition-transform duration-500 " alt={product.name} />
                </div>
                <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-bold text-geay-900">{product.name}</h2>
                    <p className="text-gray-500 text-sm "> SKU: {product.sku}</p>
                    <hr />
                    <p className="text-4xl font-entrabold text-red-600"> S/ {product.price}</p>
                    <p className="text-gray-700 ">{product.description}</p>
                    <hr />
                    <div className="flex items-center gap-4 pt-6">
                        <label className="font-bold  text-sm ">CANTIDAD:</label>
                        <input type="number" defaultValue={1} className="w-16 border p-2 rounded" />
                        <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl trasistion-all">
                            AÑADIR A LA BOLSA
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default ProductDetails;