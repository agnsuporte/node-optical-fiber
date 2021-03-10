const express = require("express");

const users = require("./users");
const project = require("./projects");
const networks = require("./networks");
const cables = require("./cables");
const devices = require("./devices");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API Home/AGNSuporte...",
  });
});

router.use("/user", users);
router.use("/project", project);
router.use("/network", networks);
router.use("/cable", cables);
router.use("/device", devices);

module.exports = router;
