import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AdminUser } from "../types";

interface AdminStore {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

// Mock admin users for demo purposes
const mockAdminUsers: AdminUser[] = [
  {
    id: "admin-1",
    email: "admin@pizzadelight.com",
    name: "Admin User",
    role: "admin"
  },
  {
    id: "manager-1", 
    email: "manager@pizzadelight.com",
    name: "Manager User",
    role: "manager"
  },
  {
    id: "staff-1",
    email: "staff@pizzadelight.com", 
    name: "Staff User",
    role: "staff"
  }
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string): Promise<boolean> => {
        // Simple mock authentication - in real app this would call an API
        const user = mockAdminUsers.find(u => u.email === email);
        
        if (user && password === "admin123") {
          set({ 
            user, 
            isAuthenticated: true 
          });
          return true;
        }
        
        return false;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      checkAuth: () => {
        return get().isAuthenticated && get().user !== null;
      }
    }),
    {
      name: "admin-auth-storage"
    }
  )
);