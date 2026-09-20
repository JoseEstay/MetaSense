import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
import { AuthContext } from '../context/auth-context';

export default function Register() {
  // --- Estados ---
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- Lógica de la barra de seguridad de contraseña ---
  const getPasswordStrength = () => {
    if (!password || password.length < 5) return 'weak';
    if (password.length < 9) return 'medium';
    return 'strong';
  };

  const strength = getPasswordStrength();

  const getStatusText = () => {
    if (strength === 'weak') return <span className="text-label-sm font-label-sm text-error">Seguridad: Débil</span>;
    if (strength === 'medium') return <span className="text-label-sm font-label-sm text-primary">Seguridad: Media</span>;
    return <span className="text-label-sm font-label-sm text-tertiary font-bold">Seguridad: Pro Máxima</span>;
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const registered = registerUser(email, password);

    if (registered) {
      alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="register-page bg-background text-on-background min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container font-body-md antialiased gaming-grid-bg dark">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 lg:px-12 py-3 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <a className="flex items-center gap-2" href="#">
            <span className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center text-surface shadow-[0_0_12px_rgba(79,219,200,0.5)]">
              <i className="fa-solid fa-gamepad text-dark-950 text-xl font-black"></i>
            </span>
            <span className="text-title-lg font-title-lg font-extrabold text-primary tracking-wider drop-shadow-[0_0_12px_rgba(79,219,200,0.4)]">
              Meta<span className="text-white">Sense</span>
            </span>
          </a>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-variant text-tertiary border border-outline-variant/50">
            v2.4 PRO
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface hover:text-primary" href="#">Coaching</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface hover:text-primary" href="#">Telemetry</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface hover:text-primary" href="#">Replays</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface hover:text-primary" href="#">Leaderboards</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface hover:text-primary" href="#">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-lg hover:bg-surface-container-high/40" title="Notificaciones">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <a className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary px-3 py-1.5 transition-colors" href="#signin">
            Sign In
          </a>
          <a className="hidden sm:flex items-center gap-1.5 bg-primary hover:bg-tertiary text-on-primary font-label-lg text-label-lg px-4 py-2 rounded-lg font-bold transition-all duration-200 teal-aura active:scale-95" href="#book">
            <span>Book Session</span>
          </a>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full pt-20 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1536px] mx-auto flex flex-col justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch my-auto">
          
          {/* LEFT COLUMN: Gamer Registration Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-surface-container-low/90 backdrop-blur-2xl border border-outline-variant/40 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-1/2 -right-24 w-60 h-60 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/70 border border-primary/30 text-primary text-label-sm font-label-sm uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  Plataforma Competitiva Verificada
                </div>
                <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight text-white">
                  Crea tu Cuenta de Jugador
                </h1>
                <p className="text-body-md font-body-md text-on-surface-variant mt-1.5">
                  Únete a miles de competidores y entrena con los mejores coaches del mundo en una suite analítica avanzada.
                </p>
              </div>

              {/* Role Toggle Selector */}
             

              {/* OAuth Fast Access Matrix */}
              <div className="relative z-10 mb-6">
                <p className="text-label-sm font-label-sm text-on-surface-variant/80 uppercase tracking-wider mb-3 font-semibold">
                  Acceso rápido con un clic
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-variant/40 hover:bg-[#5865F2]/20 border border-outline-variant/40 hover:border-[#5865F2]/60 text-on-surface font-label-md text-label-md transition-all duration-200 group" type="button">
                    <svg className="w-4 h-4 fill-[#5865F2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                    </svg>
                    <span>Discord</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-variant/40 hover:bg-[#171a21]/80 border border-outline-variant/40 hover:border-slate-400/60 text-on-surface font-label-md text-label-md transition-all duration-200 group" type="button">
                    <svg className="w-4 h-4 fill-[#c7d5e0] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.524-4.524 4.524h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.733L.438 14.86C1.948 20.088 6.707 24 12.384 24c6.627 0 12-5.373 12-12S18.606 0 11.979 0zM7.54 18.21c-.378-.154-.698-.415-.924-.746l-1.921-.794c.484 1.107 1.579 1.87 2.845 1.87.525 0 1.018-.135 1.455-.365l-1.455-2.091zm8.4-11.536c-1.255 0-2.274 1.018-2.274 2.274 0 1.255 1.019 2.274 2.274 2.274 1.255 0 2.274-1.019 2.274-2.274 0-1.256-1.019-2.274-2.274-2.274z"></path>
                    </svg>
                    <span>Steam</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-variant/40 hover:bg-[#d13639]/20 border border-outline-variant/40 hover:border-[#d13639]/60 text-on-surface font-label-md text-label-md transition-all duration-200 group" type="button">
                    <svg className="w-4 h-4 fill-[#d13639] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M13.23 2.05L1.5 8.76v5.82l3.47 1.99V10.2l8.26-4.73zm-4.79 9.87l-3.47 1.98v5.82l3.47-1.99zm14.06-3.16l-8.26 4.73v5.82l8.26-4.73zm-9.28 5.32l-3.47 1.98v5.82l3.47-1.99z"></path>
                    </svg>
                    <span>Riot ID</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative z-10 flex items-center gap-3 my-6">
                <div className="flex-1 border-t border-outline-variant/30"></div>
                <span className="text-body-sm font-body-sm text-outline uppercase tracking-wider text-xs">
                  o regístrate con tus datos
                </span>
                <div className="flex-1 border-t border-outline-variant/30"></div>
              </div>

              {/* Native Form Fields */}
              <form className="relative z-10 space-y-4" onSubmit={handleRegister}>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5" htmlFor="email">
                    Correo Electrónico <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <input className="w-full px-3 py-2.5 bg-surface-container-high/60 border border-outline-variant/60 rounded-lg text-white font-body-md placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150" id="email" placeholder="pro@esports-team.com" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                  </div>
                </div>

                {/* Password with Strength Meter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-label-md font-label-md text-on-surface-variant" htmlFor="password">
                      Contraseña Segura <span className="text-primary">*</span>
                    </label>
                    {getStatusText()}
                  </div>
                  <div className="relative">
                    <input 
                      className="w-full px-3 pr-10 py-2.5 bg-surface-container-high/60 border border-outline-variant/60 rounded-lg text-white font-body-md placeholder:text-outline/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150" 
                      id="password" 
                      placeholder="Mínimo 8 caracteres, números y símbolos" 
                      required 
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" 
                      onClick={() => setShowPassword(!showPassword)} 
                      type="button"
                    >
                      <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  
                  {/* Password Strength Bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-surface-variant overflow-hidden">
                      <div className={`h-full w-full transition-all duration-300 ${strength === 'weak' ? 'bg-error' : 'bg-primary'}`}></div>
                    </div>
                    <div className="flex-1 h-1.5 rounded-full bg-surface-variant overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strength === 'weak' ? 'w-0' : 'w-full bg-primary'}`}></div>
                    </div>
                    <div className="flex-1 h-1.5 rounded-full bg-surface-variant overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strength === 'strong' ? 'w-full bg-tertiary' : 'w-0'}`}></div>
                    </div>
                    <span className="text-label-sm font-label-sm font-bold text-primary pl-1">PRO</span>
                  </div>
                </div>

                {/* Escrow & Terms Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input defaultChecked className="mt-1 w-4 h-4 rounded border-outline-variant/80 bg-surface-container-lowest text-primary-container focus:ring-primary focus:ring-offset-0 focus:ring-1 transition-all" required type="checkbox" />
                    <span className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed select-none">
                      Acepto los <a className="text-primary hover:underline font-medium" href="#">Términos del Servicio</a> y confirmo la <a className="text-primary hover:underline font-medium" href="#">Política de Protección de Fondos Escrow</a> (garantía de sesión completada antes de liberar el pago al coach).
                    </span>
                  </label>
                </div>

                <button className="w-full mt-2 py-3.5 px-6 rounded-xl font-headline-sm text-headline-sm font-bold bg-primary-container hover:bg-tertiary text-on-primary-container transition-all duration-200 shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_35px_rgba(79,219,200,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer" type="submit">
                  <span>Crear Cuenta y Comenzar</span>
                </button>
                
                <div className="text-center pt-2">
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    ¿Ya tienes una cuenta? 
                    <a className="text-primary hover:text-tertiary-fixed font-title-md font-bold transition-colors ml-1 inline-flex items-center gap-1" href="#signin">
                      <span>Iniciar Sesión</span>
                      <span className="material-symbols-outlined text-sm" data-icon="login">login</span>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Community, Verified Coach Spotlight */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="register-spotlight relative rounded-2xl overflow-hidden border border-outline-variant/50 bg-surface-container-low/70 backdrop-blur-xl shadow-2xl flex-1 flex flex-col justify-end group min-h-[440px]">
              <div className="absolute inset-0 z-0">
                <img alt="Estación de gaming competitiva con iluminación de esports" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" loading="eager" src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
              </div>
              
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-2 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/40 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span>
                  <span className="text-label-sm font-label-sm font-bold text-tertiary uppercase tracking-wider">Apex Pro Coach Activa</span>
                </div>
                <div className="flex items-center gap-1.5 bg-secondary-container/90 backdrop-blur-md text-secondary-fixed text-label-sm font-label-sm font-bold px-3 py-1.5 rounded-full border border-secondary/40 shadow-lg">
                  <span className="material-symbols-outlined text-sm" data-icon="verified">verified</span>
                  <span>Top 500 Predator</span>
                </div>
              </div>
              
              <div className="relative z-10 p-6 sm:p-8 bg-gradient-to-t from-surface-container-lowest to-transparent">
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-title-lg font-title-lg font-bold text-white flex items-center gap-1.5">
                        Elena "Valk" Tanaka
                        <span className="material-symbols-outlined text-primary text-base" data-icon="check_circle">check_circle</span>
                      </h3>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">
                        Head Coach en Eclipse Gaming • +420 alumnos guiados
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-surface-container/80 backdrop-blur-md border border-outline-variant/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <span className="material-symbols-outlined text-lg" data-icon="trending_up">trending_up</span>
                      <span className="text-headline-sm font-headline-sm font-bold text-white">+2 Divs</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-on-surface-variant leading-tight">
                      Subida promedio en los primeros 30 días de telemetry.
                    </p>
                  </div>
                  <div className="bg-surface-container/80 backdrop-blur-md border border-outline-variant/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 text-secondary mb-1">
                      <span className="material-symbols-outlined text-lg" data-icon="security">security</span>
                      <span className="text-headline-sm font-headline-sm font-bold text-white">100% Escrow</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-on-surface-variant leading-tight">
                      Protección garantizada o reembolso inmediato del fondo.
                    </p>
                  </div>
                </div>
                
                <div className="bg-surface-container-high/60 backdrop-blur-md border-l-2 border-primary border-t border-r border-b border-outline-variant/20 rounded-lg p-3">
                  <div className="flex items-center justify-between text-label-sm font-label-sm text-outline mb-1">
                    <span className="text-primary font-bold">Feedback de Sesión 1-a-1</span>
                    <span>Ayer, 21:30</span>
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface italic">
                    "En solo 3 sesiones con Elena ajustamos mi positioning en late ring y pasé de estancado en Platino a Master. Las métricas de daño por minuto son brutales."
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-label-sm font-label-sm font-semibold text-white">Carlos 'K4OS' R. (Alumno Verificado)</span>
                    <div className="flex text-primary">
                      <span className="material-symbols-outlined text-sm register-rating-star">star</span>
                      <span className="material-symbols-outlined text-sm register-rating-star">star</span>
                      <span className="material-symbols-outlined text-sm register-rating-star">star</span>
                      <span className="material-symbols-outlined text-sm register-rating-star">star</span>
                      <span className="material-symbols-outlined text-sm register-rating-star">star</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-outline-variant/20 bg-surface-container-lowest">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-title-md font-title-md font-bold text-primary">Meta<span className="text-white">Sense</span></span>
          <span className="hidden sm:inline text-outline">•</span>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            © 2025 MetaSense Technologies Inc. All rights reserved. Competitive telemetry & analytics engine.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-150" href="#">Terms of Service</a>
          <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-150" href="#">Privacy Protocol</a>
          <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-150" href="#">Anti-Cheat Policy</a>
          <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-150" href="#">Trust & Safety</a>
          <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-150" href="#">Security Audits</a>
          <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-150" href="#">API Documentation</a>
        </nav>
      </footer>
    </div>
  );
}