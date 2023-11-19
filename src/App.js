import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import HomePage from "./Components/HomePage";
import Register from "./Components/Register";
import CreateNotes from "./Components/CreateNotes";
import UpdateNotes from "./Components/UpdateNotes";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreateNotes />} />
          <Route path="/updateNotes/:dataID" element={<UpdateNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
