import { create } from 'zustand';
import { persist } from "zustand/middleware";
import loginService from "../services/login";
import type { UserData } from "../types/user";

type Credentials = {
    username: string;
    password: string;
};

export type authState = {
  user: UserData | null,
  loginError: string | null
  
  login: (credentials: Credentials) => void,
  logout: () => void,
  restoreLogin: () => void,
}

// Usa funciones de loginService para controlar la autentificación, user queda global y
// se mantiene al refrescar la pagina
export const useAuthStore = create<authState>()(persist((set) => ({
  user: null,
  loginError: null,

  login: async (credentials: Credentials) => {
    try {
      const user = await loginService.login(credentials);
      set({ user: user, loginError: null });
    } catch {
      set({ loginError: "Wrong credentials" });
    }
  },

  logout: async () => { 
    await loginService.logout();
    set({ user: null });
  },

  restoreLogin: async () => {
    const user = await loginService.restoreLogin();
    set({ user: user });
  }
}), { name: "auth-storage" })); // se usa persist con auth-storage para no perder al user al recargar pagina