import React, { useEffect, useState } from "react";
import "./App.css";
import NavbarEx from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages";
import Products from "./pages/Products";
import Simulation from "./pages/Simulation";
import Contact from "./pages/contact";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Faq from "./pages/faq";
import Footer from "./pages/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenService from "./services/token.service";
import CryptoBots from "./pages/cryptobots";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./pages/notfound";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <div className="container-fluid">
      <Router>
        <NavbarEx
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          userName={userName}
          setUserName={setUserName}
        />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/crypto-bots" element={<CryptoBots />} />
            <Route path="/products" element={<Products />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route
              path="/sign-in"
              element={
                <SignIn setIsLogged={setIsLogged} setUserName={setUserName} />
              }
            />
            <Route path="*" element={<Navigate replace to="/not-found" />} />
          </Routes>
        </div>
        <div className="">
          <Footer />
        </div>

        <ToastContainer position="top-right" hideProgressBar />
      </Router>
    </div>
  );
}

export default App;
