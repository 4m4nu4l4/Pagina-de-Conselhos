const express = require("express")
const UserApi = require('../api/user');

const router = express.Router();

router.get("/", UserApi.findUser);
//router.get("/", (req, res) => {res.send("get")});
router.post("/", UserApi.createUser);
router.put("/:id", UserApi.UpdateUser);
router.delete("/:id", UserApi.deletUser);

module.exports = router;