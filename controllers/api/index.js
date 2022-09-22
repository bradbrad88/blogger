const router = require("express").Router();

const authRouter = require("./auth");
const blogRouter = require("./blog");

router.use("/blog", blogRouter);
router.use("/auth", authRouter);
// router.use("/user");

module.exports = router;
