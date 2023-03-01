import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
// import { loadStripe } from "@stripe/stripe-js";

// PAGES A IMPORTER
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// APPEL DU HEADER POUR TOUTES LES PAGES
import Header from "./components/Header";

// RECUPERER LE TOKEN DE STRIPE POUR PAIEMENT
// const stripePromise = loadStripe("pk_test_votreCléPublique");

function App() {
  /******************************************/
  /********** COOKIES *********************/
  /****************************************/

  // STATE POUR STOCKER TOKEN AVEC POUR VALEUR DE BASE LE COOKIE TOKEN SINON NULL (RAZ)
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  const [id, setId] = useState(Cookies.get("id-vinted") || null);

  // STATE POUR STOCKER VALEUR DE RECHERCHE
  const [search, setSearch] = useState("");

  const handleTokenAndId = (token, id) => {
    if (token && id) {
      setToken(token);
      setId(id);
      Cookies.set("token-vinted", token, { expires: 14 });
      Cookies.set("id-vinted", id, { expires: 14 });
    } else {
      setToken(null);
      setId(null);
      Cookies.remove("token-vinted");
      Cookies.remove("id-vinted");
    }
  };
  return (
    <Router>
      <Header
        token={token}
        search={search}
        handleTokenAndId={handleTokenAndId}
        setSearch={setSearch}
      />
      <Routes>
        {/* ROUTES FAISANT APPEL AUX COMPOSANTS (PAGES OU CONTAINERS) DES PROPS ELEMENT "HOME" "OFFER" "SIGNUP" */}
        <Route path="/" element={<Home search={search} />} />
        <Route
          path="/signup"
          element={<Signup handleTokenAndId={handleTokenAndId} />}
        />{" "}
        <Route
          path="/login"
          element={<Login handleTokenAndId={handleTokenAndId} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        {/* CARACTERE ":" INDIQUE QUE NOTRE PATH CONTIENT UN PARAMETRE DYNAMIQUE ID */}
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}
export default App;
