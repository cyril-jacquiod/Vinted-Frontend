// import Cookies from "js-cookie";
// import "../components/Header.js";

// const express = require("express");
// // LE SALT EST UNE CHAINE DE CARACTERE ALEATOIRE GENERER A PARTIR D'UN MDP UTILISATEUR
// const uid2 = require("uid2");
// // LE HASH PERMET DE GENERER UN MDP COMBINANT LE SALT ET LE MDP
// const SHA256 = require("crypto-js/sha256");
// // LE TOKEN EST UNE CHAINE DE 16 CARACTERES ALEATOIRE GENERE À L'INSRIPTION OU L'AUTHENTIFICATION
// const encBase64 = require("crypto-js/enc-base64");
// const router = express.Router();

// const User = require("../models/User");
// // CREATION D'UN COOKIE AVEC DATE D'EXPIRATION À 14 JOURS
// const token = "token";
// Cookies.set("token", token, { expires: 14 });
// //RENVOI DU COOKIE
// Cookies.get("token");

// router.post("/user/signup", async (req, res) => {
//   try {
//     // VERIFICATION DU BODY console.log(req.body);
//     // DESTRUCTURING DU BODY RECEPTIONNÉ ET SELECTION DES ELEMENTS
//     const { username, email, password, newsletter } = req.body;

//     // SI CHAMP NON RENSEIGNE :  "Missing Parameter"
//     if (!username || !email || !password || typeof newsletter !== "boolean") {
//       return res.status(400).json({ message: "Missing parameter" });
//     }
//     // SI EMAIL EXISTE MESSAGE :  "This email is already used"
//     const emailAlreadyUsed = await User.findOne({ email });
//     // VRIFICATION DU MESSAGE console.log(emailAlreadyUsed);
//     if (emailAlreadyUsed) {
//       return res.status(409).json({ message: "This email is already used" });
//     }
//     // SINON RETOUR DU TOKEN
//     const token = uid2(64);
//     const salt = uid2(16);
//     const hash = SHA256(salt + password).toString(encBase64);
//     const newUser = new User({
//       email,
//       account: {
//         username,
//       },
//       newsletter,
//       token,
//       hash,
//       salt,
//     });
//     await newUser.save();
//     const response = {
//       _id: newUser._id,
//       account: newUser.account,
//       token: newUser.token,
//     };
//     res.json(response);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.post("/user/login", async (req, res) => {
//   try {
//     // VERIFICATION DU BODY console.log(req.body);
//     const { email, password } = req.body;
//     // CHERCHER USER CORRESPONDNAT A L'ADRESSE SAISIE DANS LE BODY RÉCEPTIONNÉ
//     const user = await User.findOne({ email: email });
//     // SI USER INCONNU ALORS MESSAGE D'ERREUR : "Unauthorized"
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     // SI USER = OK ALORS ON CREE UN HASH = SALT CORRESPONDANT AU MAIL + MDP RÉCEPTIONNÉ
//     console.log(user);
//     const newHash = SHA256(user.salt + password).toString(encBase64);
//     console.log(newHash);
//     // SI HASH STOCKE EN BDD <> NOUVEAU HASH CREE ALORS MESSAGE D'ERREUR : "Unauthorized"
//     if (newHash !== user.hash) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     // SI HASH STOCKE BDD = NOUVEAU HASH CREE ALORS CONNEXION OK ET RETOUR UTILSATEUR ID/USERACCOUNT/TOKEN

//     res.json({
//       _id: user._id,
//       account: user.account,
//       token: user.token,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.delete("/fkjezejf", () => {});
// module.exports = router;

// export default User;
