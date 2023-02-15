import { Link } from "react-router-dom";

//**************************************************/
/** ENFANT ARTICLE DU CATALOGUE DANS HOME *********/
/***************************************************/

const Article = ({ offer }) => {
  return (
    <Link to={`/offer/${offer._id}`}>
      <produit>
        <div>
          {/* AFFICHAGE DE L'AVATAR */}
          {offer.owner.account.avatar && (
            <img
              style={{
                height: 50,
                width: 50,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={offer.owner.account.avatar.secure_url}
              alt="owner"
            />
          )}
          {/* PARCOURS DU TABLEAU PRODUCT_DETAIL */}
          <span>{offer.owner.account.username}</span>
        </div>
        <img
          src={offer.product_image.secure_url}
          alt="product"
          style={{
            display: "flex",
            justifyContent: "center",
            height: 150,
            width: 150,
            marginBottom: 20,
            marginTop: 10,
            objectFit: "cover",
          }}
        />
        <p>{offer.product_price} €</p>

        <div
          style={{
            display: "flex",
            justifycontent: "space-arround",
          }}
        >
          {/* PARCOURS DU TABLEAU PRODUCT_DETAIL */}
          {offer.product_details.map((detail, index) => {
            // VERIFICATION console.log(detail);
            // SI OBJET A CLE TAILLE, ON AFFICHE
            if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              // SI OBJET A CLE MARQUE, ON AFFICHE
              return <p key={index}>{detail.MARQUE}</p>;
            } else {
              return null;
            }
          })}
        </div>
      </produit>
    </Link>
  );
};

export default Article;
