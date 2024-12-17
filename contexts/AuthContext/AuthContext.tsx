import identityApi from "@/utils/identity-api";
import { createContext, useContext, useState } from "react";
import { UserLogin } from "./UserLogin";
import { LoginResponse } from "./LoginResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { TOKEN_SECRET, FINANCES_API } from "@env";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userLogin: UserLogin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (userLogin: UserLogin) => {
    try {
      const userLoginBody = new URLSearchParams();
      userLoginBody.append("grant_type", "password");
      userLoginBody.append("username", "will");
      userLoginBody.append("password", "Will123$");
      userLoginBody.append("client_id", "postman");
      userLoginBody.append("client_secret", TOKEN_SECRET ?? "");
      userLoginBody.append("scope", "openid profile financeApp");

      const { access_token } = (
        await identityApi.post<LoginResponse>("/connect/token", userLoginBody, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      ).data;
      console.log(access_token);

      AsyncStorage.setItem("user_token", access_token);
      router.replace("/(tabs)");

      setIsAuthenticated(true);
    } catch (err: any) {
      console.error(err);
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("user_token");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
