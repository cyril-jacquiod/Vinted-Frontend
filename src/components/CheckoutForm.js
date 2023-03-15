import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// REGLEMENT CLIENT ET RECUPERATION DES DONNEES BANCAIRES
const CheckoutForm = ({ productName, totalPrice }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // VERIFICATION
  // console.log(totalPrice);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // RECUPERATION DES DONNEES BANCAIRES SAISIES PAR LE CLIENT
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      // VERIFICATION
      // console.log(stripeResponse);

      const response = await axios.post(
        // `${process.env.REACT_APP_BASE_URL}/payment`,
        `http://localhost:3000/payment`,

        {
          amount: totalPrice,
          title: productName,
          token: stripeResponse.token.id,
        }
      );

      if (response.data) {
        setIsPaid(true);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <p>Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
