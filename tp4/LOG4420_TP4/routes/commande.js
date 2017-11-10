var express = require("express");
var router = express.Router();
//127;;..8000:/cmommande/
router.get("/", function(req, res) {
  res.render("index", { title: "COMMANDE", message: "Ça semble fonfdsfsdfctionner!" });
});

module.exports = router;
