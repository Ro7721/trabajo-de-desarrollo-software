import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Users, BarChart3, Settings, ShieldCheck, ShoppingBag, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../router/paths';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            navigate(PATHS.ADMIN.ROOT);
        } catch (err) {
            setError('Credenciales inválidas. Por favor intente de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    const adminOptions = [
        { icon: <Users size={20} />, label: 'Gestionar Usuarios' },
        { icon: <BarChart3 size={20} />, label: 'Ver Informes' },
        { icon: <Settings size={20} />, label: 'Configuración del Sistema' },
        { icon: <ShieldCheck size={20} />, label: 'Seguridad Avanzada' },
        { icon: <ShoppingBag size={20} />, label: 'Catálogo de Productos' },
        { icon: <MessageSquare size={20} />, label: 'Moderación de Comentarios' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
            {/* Contenedor Principal con Borde Arcoíris */}
            <div className="rainbow-border-container relative w-full max-w-5xl rounded-2xl p-[2px] shadow-2xl">

                <div className="relative z-10 flex flex-col md:flex-row w-full h-full min-h-[600px]">

                    {/* LADO IZQUIERDO: Panel de Administración */}
                    <div className="w-full md:w-5/12 p-8 border-r border-white/10 flex flex-col justify-center">
                        <h3 className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-8">
                            Panel de Administración
                        </h3>
                        <div className="space-y-4">
                            {adminOptions.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                                    <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <span className="text-gray-300 group-hover:text-black transition-colors">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LADO DERECHO: Formulario de Login */}
                    <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center rounded-xl bg-gray-500/40">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Bienvenido de vuelta</h2>
                            <p className="text-black text-lg ml-6">Ingrese a su cuenta para continuar</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm animate-pulse">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black text-lg ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black text-lg ml-1">Contraseña</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : (
                                    <>
                                        <span>Iniciar Sesión</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-gray-500">
                                ¿No tienes una cuenta? {' '}
                                <Link to={PATHS.REGISTER} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;