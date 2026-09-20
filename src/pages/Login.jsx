import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { AuthContext } from '../context/auth-context';

function LoginHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 lg:px-12 py-3 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="flex items-center gap-8">
        <a className="flex items-center gap-2.5 group" href="#">
          <span className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center text-surface shadow-[0_0_12px_rgba(79,219,200,0.5)]">
            <i className="fa-solid fa-gamepad text-dark-950 text-xl font-black"></i>
          </span>
          <span className="text-title-lg font-title-lg font-extrabold text-primary tracking-wider drop-shadow-[0_0_12px_rgba(79,219,200,0.4)]">
            Meta<span className="text-white">Sense</span>
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-container/20 text-primary border border-primary/30">
            PRO HUD
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface" href="#">Coaching</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface" href="#">Telemetry</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface" href="#">Replays</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface" href="#">Leaderboards</a>
          <a className="text-on-surface-variant font-label-lg transition-colors hover:text-on-surface" href="#">Pricing</a>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 relative" title="Notificaciones">
          <span className="material-symbols-outlined text-[20px]" data-icon="notifications">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
        </button>
        <div className="h-4 w-px bg-outline-variant/40 mx-1 hidden sm:block"></div>
        <a className="text-primary border-b-2 border-primary font-title-md pb-1 drop-shadow-[0_0_8px_rgba(79,219,200,0.5)]" href="#">Sign In</a>
        <a className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-md hover:bg-primary transition-colors duration-200 shadow-[0_0_12px_rgba(20,184,166,0.35)]" href="#">Book Session</a>
      </div>
    </header>
  );
}

function LoginFooter() {
  return (
    <footer className="w-full py-8 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-outline-variant/20 bg-surface-container-lowest mt-auto">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
        <span className="text-title-md font-title-md font-bold text-primary">Meta<span className="text-white">Sense</span></span>
        <p className="text-body-sm font-body-sm text-on-surface-variant">© 2025 MetaSense Technologies Inc. All rights reserved. Competitive telemetry & AI analytics engine.</p>
      </div>
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-200" href="#">Terms of Service</a>
        <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-200" href="#">Privacy Protocol</a>
        <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-200" href="#">Anti-Cheat Policy</a>
        <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-200" href="#">Trust & Safety</a>
        <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-200" href="#">Security Audits</a>
        <a className="text-on-surface-variant font-label-md hover:text-on-surface hover:text-primary transition-colors duration-200" href="#">API Documentation</a>
      </nav>
    </footer>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const loggedIn = loginUser(email, password);

    if (loggedIn) {
      alert('Inicio de sesión exitoso.');
      navigate('/home');
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-page dark bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container">
      
      <LoginHeader />

      {/* MAIN SPLIT SCREEN CANVAS */}
      <main className="flex-grow pt-16 lg:pt-20 flex flex-col justify-center relative overflow-hidden hud-grid">
        {/* Ambient decorative glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[128px]"></div>
        <div className="pointer-events-none absolute -bottom-40 right-10 w-96 h-96 bg-secondary-container/20 rounded-full blur-[140px]"></div>
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* LEFT COLUMN: LOGIN CARD INTERFACE */}
            <article className="lg:col-span-6 flex flex-col justify-center">
              <section className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                {/* Tactical Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"></div>
                
                {/* Header Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm bg-primary/15 text-primary border border-primary/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
                      ACCESO DE JUGADOR & COACH
                    </span>
                    <span className="text-label-sm text-outline font-label-sm uppercase tracking-wider">v3.4.2</span>
                  </div>
                  <h1 className="text-headline-md sm:text-headline-lg font-headline-lg text-on-surface tracking-tight">
                    Bienvenido de nuevo, invocador
                  </h1>
                  <p className="text-body-md font-body-md text-on-surface-variant mt-1.5">
                    Ingresa a tu cuenta para continuar con tus entrenamientos y VOD reviews.
                  </p>
                </div>

                {/* GAMER FAST OAUTH BUTTONS */}
                <fieldset className="space-y-2.5 mb-6">
                  <div className="grid grid-cols-3 gap-2.5">
                    <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-container-high/60 hover:bg-[#5865F2]/20 hover:border-[#5865F2]/60 border border-white/10 text-on-surface text-label-md font-label-md transition-all group duration-200" type="button">
                      <svg className="w-4 h-4 fill-[#5865F2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                      </svg>
                      <span>Discord</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-container-high/60 hover:bg-[#171a21]/80 hover:border-primary/50 border border-white/10 text-on-surface text-label-md font-label-md transition-all group duration-200" type="button">
                      <svg className="w-4 h-4 fill-[#c7d5e0] group-hover:fill-primary group-hover:scale-110 transition-all" viewBox="0 0 24 24">
                        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.005.105.005.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.71L.462 15.08C1.902 20.252 6.549 24 12.021 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zM8.366 17.51c0-.498.204-.951.533-1.28l-2.096-.867c-.244.629-.382 1.312-.382 2.03 0 .445.056.877.16 1.29l2.256-.931c-.302-.32-.471-.75-.471-1.242zm7.574-6.331c-1.256 0-2.274-1.018-2.274-2.274 0-1.257 1.018-2.274 2.274-2.274 1.257 0 2.274 1.017 2.274 2.274 0 1.256-1.017 2.274-2.274 2.274zm-5.74 6.331c0 .937.76 1.696 1.697 1.696.937 0 1.697-.759 1.697-1.696 0-.937-.76-1.697-1.697-1.697-.937 0-1.697.76-1.697 1.697z"></path>
                      </svg>
                      <span>Steam</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-container-high/60 hover:bg-[#eb0029]/20 hover:border-[#eb0029]/60 border border-white/10 text-on-surface text-label-md font-label-md transition-all group duration-200" type="button">
                      <svg className="w-4 h-4 fill-[#eb0029] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M13.414 1.707 0 7.828v8.344l13.414 6.121 10.586-4.825V6.532L13.414 1.707zm-1.127 3.01 7.854 3.58v7.406l-7.854 3.58-7.854-3.58V8.297l7.854-3.58z"></path>
                      </svg>
                      <span>Riot Games</span>
                    </button>
                  </div>
                </fieldset>

                {/* Separator */}
                <div className="relative flex py-2 items-center mb-6">
                  <div className="flex-grow border-t border-outline-variant/30"></div>
                  <span className="flex-shrink mx-4 text-label-sm font-label-sm text-outline uppercase tracking-wider">o con tu correo electrónico</span>
                  <div className="flex-grow border-t border-outline-variant/30"></div>
                </div>

                {/* Login Form */}
                <form className="space-y-4" onSubmit={handleLogin}>
                  {/* Email Input */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5" htmlFor="identifier">
                      Correo electrónico
                    </label>
                    <div className="relative rounded-lg neon-border-glow border border-white/10 bg-surface-container-lowest/80 transition-all duration-200">
                      <input className="block w-full px-4 py-2.5 bg-transparent border-0 text-on-surface text-body-md font-body-md placeholder-outline/60 focus:ring-0 rounded-lg" id="identifier" name="identifier" placeholder="Ingresar correo electrónico" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="password">
                        Contraseña
                      </label>
                      <a className="text-label-sm font-label-sm text-primary hover:text-primary-fixed hover:underline transition-colors" href="#">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <div className="relative rounded-lg neon-border-glow border border-white/10 bg-surface-container-lowest/80 transition-all duration-200">
                      <input 
                        className="block w-full px-4 pr-11 py-2.5 bg-transparent border-0 text-on-surface text-body-md font-body-md placeholder-outline/60 focus:ring-0 rounded-lg" 
                        id="password" 
                        name="password" 
                        placeholder="••••••••••••" 
                        required 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <button 
                        aria-label="Mostrar u ocultar contraseña" 
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Status */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input defaultChecked className="w-4 h-4 rounded bg-surface-container-lowest border-white/20 text-primary-container focus:ring-0 focus:ring-offset-0 transition-colors" type="checkbox" />
                      <span className="text-body-sm font-body-sm text-on-surface-variant">Mantener sesión iniciada</span>
                    </label>
                    <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                      <span className="hidden sm:inline">Servidores Operativos</span>
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <div className="pt-2">
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-label-lg font-bold teal-glow-btn transition-all duration-200" type="submit">
                      <span>Iniciar Sesión</span>
                    </button>
                  </div>

                  {/* Sign Up Prompt */}
                  <div className="text-center pt-3 border-t border-outline-variant/20">
                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                      ¿No tienes una cuenta aún? 
                      <a className="font-label-md text-primary hover:text-primary-fixed hover:underline transition-colors font-semibold ml-1" href="/register">
                        Regístrate gratis
                      </a>
                    </p>
                  </div>

                  {/* Escrow & Security Trust Seal */}
                </form>
              </section>
            </article>

            {/* RIGHT COLUMN: IMMERSIVE VISUAL ESPORTS PANEL */}
            <aside className="lg:col-span-6 flex flex-col" aria-label="Panel de analítica de esports">
              <div className="login-spotlight relative flex-grow rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 min-h-[460px] lg:min-h-full">
                <img alt="Jugador profesional de esports en torneo en vivo con auriculares" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85" />
                
                {/* Sophisticated HUD Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-surface-container-lowest/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none"></div>
                
                {/* Top HUD Badge Array */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md border border-white/15 text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    <span className="text-label-sm font-label-sm uppercase tracking-wider font-bold">ANALÍTICA EN TIEMPO REAL</span>
                  </div>
                  {/* Supported Titles */}
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container-highest/80 backdrop-blur-md border border-white/10 text-on-surface">LoL</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container-highest/80 backdrop-blur-md border border-white/10 text-primary">VALORANT</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container-highest/80 backdrop-blur-md border border-white/10 text-on-surface">CS2</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container-highest/80 backdrop-blur-md border border-white/10 text-secondary">APEX</span>
                  </div>
                </div>

                {/* Center/Bottom Strategic Content */}
                <div className="relative z-10 space-y-6 my-auto pt-16 sm:pt-24">
                  {/* Coach Quote Card */}
                  <div className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest/75 backdrop-blur-xl border border-white/10 relative">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[11px] font-bold tracking-wider uppercase border border-secondary/40">
                      COACH TIER: CHALLENGER
                    </div>
                    <div className="flex items-start gap-3 mt-1">
                      
                      <div>
                        <p className="text-body-lg font-title-md text-on-surface italic leading-snug">
                          "La diferencia entre Diamante y Challenger está en los detalles de tus VODs. Cada cooldown cuenta."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                            VX
                          </div>
                          <span className="text-label-md font-label-md text-on-surface-variant font-semibold">Vortex_Analyst</span>
                          <span className="text-outline text-label-sm">• Ex-Coach LEC</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Telemetry Floating Metric Chips */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md border border-white/10 hover:border-primary/40 transition-colors">
                      <div className="text-label-sm text-outline font-label-sm">Horas Entrenadas</div>
                      <div className="text-title-lg font-headline-sm text-primary mt-0.5 font-bold">+12,400</div>
                      <div className="text-[11px] text-tertiary flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[12px]" data-icon="trending_up">trending_up</span>
                        <span>+18% este mes</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md border border-white/10 hover:border-primary/40 transition-colors">
                      <div className="text-label-sm text-outline font-label-sm">Satisfacción</div>
                      <div className="text-title-lg font-headline-sm text-on-surface mt-0.5 font-bold">99.4%</div>
                      <div className="text-[11px] text-secondary flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[12px]" data-icon="star">star</span>
                        <span>5 estrellas</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md border border-white/10 hover:border-primary/40 transition-colors">
                      <div className="text-label-sm text-outline font-label-sm">Garantía Meta</div>
                      <div className="text-title-lg font-headline-sm text-primary mt-0.5 font-bold">Escrow</div>
                      <div className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[12px]" data-icon="lock_clock">lock_clock</span>
                        <span>Pago protegido</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Tactical Telemetry Bar */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-label-sm text-outline">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    IA Telemetry Engine v2.1 Activo
                  </span>
                  <span>Madrid, EUW Cluster</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}