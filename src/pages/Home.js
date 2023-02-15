//**************************************************/
/**CATALOGUE DES OFFRES VINTED**********************/
/***************************************************/

// BESOIN DE STATE
import React, { useState, useEffect } from "react";
// BESOIN DE REQUETE AXIOS (GET)
import axios from "axios";
import Article from "../components/Article";
// DECLARATION DE VARIABLE AVEC LA PROPS SEARCH POUR LA RECHERCHE ARTICLE
const Home = ({ search }) => {
  // STATE DE RECUPERATION DU DATA
  const [data, setData] = useState();
  // STATE PERMETTANT DE SAVOIR SI DATA RECUPERE
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // DECLARATION DE FONCTION FAISANT LA REQUETE VIA UNE AUTRE FONCTION (FCT USEEFFECT PAS ASYNC)
    const fetchData = async () => {
      // TRY CATCH EN CAS DE REQUETE KO
      try {
        // DECLARATION DE LA VARIABLE RESPONSE AVEC CLE RECHERCHE TITLE FONCTIONNE PAS
        const response = await axios.get(
          // `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`

          `https://lereacteur-vinted-api.herokuapp.com/offers`
        );
        // VERIFICATION AVEC console.log(response.data);
        // STOCKAGE DU RESULTAT DANS DATA
        setData(response.data);
        // METTRE ISLOADING A FALSE
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // APPEL DE LA FONCTION AVEC PROPS SEARCH
    fetchData();
  }, [search]);
  // MESSAGE DE TELECHARGEMENT
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      {/* // UTILISATION D'UN TABLEAU POUR RECUPERER LES DATAS */}
      {data.offers.map((offer) => {
        // RECUPERATION DES OFFRES PAR ID
        return <Article offer={offer} key={offer._id} />;
      })}
    </div>
  );
};

export default Home;
