// POUR REQUETER MON SERVEUR
import axios from "axios";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./Offer";

const Payment = () => {
  // PERMET DE CREER UNE REQUETE VERS STRIPE POUR OBTENIR UN TOKEN
  const stripe = useStripe();
  // STATE ATTENTE DE REPONSE
  const [isLoading, setIsLoading] = useState(false);
  //PERMET DE RECUPERER LES DONNEES BANCAIRES DE L'UTILISATEUR
  const elements = useElements();
  //PERMET DE SAVOIR SI PEYMENT OK
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // ISLOADING A TRUE POUR OK
      setIsLoading(true);
      // RECUPERATION DES DONNEES BANCAIRE DE L'UTILISATEUR
      const cardElement = elements.getElement(CardElement);
      // ENVOI DES DONNEES BANCAIRES ET DEMANDE CREATION TOKEN VIA API STRIPE
      const stripeResponse = await stripe.createToken(cardElement, {
        // name: userId,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // ENVOI VERS NOTRE SERVEUR DU TOKEN RECU DE L'API DE STRIPE
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
        }
      );
      console.log(response.data);
      // SI REPONSE SERVEUR OK, TRANSACTION EST OK ET MESSAGE CLIENT
      if (response.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
      // SINON MESSAGE D'ERREUR
    } catch (error) {
      console.log(error.message);
    }
  };
  // AFFICHAGE DU FORMULAIRE
  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "50vh",
        width: "300px",
      }}
      onSubmit={handleSubmit}
    >
      <h1>Formulaire de paiement</h1>
      <CardElement />
      {/* product_title;{product.title}
      product_price:{product.price} */}
      {completed ? (
        <p>Paiement effectué</p>
      ) : (
        <button disabled={isLoading} type="submit">
          Payer
        </button>
      )}
    </form>
  );
};

export default Payment;
