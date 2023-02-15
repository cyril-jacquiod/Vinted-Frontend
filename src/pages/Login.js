import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expires: 14 });
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.data);
    }
  };

  return (
    <div
      // STYLE INLINE POUR LE FORMULAIRE
      style={{
        display: "flex",
        flexDirection: "column",
        aligncontent: "center",
        width: "100vw",
        height: "50vh",
      }}
    >
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleLogin}
      >
        <h1 style={{ fontsize: "22", marginBottom: "20" }}>Se Connecter</h1>
        <input
          value={email}
          type="email"
          placeholder="Email"
          // DECLARATION DE FONCTION
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" value="Se connecter" />
        {/* // RE-DIRIGE A LA PAGE SIGNUP */}
        <Link to="/signup">Pas encore de compte ? Inscris-toi</Link>
      </form>
    </div>
  );
};

export default Login;
