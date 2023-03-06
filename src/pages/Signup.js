import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = ({ setUser }) => {
  // STATE QUI GERENT LES INPUTS DU FORMULAIRE SIGNUP
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // STATE QUI GERE LA CHECKBOX NEWSLETTER FALSE PAR DEFAUT
  // const [newsletter, setNewsletter] = useState(false);

  // STATE QUI GERE LE MESSAGE D'ERREUR
  const [errorMessage, setErrorMessage] = useState(null);

  // PERMET NAVIGATION DANS LE SITE APRES EXECUTION DU CODE
  const navigate = useNavigate();
  // SOUMISSION DU FORMULAIRE SANS RAFFRAICHISSEMENT
  const handleSubmit = async (event) => {
    // SUPRESSION DU MESSAGE D'ERREUR
    try {
      event.preventDefault();
      // REQUETE AXIOS POUR ENVOI
      const response = await axios.post(
        // `${process.env.REACT_APP_BASE_URL}/user/signup`,
        `http://localhost:3000/user/signup`,
        {
          email: email,
          username: username,
          password: password,
          // newsletter: newsletter,
        }
      );
      // SI TOKEN OK - GENERE ET STOCKE DANS APP.JS
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      // VERIFICATION console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      // SI MESSAGE D'ERREUR "This email already has an account"
      if (error.response.status === 409) {
        // REPONSE A L'UTILISATEUR
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      // SI MESSAGE D'ERREUR "Missing parameters"
      if (error.response.status === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp.");
      }
    }
  };
  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Nom d'utilisateur"
          type="text"
        />
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          placeholder="Email"
          type="email"
        />
        <span className="signup-login-error-message">{errorMessage}</span>
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Mot de passe"
          type="password"
        />
        <div className="checkbox-container">
          <div>
            <input type="checkbox" />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};

export default Signup;
