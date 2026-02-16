import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiClient, {
  clearSession,
  getAccessToken,
  getStoredUser,
  storeSession,
} from "../services/apiClient";

const UserContext = createContext({
  user: null,
  status: "idle",
  setUser: () => {},
  refreshUser: async () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [status, setStatus] = useState(user ? "loaded" : "idle");

  const persistUserLocally = useCallback(
    (nextUser) => {
      setUser(nextUser);
      setStatus(nextUser ? "loaded" : "idle");
      const token = getAccessToken();
      if (token && nextUser) {
        storeSession(token, nextUser);
      }
    },
    []
  );

  const refreshUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setStatus("idle");
      setUser(null);
      return null;
    }

    setStatus("loading");
    try {
      const { data } = await apiClient.get("/api/profile");
      if (data?.profile) {
        persistUserLocally(data.profile);
        setStatus("loaded");
        return data.profile;
      }
      setStatus("idle");
      return null;
    } catch (error) {
      console.error("Failed to refresh user", error);
      setStatus("error");
      return null;
    }
  }, [persistUserLocally]);

  useEffect(() => {
    if (!user) {
      refreshUser();
    }
  }, [user, refreshUser]);

  useEffect(() => {
    const handleUserUpdated = (event) => {
      if (event.detail) {
        setUser(event.detail);
      }
    };

    const handleLogout = () => {
      setUser(null);
      setStatus("idle");
    };

    window.addEventListener("auth:user-updated", handleUserUpdated);
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:user-updated", handleUserUpdated);
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post(
        "/api/auth/logout",
        {},
        { skipAuthRefresh: true }
      );
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      clearSession();
      setUser(null);
      setStatus("idle");
      toast.success("Logged out successfully");
    }
  }, []);

  const value = {
    user,
    status,
    setUser: persistUserLocally,
    refreshUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
