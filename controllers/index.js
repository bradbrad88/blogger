const router = require("express").Router();
const { authRender } = require("../utils/auth");
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const protectedRoutes = require("./protectedRoutes");

// All api routes
router.use("/api", apiRoutes);
// Routes available regardless of auth status
router.use("/", homeRoutes);
// Any route that should redirect to login/signup if not logged in
router.use("/", authRender, protectedRoutes);

module.exports = router;
