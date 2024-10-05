const express = require("express");
const session = require("express-session")
// const authMiddleware = require("./src/middleware/auth");
const UserApi = require("../api/user");
const router = express.Router();

router.use(session({
    secret: 'exemplo',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

// router.post("/", UserApi.createUser);

router.put("/:id", UserApi.updateUser);
router.get("/", UserApi.findUsers);
router.get("/context", UserApi.findContext);
router.delete("/:id", UserApi.deleteUser);

module.exports = router;