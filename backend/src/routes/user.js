const express = require("express");
const session = require("express-session")
const authMiddleware = require("../middleware/auth");
const UserApi = require("../api/user");
const router = express.Router();

// router.post("/", UserApi.createUser);

router.get("/context", authMiddleware(['viewer', 'admin']),UserApi.findContext);
router.put("/:id", authMiddleware(['viewer', 'admin']), UserApi.updateUser);
router.get("/findUser", authMiddleware(['admin']), UserApi.find);
router.delete("/:id", authMiddleware(['viewer', 'admin']), UserApi.deleteUser);
router.put("/:id/block", authMiddleware(['admin']), UserApi.blockUser);
router.put("/:id/unblock", authMiddleware(['admin']), UserApi.unblockUser);
router.post("/createAdmin", authMiddleware(['admin']), UserApi.createAdmin);

module.exports = router;

