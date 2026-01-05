import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import ChatApp from "./pages/chat-app";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/protected-route";
import { useThemeStore } from "./stores/use-theme-store";
import { useEffect } from "react";
function App() {
  const { isDark, setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(isDark);
  }, [isDark, setTheme]);

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
