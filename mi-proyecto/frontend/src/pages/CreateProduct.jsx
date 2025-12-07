import React, { useState, useEffect } from 'react';
import { createProduct, getCategories, uploadImage } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    // Estado inicial mapeado a tu entidad Java
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        description: '',
        price: '',          // BigDecimal en Java
        discountPrice: '',  // BigDecimal en Java
        stock: '',          // Integer en Java
        categoryId: '',     // Relación ManyToOne
        imageUrl: '',       // String URL
        isFeatured: false,  // boolean
        rating: 0,          // double (Opcional, inicializamos en 0)
        reviewCount: 0      // Integer (Inicializamos en 0)
    });

    useEffect(() => {
        getCategories()
            .then(data => setCategories(data))
            .catch(err => console.error("Error cargando categorías:", err));
    }, []);

    // --- MANEJO DE IMAGEN ---
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadImage(file);
            setFormData(prev => ({ ...prev, imageUrl: url }));
        } catch (error) {
            alert("Error al subir la imagen. Verifica que el Backend esté corriendo y acepte archivos grandes.");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    // --- MANEJO DE INPUTS ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // --- ENVÍO DEL FORMULARIO ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validaciones previas
        if (!formData.imageUrl) {
            alert("Debes subir una imagen antes de guardar.");
            return;
        }
        if (!formData.categoryId) {
            alert("Selecciona una categoría.");
            return;
        }
        if (!formData.price || isNaN(parseFloat(formData.price))) {
            alert("El precio debe ser un número válido.");
            return;
        }

        setLoadingSubmit(true);

        try {
            // 2. Construcción del Payload (Conversión de tipos para Java)
            const payload = {
                name: formData.name,
                description: formData.description,
                sku: formData.sku,
                imageUrl: formData.imageUrl,
                categoryId: formData.categoryId,
                featured: formData.isFeatured, // Java espera isFeatured o featured según el DTO

                // Conversiones numéricas críticas
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),

                // Opcionales (Mandar null si están vacíos para evitar errores)
                discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,

                // Valores por defecto
                rating: parseFloat(formData.rating) || 0.0,
                reviewCount: 0 // Al crear, nadie ha reseñado aún
            };

            console.log("Enviando payload:", payload); // Para depuración

            await createProduct(payload);
            alert('¡Producto registrado con éxito!');
            navigate('/');

        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Hubo un error al guardar. Revisa la consola.");
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Registrar Nuevo Producto</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* --- SECCIÓN 1: INFORMACIÓN BÁSICA --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Producto *</label>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej: Zapatillas Nike Air"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Código SKU *</label>
                        <input
                            required
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            placeholder="Ej: ZAP-001-NIKE"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                        />
                    </div>
                </div>

                {/* --- SECCIÓN 2: DESCRIPCIÓN --- */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción (Máx 300 carácteres)</label>
                    <textarea
                        name="description"
                        maxLength={300} // Límite de tu entidad Java
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Detalles del producto..."
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                    ></textarea>
                    <div className="text-right text-xs text-gray-400">
                        {formData.description.length}/300
                    </div>
                </div>

                {/* --- SECCIÓN 3: PRECIOS E INVENTARIO --- */}
                <div className="bg-gray-50 p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Precio Regular (S/) *</label>
                        <input
                            required
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Precio Oferta (Opcional)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="discountPrice"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Disponible *</label>
                        <input
                            required
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg"
                        />
                    </div>
                </div>

                {/* --- SECCIÓN 4: CATEGORÍA Y EXTRAS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría *</label>
                        <select
                            required
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg bg-white"
                        >
                            <option value="">-- Selecciona --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                            />
                            <span className="text-sm font-medium text-gray-700">¿Producto Destacado?</span>
                        </label>
                    </div>
                </div>

                {/* --- SECCIÓN 5: IMAGEN --- */}
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Imagen del Producto *</label>

                    {!formData.imageUrl ? (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={uploading}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
                            />
                            {uploading && <p className="text-blue-600 font-semibold mt-2 animate-pulse">Subiendo imagen al servidor...</p>}
                        </>
                    ) : (
                        <div className="relative inline-block mt-2">
                            <img
                                src={formData.imageUrl}
                                alt="Previsualización"
                                className="h-48 rounded-lg shadow-md object-contain bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
                                title="Cambiar imagen"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p className="text-xs text-green-600 font-bold mt-2">¡Imagen cargada correctamente!</p>
                        </div>
                    )}
                </div>

                {/* BOTÓN GUARDAR */}
                <button
                    type="submit"
                    disabled={uploading || loadingSubmit}
                    className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg transition transform hover:-translate-y-0.5"
                >
                    {loadingSubmit ? 'Guardando Producto...' : 'GUARDAR PRODUCTO'}
                </button>

            </form>
        </div>
    );
};

export default CreateProduct;