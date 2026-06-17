import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, Hash, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../router/paths';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        surName: '',
        dni: '',
        phone: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);
        try {
            await register(formData);
            navigate(PATHS.ADMIN.ROOT); // Redirigir al dashboard luego del registro
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error en el registro. Verifique sus datos e intente nuevamente.';
            // En el caso particular de spring validation errors
            if (err.response?.data?.errors) {
                const eMessages = Object.values(err.response.data.errors).join(' | ');
                setError(eMessages);
            } else {
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-500 p-4 py-12">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                {/* Form Card with Glassmorphism */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Crear una cuenta</h2>
                        <p className="text-gray-300 font-light">Complete el formulario para unirse a nuestra plataforma</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm break-words">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nombre */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">Nombres</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input type="text" name="firstName" required className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="Juan" value={formData.firstName} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Apellidos */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">Apellidos</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input type="text" name="surName" required className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="Pérez" value={formData.surName} onChange={handleChange} />
                                </div>
                            </div>

                            {/* DNI */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">DNI</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <Hash size={20} />
                                    </div>
                                    <input type="text" name="dni" required pattern="\d{8}" title="Debe tener 8 dígitos numéricos" className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="12345678" value={formData.dni} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">Teléfono</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <input type="tel" name="phone" required pattern="\d{9}" title="Debe tener 9 dígitos numéricos" className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="987654321" value={formData.phone} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Fecha de Nacimiento */}
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Fecha de Nacimiento</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <Calendar size={20} />
                                    </div>
                                    <input type="date" name="birthDate" required className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all [color-scheme:dark]" value={formData.birthDate} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input type="email" name="email" required className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="ejemplo@correo.com" value={formData.email} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Passwords */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">Contraseña</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input type="password" name="password" required className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300 ml-1">Confirmar Contraseña</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input type="password" name="confirmPassword" required className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-8 py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Registrarse Ahora</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-400 text-sm">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to={PATHS.LOGIN} className="text-purple-400 hover:text-purple-300 font-semibold underline decoration-2 decoration-transparent hover:decoration-purple-400 transition-all">
                            Inicia Sesión aquí
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
