import { Navigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import axios from "axios";

// PROPS TOKEN POUR VERIFIER QUE L'UTILISATEUR EST CONNECTE
const Publish = ({ token }) => {
  // STATE POUR CHAQUE ITEM DU FOMULAIRE
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  // STATE QUI GERE LA CHECKBOX NEWSLETTER FALSE PAR DEFAUT
  const [Echange, setEchange] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // CREER un FORMDATA POUR AVOIR IMAGE + TEXTE
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      // REQUETE DU SERVEUR VIA AXIOS
      const response = await axios.post(
        "http://localhost:3000/api/offer/publish",

        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return token ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        {/* POUR STYLISER UN BOUTON */}
        <label
          style={{
            color: "#007580",
            fontSize: "15px",
          }}
          htmlFor="file"
        >
          Choisissez une image
        </label>
        <input
          id="file"
          style={{ display: "none" }}
          type="file"
          onChange={(event) => {
            setPicture(event.target.image[0]);
          }}
        />
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
        />
        {/* // METHODE SANS COMPONENT */}
        {/* <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
        /> */}
        {/* // METHODE AVEC COMPONENTS */}
        {picture && <img src={URL.createObjectURL(picture)} alt="product" />}
        <CustomInput title={"Titre"} state={title} setState={setTitle} />
        <CustomInput
          textArea
          title="Décrivez votre article"
          state={description}
          setState={setDescription}
        />
        <CustomInput title={"Marque"} state={brand} setState={setBrand} />
        <CustomInput title={"Taille"} state={size} setState={setSize} />
        <CustomInput title={"Couleur"} state={color} setState={setColor} />
        <CustomInput title={"Etat"} state={condition} setState={setCondition} />
        <CustomInput title={"Lieu"} state={city} setState={setCity} />
        <CustomInput title={"Prix"} state={price} setState={setPrice} />

        <input
          checked={Echange}
          type="checkbox"
          onChange={() => {
            setEchange(!Echange);
          }}
        />
        <span>Je suis intéressé par les échanges</span>
        <input type="submit" value="Ajouter" />
        {/* <Link to="/">Votre annoce est publiée</Link> */}
      </form>
    </div>
  ) : (
    /* // REDIRIGE A LA PAGE SIGNUP */
    <Navigate to="/login" />
  );
};

export default Publish;
