const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        req.body.user = decoded.userID;
        next();
      } else {
        res.send({ msg: "Please Login" });
      }
    });
  } else {
    res.send({ msg: "Please Login" });
  }
};

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     const decoded = jwt.verify(token, process.env.key);
//     if (decoded) {
//       const userID = decoded.userID;
//       console.log("after decoding the token", userID);
//       req.body.authorID = userID;
//       next();
//     } else {
//       res.send("Please Login First");
//     }
//   } else {
//     res.send("Please Login First");
//   }
// };

module.exports = {
  authenticate,
};
