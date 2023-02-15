import "./Header.css";
import logo from "../components/logo.png";
import { Link } from "react-router-dom";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header>
      {/* SI TOKEN ON AFFICHE BOUTON DECONNECTE, SINON S'INSCRIRE ET SE CONNECTER */}
      {token ? (
        <button
          onClick={() => {
            // ON SUPPRIME LE COOKIE (Cookies.remove("token-vinted");)
            handleToken(null);
          }}
        >
          Se Déconnecter
        </button>
      ) : (
        <>
          <span>
            <img
              src={logo}
              alt="logo vinted"
              style={{
                blockSize: 30,
                marginRight: 40,
                alignItems: "bottom",
              }}
            />
          </span>
          {/* // STYLE INLINE POUR LES BOUTONS */}
          {/* BARRE DE RECHERCHE SUR MOT CLE */}
          <input
            style={{
              background: "#f5f6f7",
              color: "lightgrey",
              borderColor: "lightgrey",
              textAlign: "left",
              borderRadius: 5,
              marginLeft: 10,
              minWidth: 500,
              height: 30,
              marginRight: 40,
            }}
            // ON RECUPERE LA VALEUR AFFICHÉE
            value={search}
            type="text"
            placeholder="Rechercher des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          {/* Recherche des articles
            </button> */}
          <Link to="/signup">
            <button
              style={{
                borderColor: "#007580",
                background: "white",
                height: 30,
                color: "#007580",
                fontSize: 12,
                borderRadius: 5,
                minWidth: 100,
              }}
            >
              S'inscrire
            </button>
          </Link>
          <Link to="/login">
            <button
              style={{
                borderColor: "#007580",
                background: "white",
                height: 30,
                color: "#007580",
                fontSize: 12,
                borderRadius: 5,
                minWidth: 100,
              }}
            >
              Se connecter
            </button>
          </Link>

          {/* // SI TOKEN OK CONNECT */}
          <Link to={token ? "/Publish" : "/login"}>
            {/* <Link to={"/Publish"}> */}
            <button
              style={{
                background: "#007580",
                borderColor: "#007580",
                height: 30,
                color: "white",
                fontSize: 12,
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              Vends tes articles
            </button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
