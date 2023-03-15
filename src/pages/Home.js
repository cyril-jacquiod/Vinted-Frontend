//**************************************************/
/**CATALOGUE DES OFFRES VINTED**********************/
/***************************************************/

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
// import tear from "../assets/images/tear.svg";
import { Triangle } from "react-loader-spinner";
import "../assets/styles/home.css";

const Home = ({ data, isLoading }) => {
  const navigate = useNavigate();

  return isLoading ? (
    <Triangle
      className="home-loader"
      type="Puff"
      color="#017580"
      height={80}
      width={80}
    />
  ) : (
    <>
      <div className="home-hero-bg-img">
        {/* <img src={tear} alt="forme" className="home-hero-forme" /> */}
        <div>
          <div className="home-hero-ready">
            Prêts à faire du tri dans vos placards ?
            <button
              onClick={() => {
                navigate("/publish");
              }}
            >
              Vendez maintenant
            </button>
          </div>
        </div>
      </div>
      <div className="home-card-wrapper">
        {data.offers &&
          data.offers.map((card, index) => {
            return <Card key={index} data={card} />;
          })}
      </div>
    </>
  );
};

export default Home;
