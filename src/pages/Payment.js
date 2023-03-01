import { Navigate, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ token }) => {
  const location = useLocation();
  //   console.log(location);
  const { product_name, product_price } = location.state;
  //   console.log(product_name);
  //   console.log(product_price);

  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );
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
      <div>
        <h1>Résumé de la commande</h1>
        <p>Prix de la commande : {product_price} €</p>
        <p>Vous allez acheter : {product_name}</p>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            product_name={product_name}
            product_price={product_price}
          />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
