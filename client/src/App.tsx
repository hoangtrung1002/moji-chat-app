import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import ChatApp from "./pages/chat-app";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* protected routes */}
          <Route path="/" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
