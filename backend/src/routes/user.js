const express = require("express");
// const authMiddleware = require("./src/middleware/auth");
const UserApi = require("../api/user");
const router = express.Router();

router.post("/", UserApi.createUser);

router.put("/:id", UserApi.updateUser);
router.get("/:id", UserApi.findUser);
router.get("/context", UserApi.findContext);
router.delete("/:id", UserApi.deleteUser);

module.exports = router;