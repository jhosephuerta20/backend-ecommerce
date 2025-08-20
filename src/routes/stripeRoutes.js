const express = require("express");
const router = express.Router();
const stripeRaw = require("../middlewares/stripeRaw");
const { webHook } = require("../controllers/pagoController");

router.post("/confirmacion/stripe", stripeRaw, webHook);

module.exports = router;
