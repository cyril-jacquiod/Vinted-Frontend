import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// PAGES A IMPORTER
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// import User from "./pages/User";

// APPEL DU HEADER POUR TOUTES LES PAGES
import Header from "./components/Header";

// RECUPERER LE TOKEN DE STRIPE POUR PAIEMENT
const stripePromise = loadStripe("pk_test_votreCléPublique");

function App() {
  // STATE POUR STOCKER VALEUR DE RECHERCHE
  const [search, setSearch] = useState("");

  /******************************************/
  /********** COOKIES *********************/
  /****************************************/

  // STATE POUR STOCKER TOKEN AVEC POUR VALEUR DE BASE LE COOKIE TOKEN SINON NULL (RAZ)
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };
  return (
    <Elements stripe={stripePromise}>
      {/* // PROPRIETES (PROPS) A MES COMPONENTS */}
      <Router>
        <Header
          token={token}
          search={search}
          handleToken={handleToken}
          setSearch={setSearch}
        />
        <Routes>
          {/* ROUTES FAISANT APPEL AUX COMPOSANTS (PAGES OU CONTAINERS) DES PROPS ELEMENT "HOME" "OFFER" "SIGNUP" */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/Publish" element={<Publish token />} />
          {/* CARACTERE ":" INDIQUE QUE NOTRE PATH CONTIENT UN PARAMETRE DYNAMIQUE ID */}
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </Elements>
  );
}
export default App;
