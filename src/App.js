import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// APPEL DU HEADER POUR TOUTES LES PAGES
import Header from "./components/Header";
// PAGES A IMPORTER
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCheck, faRedo } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCheck, faRedo);

function App() {
  // STATE POUR STOCKER TOKEN AVEC POUR VALEUR DE BASE LE COOKIE TOKEN SINON NULL (RAZ)
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  // STATE POUR STOCKER VALEUR DE RECHERCHE
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/offers?priceMin=${
          fetchRangeValues[0]
        }&priceMax=${fetchRangeValues[1]}&sort=${
          sortPrice ? "price-desc" : "price-asc"
        }&title=${search}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchRangeValues, sortPrice, search]);
  return (
    <Router>
      <Header
        setUser={setUser}
        token={token}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        setSearch={setSearch}
      />
      <body>
        <Routes>
          {/* ROUTES FAISANT APPEL AUX COMPOSANTS (PAGES OU CONTAINERS) DES PROPS ELEMENT "HOME" "OFFER" "SIGNUP" */}
          <Route
            path="/"
            element={<Home data={data} isLoading={isLoading} />}
          />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          {/* CARACTERE ":" INDIQUE QUE NOTRE PATH CONTIENT UN PARAMETRE DYNAMIQUE ID */}
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </body>
      <footer>Made By Cyril at LeReacteur</footer>
    </Router>
  );
}
export default App;
