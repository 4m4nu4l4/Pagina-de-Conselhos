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

router.get("/context", UserApi.findContext);
router.put("/:id", authMiddleware(['viewer', 'admin']), UserApi.updateUser);
router.get("/", authMiddleware(['admin']), UserApi.findUsers);
router.delete("/:id", authMiddleware(['viewer', 'admin']), UserApi.deleteUser);
router.put("/:id/block", authMiddleware(['admin']), UserApi.blockUser);
router.put("/:id/unblock", authMiddleware(['admin']), UserApi.unblockUser);

module.exports = router;

