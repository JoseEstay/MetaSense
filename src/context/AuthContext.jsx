import { useState } from 'react';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedSession = sessionStorage.getItem('authSession');
    const storedUser = localStorage.getItem('userData');

    if (!storedSession || !storedUser) {
      return null;
    }

    try {
      const session = JSON.parse(storedSession);
      const user = JSON.parse(storedUser);
      return session.email === user.correo ? session.token : null;
    } catch {
      return null;
    }
  });

  // Función para REGISTRAR (guarda en localStorage)
  const registerUser = (correo, contraseña) => {
    if (!correo || !contraseña) {
      return false;
    }

    const newUser = { correo, contraseña };
    localStorage.setItem('userData', JSON.stringify(newUser));
    sessionStorage.removeItem('authSession');
    localStorage.removeItem('authSession');
    localStorage.removeItem('isLoggedIn');
    setToken(null);
    return true; // Retorna true para saber que fue exitoso
  };

  // Función para LOGUEAR (compara con localStorage)
  const loginUser = (correo, contraseña) => {
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedUser = JSON.parse(storedData);
        if (parsedUser.correo === correo && parsedUser.contraseña === contraseña) {
          const sessionToken = crypto.randomUUID();
          setToken(sessionToken);
          sessionStorage.setItem('authSession', JSON.stringify({ email: correo, token: sessionToken }));
          return true; // Éxito
        }
      } catch {
        return false;
      }
    }
    return false; // Fallo
  };

  // Función para CERRAR SESIÓN
  const logoutUser = () => {
    setToken(null);
    sessionStorage.removeItem('authSession');
    localStorage.removeItem('authSession');
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ token, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}