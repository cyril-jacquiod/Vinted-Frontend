import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ product_name, product_price }) => {
  const [paymentStatus, setPaymentStatus] = useState(0); // 0 = pas encore cliqué / 1 = en attente de réponse / 2 = OK / 3 = Error

  const elements = useElements();
  const stripe = useStripe();

  const userId = Cookies.get("id-vinted");
  console.log(userId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setPaymentStatus(1);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      const stripeToken = stripeResponse.token.id;
      //   console.log(stripeToken);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          // le token que vous avez reçu de l'API Stripe
          title: product_name,
          amount: product_price,
          // le prix indiquée dans l'annonce
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setPaymentStatus(2);
      }
    } catch (error) {
      setPaymentStatus(3);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      {paymentStatus === 2 ? (
        <p>Paiement validé</p>
      ) : (
        <button disabled={paymentStatus === 1} type="submit">
          Pay !
        </button>
      )}

      {paymentStatus === 3 && (
        <p>Une erreur est survenue, veuillez réessayer :) </p>
      )}
    </form>
  );
};

export default CheckoutForm;
