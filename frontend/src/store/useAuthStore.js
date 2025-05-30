import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      users: [
        {
          fullName: "Admin",
          email: "admin@example.com",
          phone: "05550000000",
          password: "Admin123!",
          isAdmin: true,
        },
      ],
      currentUser: null,

      register: (newUser) => {
        const existing = get().users.find((u) => u.email === newUser.email);
        if (existing) {
          alert("Bu e-posta ile zaten kayıt olunmuş!");
          return false;
        }
        set((state) => {
          const updatedUsers = [...state.users, { ...newUser, isAdmin: false }];
          return {
            users: updatedUsers,
            currentUser: updatedUsers[updatedUsers.length - 1],
          };
        });

        alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
        return true;
      },
      login: ({ email, password }) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) {
          alert("E-posta ve şifre yanlış!");
          return;
        }
        set({ currentUser: user });
      },
      logout: () => set({ currentUser: null }),

      isAdmin: false,
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
