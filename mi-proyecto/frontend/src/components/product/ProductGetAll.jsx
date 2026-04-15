import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Package,
  Plus,
  Search,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { getProducts } from "../../services/ProductService";

// Deriva el estado según stock
const getStatus = (stock) => {
  if (stock === 0) return "SIN_STOCK";
  if (stock <= 5) return "STOCK_BAJO";
  return "PUBLICADO";
};

const STATUS_STYLES = {
  PUBLICADO: { bg: "bg-emerald-100 text-emerald-700", label: "Publicado" },
  STOCK_BAJO: { bg: "bg-amber-100 text-amber-700", label: "Stock Bajo" },
  SIN_STOCK: { bg: "bg-red-100 text-red-600", label: "Sin Stock" },
  REVISIÓN: { bg: "bg-gray-100 text-gray-600", label: "En Revisión" },
};

const StatusBadge = ({ stock, statusOverride }) => {
  const key = statusOverride || getStatus(stock);
  const { bg, label } = STATUS_STYLES[key] || STATUS_STYLES["PUBLICADO"];
  return (
    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${bg}`}>
      {label}
    </span>
  );
};

// Skeleton de fila
const SkeletonRow = () => (
  <tr className="border-b border-gray-100 animate-pulse">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const PAGE_SIZE = 10;

const ProductGetAll = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Debounce: espera 350ms antes de lanzar la búsqueda al backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(0); // Resetear a página 1 al buscar
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch al backend cada vez que cambia página o búsqueda
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const filters = debouncedSearch ? { search: debouncedSearch } : {};
        const data = await getProducts(currentPage, PAGE_SIZE, filters);
        // Spring Boot Page<Product> devuelve { content, totalPages, totalElements, ... }
        setProducts(data.content ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotalElements(data.totalElements ?? 0);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudo conectar al servidor. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, debouncedSearch]);

  // Páginas visibles para paginación (máx 5)
  const visiblePages = useMemo(() => {
    const total = totalPages;
    const current = currentPage;
    const delta = 2;
    const range = [];
    for (let i = Math.max(0, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }
    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="flex min-h-screen bg-[#f4f6f8] text-[#4a4a4a] font-sans">
      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-4 md:p-8 overflow-y-auto">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                <Package size={22} className="text-[#addb30]" />
                Gestión de Productos
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {totalElements > 0 ? `${totalElements} productos en total` : "Cargando..."}
              </p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 bg-white">
              <div className="relative w-full md:w-96">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Buscar por nombre, SKU..."
                  className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#addb30] focus:border-[#addb30] outline-none transition-all bg-gray-50 focus:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-gray-50 transition-colors">
                  Exportar CSV
                </button>
                <button className="flex-1 md:flex-none bg-[#addb30] hover:bg-[#99c22a] text-black px-4 py-2 rounded-lg text-xs font-black uppercase shadow-sm flex items-center justify-center gap-2 transition-colors">
                  <Plus size={15} /> Crear Producto
                </button>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="flex items-center gap-3 p-4 m-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Producto", "Categoría", "SKU / Marca", "Precio Unit.", "Stock", "Estado", "Acciones"].map((h) => (
                      <th key={h} className="px-6 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading
                    ? [...Array(PAGE_SIZE)].map((_, i) => <SkeletonRow key={i} />)
                    : !error && products.length === 0
                      ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-16 text-center text-gray-400">
                            <Package size={36} className="mx-auto mb-3 text-gray-200" />
                            <p className="text-sm font-bold">No se encontraron productos</p>
                            <p className="text-xs mt-1">Intenta con otro término de búsqueda</p>
                          </td>
                        </tr>
                      )
                      : products.map((product) => (
                        <tr
                          key={product.idProduct}
                          className="hover:bg-blue-50/30 transition-colors group"
                        >
                          {/* Producto */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-11 w-11 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = "none"; }}
                                  />
                                ) : (
                                  <Package size={18} className="text-gray-300" />
                                )}
                              </div>
                              <p className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer leading-snug max-w-xs line-clamp-2">
                                {product.name}
                              </p>
                            </div>
                          </td>

                          {/* Categoría */}
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                              {product.category?.nameCategory ?? "—"}
                            </span>
                          </td>

                          {/* SKU / Marca */}
                          <td className="px-6 py-4">
                            <p className="text-sm font-mono text-gray-600">{product.sku ?? "—"}</p>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">{product.brand ?? ""}</p>
                          </td>

                          {/* Precio */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-gray-800">
                                S/ {Number(product.price ?? 0).toFixed(2)}
                              </span>
                              {product.discountPrice > 0 && (
                                <span className="text-[10px] font-bold text-emerald-600">
                                  -{product.discountPrice}% OFF
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Stock */}
                          <td className="px-6 py-4">
                            <span className={`text-sm font-bold ${product.stock === 0
                              ? "text-red-500"
                              : product.stock <= 5
                                ? "text-amber-500"
                                : "text-gray-700"
                              }`}>
                              {product.stock ?? 0} unid.
                            </span>
                          </td>

                          {/* Estado */}
                          <td className="px-6 py-4">
                            <StatusBadge stock={product.stock} statusOverride={product.status} />
                          </td>

                          {/* Acciones */}
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Editar"
                              >
                                <Edit size={15} />
                              </button>
                              <button
                                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">
                  Página {currentPage + 1} de {totalPages} &nbsp;·&nbsp; {totalElements} productos
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  {visiblePages.map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${p === currentPage
                        ? "bg-[#addb30] text-black shadow-sm"
                        : "hover:bg-gray-50 text-gray-600 border border-gray-200"
                        }`}
                    >
                      {p + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductGetAll;