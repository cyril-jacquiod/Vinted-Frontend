import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// IMPORT DU CODE CSS
import "../assets/styles/publish.css";

// PROPS TOKEN POUR VERIFIER QUE L'UTILISATEUR EST CONNECTE
const Publish = ({ token }) => {
  // STATE POUR CHAQUE ITEM DU FOMULAIRE
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedWearRate, setSelectedWearRate] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [acceptedExchange, setAcceptedExchange] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", selectedSize);
      formData.append("color", color);
      formData.append("condition", selectedWearRate);
      formData.append("city", city);
      formData.append("brand", selectedBrand);

      // REQUETE DU SERVEUR VIA AXIOS
      const response = await axios.post(
        // `${process.env.REACT_APP_BASE_URL}/offer/publish`,
        `http://localhost:3000/offer/publish`,

        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            //send formData with axios make this headers EXPLICIT !
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // VERIFICATION console.log(response.data);
      if (response.data._id) {
        // REDIRIGE VERS OFFRE
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez r??ssayer");
      }
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Une erreur est survenue, veuillez r??ssayer"
      );
    }
  };
  // PUBLICATION DE L'OFFRE
  return token ? (
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select">
            {preview ? (
              <div className="dashed-preview-image">
                <img src={preview} alt="pr??-visualisation" />
                <div
                  className="remove-img-button"
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="dashed-preview-without">
                <div className="input-design-default">
                  <label htmlFor="file" className="label-file">
                    <span className="input-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="input-file"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="ex: Chemise S??zane verte"
                onChange={(event) => {
                  const value = event.target.value;
                  setTitle(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>D??cris ton article</h4>
              <textarea
                name="description"
                id="description"
                rows="5"
                value={description}
                placeholder="ex: port?? quelquefois, taille correctement"
                onChange={(event) => {
                  const value = event.target.value;
                  setDescription(value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Marque</h4>
              <input
                type="text"
                id="selectedBrand"
                name="selectedBrand"
                placeholder="ex: Zara"
                value={selectedBrand}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedBrand(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Taille</h4>
              <input
                type="text"
                id="selectedSize"
                name="selectedSize"
                placeholder="ex: L / 40 / 12"
                value={selectedSize}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedSize(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Couleur</h4>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  const value = event.target.value;
                  setColor(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Etat</h4>
              <input
                name="wearRate"
                id="wearRate"
                placeholder="Neuf avec ??tiquette"
                value={selectedWearRate}
                onChange={(event) => setSelectedWearRate(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4>Lieu</h4>
              <input
                name="city"
                id="city"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>
              <div className="checkbox-section">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0,00 ???"
                  value={price}
                  onChange={(event) => {
                    const value = event.target.value;
                    setPrice(value);
                  }}
                />
                <div className="checkbox-input">
                  {acceptedExchange ? (
                    <label
                      htmlFor="exchange"
                      className="checkbox-design-checked"
                    >
                      <FontAwesomeIcon icon="check" size="xs" color="white" />
                    </label>
                  ) : (
                    <label
                      htmlFor="exchange"
                      className="checkbox-design"
                    ></label>
                  )}
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value={acceptedExchange}
                    onChange={() => setAcceptedExchange(!acceptedExchange)}
                  />
                  <span>Je suis int??ress??(e) par les ??changes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-button-div">
            <button type="submit" className="form-validation">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ fromPublish: true }} />
  );
};

export default Publish;
