const express = require("express");

const UserApi = require("../api/user");
const router = express.Router();

router.post("/", authMiddleware, UserApi.createUser);

router.put("/:id", UserApi.updateUser);
router.get("/:id", UserApi.findUser);
router.delete("/:id", UserApi.deleteUser);

module.exports = router;