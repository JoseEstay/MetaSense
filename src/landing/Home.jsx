import { useState, useMemo } from 'react';
import '../styles/index.css';
import coaches from '../data/coaches';

const games = ["Todos", "League of Legends", "Valorant", "CS2", "Fortnite", "Apex Legends"];

// --- Helper Components ---
const RankBadge = ({ game, rank }) => {
    let colorClass = "bg-teal-500/10 text-teal-400 border-teal-500/30";
    if (game === "League of Legends") colorClass = "bg-amber-500/10 text-amber-400 border-amber-500/30";
    else if (game === "Valorant") colorClass = "bg-rose-500/10 text-rose-400 border-rose-500/30";
    else if (game === "CS2") colorClass = "bg-orange-500/10 text-orange-400 border-orange-500/30";
    else if (game === "Fortnite") colorClass = "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30";
    else if (game === "Apex Legends") colorClass = "bg-red-500/10 text-red-400 border-red-500/30";

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass}`}>
            {rank}
        </span>
    );
};

export default function App() {
    // --- State ---
    const [selectedGame, setSelectedGame] = useState("Todos");
    const [maxPrice, setMaxPrice] = useState(50);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [activeModal, setActiveModal] = useState(null); // null, 'booking', 'payment'
    const [selectedCoachId, setSelectedCoachId] = useState(null);

    // --- Derived State ---
    const filteredCoaches = useMemo(() => {
        return coaches.filter(coach => {
            const matchGame = selectedGame === "Todos" || coach.game === selectedGame;
            const matchPrice = coach.price <= maxPrice;
            const query = searchQuery.toLowerCase();
            const matchSearch = coach.name.toLowerCase().includes(query) || 
                                coach.realName.toLowerCase().includes(query) ||
                                coach.role.toLowerCase().includes(query) ||
                                (selectedGame === "Todos" && coach.game.toLowerCase().includes(query)) ||
                                coach.tags.some(tag => tag.toLowerCase().includes(query));
            return matchGame && matchPrice && matchSearch;
        });
    }, [selectedGame, maxPrice, searchQuery]);

    const activeCoach = coaches.find(c => c.id === selectedCoachId);

    // --- Actions ---
    const resetFilters = () => {
        setSelectedGame("Todos");
        setMaxPrice(50);
        setSearchQuery("");
    };

    const openBooking = (id) => {
        setSelectedCoachId(id);
        setActiveModal('booking');
    };

    const processPayment = () => {
        setActiveModal('payment');
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedCoachId(null);
    };

    return (
        <div className="landing-page antialiased min-h-screen flex flex-col selection:bg-brand-500 selection:text-white bg-[#090d16] text-[#f8fafc]">
            {/* Navbar */}
            <nav className="fixed w-full z-40 glass-panel border-b border-gray-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center text-surface shadow-[0_0_12px_rgba(79,219,200,0.5)]">
                                <i className="fa-solid fa-gamepad text-dark-950 text-xl font-black"></i>
                            </div>
                            <span className="text-title-lg font-title-lg font-extrabold text-primary tracking-wider drop-shadow-[0_0_12px_rgba(79,219,200,0.4)]">Meta<span className="text-white">Sense</span></span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#coaches-container" className="text-white hover:text-brand-400 text-sm font-medium transition-colors flex items-center gap-2">
                                <i className="fa-solid fa-compass text-brand-400"></i> Explorar Coaches
                            </a>
                            <a href="#" className="text-gray-300 hover:text-brand-400 text-sm font-medium transition-colors flex items-center gap-2">
                                <i className="fa-solid fa-video text-teal-400"></i> VOD Reviews
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
                                <i className="fa-solid fa-shield-halved text-brand-400"></i> Garantía Escrow
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brand-400 text-sm font-medium transition-colors">Conviértete en Coach</a>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow pt-16">
                {/* Hero & Filters */}
                <div className="relative overflow-hidden bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 pt-16 pb-14 md:pt-24 md:pb-20 border-b border-gray-800/60">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-500/15 rounded-full filter blur-[120px]"></div>
                        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full filter blur-[120px]"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6">
                            <i className="fa-solid fa-bolt"></i> +12,400 Horas de Entrenamiento Impartidas
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
                            Domina el Meta.<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-teal-300 to-purple-400">Aprende de Coaches Pro Reales.</span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 mb-10 leading-relaxed font-normal">
                            Reserva sesiones 1-a-1 o análisis de VODs con jugadores de élite verificados. Tu pago se custodia con <span className="text-brand-400 font-semibold">Garantía Escrow</span> hasta que la sesión termine con éxito.
                        </p>
                        
                        {/* Search & Filters */}
                        <div className="glass-panel p-4 md:p-5 rounded-2xl max-w-4xl mx-auto shadow-2xl flex flex-col md:flex-row gap-4 items-center relative z-10">
                            <div className="w-full md:w-5/12 relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Buscar por coach, juego o rol..." 
                                    className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            <div className="w-full md:w-4/12 relative">
                                <select 
                                    value={selectedGame}
                                    onChange={(e) => setSelectedGame(e.target.value)}
                                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700/80 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none text-sm cursor-pointer"
                                >
                                    {games.map(game => (
                                        <option key={game} value={game}>
                                            {game === 'Todos' ? '🎮 Todos los Juegos' : game}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                    <i className="fa-solid fa-chevron-down text-xs"></i>
                                </div>
                            </div>

                            <div className="w-full md:w-3/12 flex items-center gap-3 px-2 bg-dark-900/60 py-2 rounded-xl border border-gray-800">
                                <span className="text-xs text-gray-400 whitespace-nowrap">Máx:</span>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="60" 
                                    value={maxPrice} 
                                    className="w-full accent-brand-400 cursor-pointer h-1.5 bg-gray-700 rounded-lg" 
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                                <span className="font-bold text-brand-400 text-sm min-w-[3rem] text-right">${maxPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coaches Container */}
                <div id="coaches-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2.5 text-white">
                                <i className="fa-solid fa-fire text-brand-400"></i> Coaches Destacados Verificados
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">Descubre perfiles profesionales con experiencia comprobada en alta competición</p>
                        </div>
                        <div className="text-xs text-gray-400 bg-dark-800/60 px-3 py-1.5 rounded-lg border border-gray-800">
                            Mostrando <span className="font-bold text-brand-400">{filteredCoaches.length}</span> coaches disponibles
                        </div>
                    </div>

                    {filteredCoaches.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-dark-800 flex items-center justify-center text-gray-600">
                                <i className="fa-solid fa-ghost text-4xl"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-300">No se encontraron coaches</h3>
                            <p className="text-gray-500 mt-2 text-sm">Intenta ajustar tus filtros de búsqueda o restablecer el juego seleccionado.</p>
                            <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-brand-400 rounded-lg text-sm font-semibold border border-brand-500/30 transition-all">
                                Restablecer Filtros
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {filteredCoaches.map(coach => (
                                <div key={coach.id} className="bg-dark-850 border border-gray-800 rounded-2xl overflow-hidden hover:border-brand-500/40 card-glow transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl group flex flex-col justify-between">
                                    <div>
                                        {/* Banner */}
                                        <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${coach.bannerGradient}`}>
                                            <div className="absolute inset-0 bg-dark-950/40 backdrop-blur-[2px]"></div>
                                            
                                            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                                                <span className="bg-dark-900/80 backdrop-blur-md text-gray-200 border border-gray-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                                    <i className="fa-solid fa-gamepad text-brand-400"></i> {coach.game}
                                                </span>
                                            </div>

                                            {coach.isVIP ? (
                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-dark-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1.5">
                                                    <i className="fa-solid fa-crown text-[10px]"></i> COACH VIP
                                                </div>
                                            ) : (
                                                <div className="absolute top-3 right-3 bg-dark-900/80 backdrop-blur-md text-teal-400 border border-teal-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full z-10 flex items-center gap-1">
                                                    <i className="fa-solid fa-award"></i> {coach.badge}
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3">
                                                <div className="relative">
                                                    <img src={coach.image} alt={coach.name} className="w-28 h-28 rounded-full border-4 border-dark-850 object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-dark-850 flex items-center justify-center" title="Online / Disponible">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Details */}
                                        <div className="p-6 pt-12 text-center">
                                            <div className="flex items-center justify-center gap-1.5 mb-0.5">
                                                <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                                                <i className="fa-solid fa-circle-check text-brand-400 text-sm" title="Coach Verificado Oficial"></i>
                                            </div>
                                            <p className="text-xs text-gray-400 mb-2">{coach.realName} • {coach.role}</p>
                                            
                                            <div className="mb-3">
                                                <RankBadge game={coach.game} rank={coach.rank} />
                                            </div>

                                            <div className="flex justify-center items-center gap-2 mb-4 text-xs">
                                                <div className="flex items-center text-amber-400 gap-1 font-bold">
                                                    <i className="fa-solid fa-star"></i>
                                                    <span className="text-white">{coach.rating}</span>
                                                </div>
                                                <span className="text-gray-500">•</span>
                                                <span className="text-gray-400">{coach.reviews} reseñas</span>
                                                <span className="text-gray-500">•</span>
                                                <span className="text-emerald-400 font-medium">{coach.studentsCount} alumnos</span>
                                            </div>

                                            <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed mb-4 px-2">
                                                {coach.description}
                                            </p>

                                            <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                                                {coach.tags.map((tag, idx) => (
                                                    <span key={idx} className="bg-dark-800 text-gray-300 border border-gray-700/60 text-[11px] px-2 py-0.5 rounded-md font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Action */}
                                    <div className="px-6 pb-5 pt-3 border-t border-gray-800/80 bg-dark-900/40">
                                        <div className="flex items-center justify-between">
                                            <div className="text-left">
                                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Tarifa por hora</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl font-extrabold text-white">${coach.price}</span>
                                                    <span className="text-xs text-gray-400 font-normal">USD</span>
                                                </div>
                                            </div>
                                            <button onClick={() => openBooking(coach.id)} className="bg-brand-500/10 hover:bg-brand-500 text-brand-400 hover:text-dark-950 border border-brand-500/40 hover:border-brand-500 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group-hover:bg-brand-500 group-hover:text-dark-950">
                                                <span>Ver Perfil</span>
                                                <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-dark-950 border-t border-gray-800/80 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center text-surface shadow-[0_0_12px_rgba(79,219,200,0.5)]">
                                <i className="fa-solid fa-gamepad text-dark-950 text-xl font-black"></i>
                            </div>
                            <span className="text-title-lg font-title-lg font-extrabold text-primary tracking-wider drop-shadow-[0_0_12px_rgba(79,219,200,0.4)]">Meta<span className="text-white">Sense</span></span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">El marketplace definitivo para llevar tus habilidades competitivas al siguiente nivel con expertos comprobados en la escena profesional.</p>
                        <div className="flex items-center gap-3 mt-4 text-gray-400">
                            <a href="#" className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center hover:text-brand-400 hover:bg-dark-700 transition-colors"><i className="fa-brands fa-discord"></i></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center hover:text-brand-400 hover:bg-dark-700 transition-colors"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center hover:text-brand-400 hover:bg-dark-700 transition-colors"><i className="fa-brands fa-twitch"></i></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center hover:text-brand-400 hover:bg-dark-700 transition-colors"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Plataforma</h3>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Buscar Coaches</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Sesiones 1-a-1 en Vivo</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Análisis de Replays VOD</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Planes de Entrenamiento</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Para Coaches</h3>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Aplica como Coach Pro</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Panel de Control & Horarios</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Membresía VIP Destacada</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Comunidad de Analistas</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Confianza & Soporte</h3>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Pagos Seguros (Escrow)</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Garantía de Satisfacción 100%</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Términos del Servicio</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Soporte 24/7 Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800/80 text-center text-xs text-gray-500">
                    © 2026 MetaSense Technologies Inc. Diseñado para gamers competitivos de alto rendimiento.
                </div>
            </footer>

            {/* Modals */}
            {activeModal === 'booking' && activeCoach && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" onClick={closeModal}>
                    <div className="bg-dark-900 border border-gray-700/80 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative" onClick={e => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 w-9 h-9 flex items-center justify-center bg-dark-950/80 hover:bg-dark-800 rounded-full border border-gray-700 transition-colors">
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="w-full md:w-1/2 p-8 bg-dark-950/80 border-r border-gray-800 flex flex-col justify-between">
                            <div>
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative">
                                        <img src={activeCoach.image} className="w-20 h-20 rounded-2xl border-2 border-brand-400 object-cover shadow-xl" alt="Coach" />
                                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-dark-950"></span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-bold text-white">{activeCoach.name}</h2>
                                            <i className="fa-solid fa-circle-check text-brand-400"></i>
                                        </div>
                                        <p className="text-xs text-gray-400">{activeCoach.realName} • {activeCoach.role}</p>
                                        <div className="mt-2">
                                            <RankBadge game={activeCoach.game} rank={activeCoach.rank} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 p-3 bg-dark-900 rounded-2xl border border-gray-800 mb-6 text-center">
                                    <div className="p-1.5">
                                        <p className="text-[11px] text-gray-400 font-medium">Winrate</p>
                                        <p className="text-sm font-extrabold text-emerald-400">{activeCoach.stats.winrate}</p>
                                    </div>
                                    <div className="p-1.5 border-x border-gray-800">
                                        <p className="text-[11px] text-gray-400 font-medium">Sesiones</p>
                                        <p className="text-sm font-extrabold text-white">{activeCoach.stats.hoursCoached}</p>
                                    </div>
                                    <div className="p-1.5">
                                        <p className="text-[11px] text-gray-400 font-medium">Mejora</p>
                                        <p className="text-sm font-extrabold text-brand-400">{activeCoach.stats.rankJump}</p>
                                    </div>
                                </div>
                                
                                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                                    <i className="fa-solid fa-user-tie text-brand-400"></i> Metodología de Coaching
                                </h3>
                                <p className="text-gray-300 text-xs leading-relaxed mb-6 font-normal">
                                    {activeCoach.description}
                                </p>
                                
                                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                                    <i className="fa-solid fa-bullseye text-teal-400"></i> Áreas Clave
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {activeCoach.tags.map((tag, idx) => (
                                        <span key={idx} className="bg-brand-950/70 text-brand-400 border border-brand-500/30 text-xs px-3 py-1 rounded-lg font-medium">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-dark-900 p-4 rounded-2xl flex items-center justify-between border border-gray-800">
                                <div>
                                    <p className="text-xs text-gray-400">Puntuación de Alumnos</p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="text-amber-400 text-sm">
                                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                        </div>
                                        <span className="font-bold text-white text-sm">{activeCoach.rating}</span>
                                        <span className="text-xs text-gray-500">({activeCoach.reviews})</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-brand-400">${activeCoach.price}</p>
                                    <p className="text-[11px] text-gray-400 font-medium">USD / hora</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-dark-900">
                            <div>
                                <h3 className="text-xl font-extrabold text-white mb-1">Reserva tu Sesión</h3>
                                <p className="text-xs text-gray-400 mb-6">Selecciona el formato y horario para tu sesión personalizada.</p>
                                
                                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Formato de Entrenamiento</label>
                                <div className="space-y-2.5 mb-6">
                                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-brand-500 bg-brand-500/5 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="sessionType" defaultChecked className="accent-brand-400" />
                                            <div>
                                                <p className="text-sm font-bold text-white">Análisis VOD + Feedback (1 hr)</p>
                                                <p className="text-xs text-gray-400">Revisión de partida grabada con apuntes de macro</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-white">${activeCoach.price}</span>
                                    </label>
                                    
                                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-800 hover:border-gray-700 bg-dark-950 cursor-pointer transition-colors">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="sessionType" className="accent-brand-400" />
                                            <div>
                                                <p className="text-sm font-bold text-white">Live Coaching en Tiempo Real (1 hr)</p>
                                                <p className="text-xs text-gray-400">Voz en Discord guiando tus decisiones en vivo</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-white">${activeCoach.price}</span>
                                    </label>

                                    <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-800 hover:border-gray-700 bg-dark-950 cursor-pointer transition-colors">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="sessionType" className="accent-brand-400" />
                                            <div>
                                                <p className="text-sm font-bold text-white">Pack Dúo Competitivo (2 hrs)</p>
                                                <p className="text-xs text-gray-400">Live play + análisis posterior intensivo</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-white">${activeCoach.price * 2 - 5}</span>
                                    </label>
                                </div>

                                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Horarios Disponibles</label>
                                <div className="grid grid-cols-3 gap-2.5 mb-6">
                                    <button className="bg-brand-500/15 border-2 border-brand-500 text-brand-400 rounded-xl p-2.5 text-xs font-bold text-center">
                                        Hoy<br/><span className="text-white text-xs">18:00 CET</span>
                                    </button>
                                    <button className="bg-dark-950 border border-gray-800 hover:border-gray-600 text-gray-300 rounded-xl p-2.5 text-xs font-medium text-center transition-colors">
                                        Mañana<br/><span className="text-gray-400 text-xs">15:30 CET</span>
                                    </button>
                                    <button className="bg-dark-950 border border-gray-800 hover:border-gray-600 text-gray-300 rounded-xl p-2.5 text-xs font-medium text-center transition-colors">
                                        Viernes<br/><span className="text-gray-400 text-xs">20:00 CET</span>
                                    </button>
                                </div>

                                <div className="bg-gradient-to-r from-brand-950/60 to-dark-950 border border-brand-500/30 rounded-2xl p-4 flex items-start gap-3.5 mb-6">
                                    <div className="bg-brand-500/20 p-2.5 rounded-xl text-brand-400 shrink-0">
                                        <i className="fa-solid fa-shield-halved text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-400 text-xs uppercase tracking-wide">Fondos en Custodia Escrow</h4>
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Tu pago no se transfiere al coach hasta que confirmas que la sesión se llevó a cabo y estás 100% satisfecho con la enseñanza.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-400 font-medium">Monto a retener en Escrow:</span>
                                    <span className="text-2xl font-black text-white">${activeCoach.price}.00 <span className="text-xs text-gray-500 font-normal">USD</span></span>
                                </div>
                                <button onClick={processPayment} className="w-full bg-gradient-to-r from-brand-500 to-teal-400 hover:from-brand-600 hover:to-teal-500 text-dark-950 font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-brand-500/25 flex justify-center items-center gap-2 text-sm transform hover:scale-[1.01]">
                                    <i className="fa-solid fa-lock"></i> Continuar con Pago Seguro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === 'payment' && activeCoach && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={closeModal}>
                    <div className="bg-dark-900 border border-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8 text-center animate-fade-in" onClick={e => e.stopPropagation()}>
                        <div className="w-20 h-20 bg-brand-500/15 border border-brand-500/40 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/10">
                            <i className="fa-solid fa-check text-3xl text-brand-400"></i>
                        </div>
                        <h2 className="text-2xl font-extrabold text-white mb-2">¡Reserva Asegurada!</h2>
                        <p className="text-gray-300 text-sm mb-6">Tus fondos están protegidos en depósito Escrow. Tienes una cita programada con <span className="text-brand-400 font-bold">{activeCoach.name}</span> ({activeCoach.realName}).</p>
                        
                        <div className="bg-dark-950 p-4 rounded-2xl text-left mb-6 text-xs text-gray-300 border border-gray-800/80 space-y-2.5">
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-calendar-check text-brand-400 w-4"></i>
                                <span><strong>Fecha:</strong> Hoy a las 18:00 CET</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-headset text-brand-400 w-4"></i>
                                <span><strong>Canal:</strong> Discord Voice Room #MetaCoach-Private</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-shield-check text-teal-400 w-4"></i>
                                <span><strong>Estado Escrow:</strong> Bloqueado hasta aprobación del alumno</span>
                            </div>
                        </div>

                        <button onClick={closeModal} className="w-full bg-dark-800 hover:bg-dark-700 text-white font-bold py-3 px-4 rounded-xl transition-all border border-gray-700 text-sm">
                            Volver al Directorio de Coaches
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}