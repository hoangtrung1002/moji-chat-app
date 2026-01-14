import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import ChatApp from "./pages/chat-app";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/protected-route";
import { useThemeStore } from "./stores/use-theme-store";
import { useEffect } from "react";
import { useAuthStore } from "./stores/use-auth-store";
import { useSocketStore } from "./stores/use-socket-store";
function App() {
  const { isDark, setTheme } = useThemeStore();
  const { accessToken } = useAuthStore();
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    setTheme(isDark);
  }, [isDark, setTheme]);

  useEffect(() => {
    if (accessToken) {
      connectSocket();
    }
    return () => disconnectSocket();
  }, [accessToken]);

  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
