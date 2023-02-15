import React, { useState, useEffect } from "react";
// BESOIN DE REQUETE (GET)
import axios from "axios";
// BESOIN D'UTILISER DES ID
import { useParams } from "react-router-dom";
// BESOIN D'UITILSER LINK
import { Link } from "react-router-dom";

//**************************************************************/
/**SELECTION ET AFFICHAGE D'UNE OFFRE DANS LE CATALOGUE VIA ID***/
/***************************************************************/

const Offer = () => {
  // RECUPERATION DE L'ID DANS L'URL
  const params = useParams();
  const id = params.id;
  // VERIFICATION : console.log(params);

  // STATE DE RECUPERATION DU DATA
  const [data, setData] = useState();
  // STATE PERMETTANT DE SAVOIR SI DATA RECUPERE
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // DECLARATION DE FONCTION FAISANT LA REQUETE
    const fetchData = async () => {
      // TRY CATCH AU CAS OU REQUETE KO
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // VERIFICATION : console.log(response.data);
        // STOCKAGE DU RESULTAT DANS DATA
        setData(response.data);
        // METTRE ISLOADING A FALSE
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // APPEL DE LA FONCTION AVEC CLE ID AU CAS OU MODIF
    fetchData();
  }, [id]);

  return isLoading ? (
    // MESSAGE DE TELECHARGEMENT
    <p>Loading ...</p>
  ) : (
    // SI TERMINÉ AFFICHER LES IMAGES
    <div>
      <img src={data.product_image.secure_url} alt="product" />
      {/* AFFICHER LE PRIX */}
      <p>{data.product_price} €</p>
      {/* PARCOURS DU DETAIL PAR PRODUIT */}
      {data.product_details.map((detail, index) => {
        // RECUPERATION DU NOM DE LA CLE DANS LE DETAIL
        const key = Object.keys(detail)[0];
        // VERIFICATION : console.log(detail[key]);
        return (
          <div key={index}>
            {/* AFFICHAGE DU NOM DE LA CLE  */}
            <span>{key} : </span>
            {/* AFFICHAGE DE SON CONTENU */}
            <span>{detail[key]}</span>
          </div>
        );
      })}
      {/* AFFICHAGE DU NOM DU PRODUIT DE SA DESCRIPTION ET DU NOM DU VENDEUR  */}
      <p>{data.product_name}</p>
      <p>{data.product_description}</p>
      <p>{data.owner.account.username}</p>
      <Link
        to="/payment"
        state={{ title: data.product_title, price: data.product_price }}
      >
        Acheter
      </Link>
      ;
    </div>
  );
};

export default Offer;
