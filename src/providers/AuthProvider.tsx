import { getCookie, setCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  userId: number | null;
  updateUser: (id: number) => void;
}>({
  userId: null,
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const idFromCookie = getCookie("userId");
    if (idFromCookie) {
      setUserId(Number(idFromCookie));
    }
  }, [userId]);

  const updateUser = (id: number) => {
    setCookie("userId", id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    });
    setUserId(id);
  };

  return (
    <AuthContext.Provider value={{ userId, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
