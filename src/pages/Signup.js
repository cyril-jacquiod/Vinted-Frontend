import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = ({ handleTokenAndId }) => {
  // STATE QUI GERENT LES INPUTS DU FORMULAIRE SIGNUP
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // STATE QUI GERE LA CHECKBOX NEWSLETTER FALSE PAR DEFAUT
  const [newsletter, setNewsletter] = useState(false);

  // STATE QUI GERE LE MESSAGE D'ERREUR
  const [errorMessage, setErrorMessage] = useState("");

  // PERMET NAVIGATION DANS LE SITE APRES EXECUTION DU CODE
  const navigate = useNavigate();
  // SOUMISSION DU FORMULAIRE SANS RAFFRAICHISSEMENT
  const handleSignup = async (event) => {
    event.preventDefault();
    // SUPRESSION DU MESSAGE D'ERREUR
    setErrorMessage("");
    try {
      // REQUETE AXIOS AVEC 1ER ARGUMENT POUR INTERROGER L'URL ET 2EME POUR ENVOI DU BODY
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      // SI TOKEN GENERE ET STOCKE DANS APP.JS
      if (response.data.token) {
        // J'ENREGISTRE MON STATE ET MES COOKIES
        handleTokenAndId(response.data.token, response.data._id);
        // PUIS JE REDIRIGE VERS LA PAGE HOME APRES EXECUTION FONCTION
        navigate("/");
      }
    } catch (error) {
      // VERIFICATION console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      // SI MESSAGE D'ERREUR "This email already has an account"
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          // REPONSE A L'UTILISATEUR
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      // SI MESSAGE D'ERREUR "Missing parameters"
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
    }
  };
  return (
    <div
      // STYLE INLINE POUR LE FORMULAIRE
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        heigth: "100vh",
      }}
    >
      {/* STYLE CSS POUR LE BODY */}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          aligncontent: "center",
          width: "30vw",
          height: "50vh",
        }}
        onsubmit={handleSignup}
      >
        <h1>S'incrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          // ON RECUPERE LA VALEUR USERNAME STOCKEE DANS LE STATE USERNAME
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <span>
          <input
            checked={newsletter}
            type="checkbox"
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
        </span>
        <input type="submit" value="S'inscrire" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* REDIRECTION VERS LA PAGE LOGIN + MESSAGE */}
        <Link to="/login">Tu as déjà un compte, connecte-toi !</Link>
      </form>
    </div>
  );
};

export default Signup;
