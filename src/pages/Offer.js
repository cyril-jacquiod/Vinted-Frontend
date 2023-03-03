import React, { useState, useEffect } from "react";
// BESOIN DE REQUETE (GET)
import axios from "axios";
// BESOIN D'UTILISER DES ID
import { useParams, useNavigate } from "react-router-dom";
import Triangle from "react-loader-spinner";
import "../assets/styles/offer.css";

/***************************************************************/
/* SELECTION ET AFFICHAGE D'UNE OFFRE DANS LE CATALOGUE */
/***************************************************************/
const Offer = () => {
  const params = useParams();
  const navigate = useNavigate();
  // VERIFICATION : console.log(params);

  // STATE DE RECUPERATION DU DATA
  const [data, setData] = useState({});
  // STATE PERMETTANT DE SAVOIR SI DATA RECUPERE
  const [isLoading, setIsLoading] = useState(true);
  // RANGE DU PRIX
  const price = data.product_price;
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  useEffect(() => {
    // DECLARATION DE FONCTION FAISANT LA REQUETE
    const fetchData = async () => {
      // RECUPERATION DES DONNEES VIA ID
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/offer/${params.id}`
      );
      // VERIFICATION : console.log(response.data);
      // STOCKAGE DU RESULTAT DANS DATA
      setData(response.data);
      // METTRE ISLOADING A FALSE
      setIsLoading(false);
    };
    // APPEL DE LA FONCTION AVEC CLE ID AU CAS OU MODIF
    fetchData();
  }, [params.id]);

  return isLoading ? (
    // LOADIND DE TELECHARGEMENT
    <Triangle
      className="home-loader"
      type="Puff"
      color="#2CB1BA"
      height={80}
      width={80}
    />
  ) : (
    // SI TERMINÉ AFFICHER LES IMAGES LES UNE APRES LES AUTRES
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-pictures">
          {data.product_pictures.length === 0 ? (
            <img
              className="offer-picture"
              src={data.product_image.secure_url}
              alt={data.product_name}
            />
          ) : (
            <img
              className="offer-picture"
              src={data.product_pictures[0].secure_url}
              alt={data.product_name}
            />
          )}
        </div>
        <div className="offer-infos" style={{}}>
          <div>
            <span className="offer-price">{data.product_price} €</span>

            <ul className="offer-list">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <li key={index} className="">
                    <span>{keys[0]}</span>
                    <span>{elem[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="divider" />

          <div className="offer-content">
            <p className="name">{data.product_name}</p>
            <p className="description">{data.product_description}</p>

            <div
              onClick={() => alert("Go to user profile !")}
              className="offer-avatar-username"
            >
              {data.owner && data.owner.account.avatar && (
                <img
                  alt={data.product_name}
                  src={data.owner.account.avatar.secure_url}
                />
              )}
              <span>{data.owner && data.owner.account.username}</span>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/payment", {
                state: {
                  productName: data.product_name,
                  totalPrice: total,
                  protectionFees: protectionFees,
                  shippingFees: shippingFees,
                  price: data.product_price,
                },
              });
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
