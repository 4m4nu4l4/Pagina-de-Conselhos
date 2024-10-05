const express = require("express")
const AdviceApi = require("../api/advice")
const router = express.Router()

router.post("/", AdviceApi.createAdvice);
router.get("/:userId", AdviceApi.getAllAdvices);
router.put("/:id", AdviceApi.updateAdvice);
router.delete("/:id", AdviceApi.deleteAdvice);

module.exports = router;
