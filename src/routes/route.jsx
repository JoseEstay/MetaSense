import { useContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from '../landing/Home';
import Login from '../pages/Login';
import Register from '../pages/register';
import { AuthContext } from '../context/auth-context';

function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-teal-400 text-sm font-bold tracking-widest">ERROR 404</p>
      <h1 className="text-4xl font-extrabold">Página no encontrada</h1>
      <p className="text-slate-400">Debes iniciar sesión con credenciales válidas para acceder al Home.</p>
    </main>
  );
}

function ProtectedHome() {
  const { token } = useContext(AuthContext);
  const storedSession = sessionStorage.getItem('authSession');
  const storedUser = localStorage.getItem('userData');
  let hasValidSession;

  try {
    const session = storedSession ? JSON.parse(storedSession) : null;
    const user = storedUser ? JSON.parse(storedUser) : null;
    hasValidSession = Boolean(token && session && user && session.token === token && session.email === user.correo);
  } catch {
    hasValidSession = false;
  }

  return hasValidSession ? <Home /> : <NotFound />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/register" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <ProtectedHome />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}