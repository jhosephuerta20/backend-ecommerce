// src/middlewares/stripeRaw.js
const express = require("express");

const stripeRaw = express.raw({ type: "application/json" });

module.exports = stripeRaw;
