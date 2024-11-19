const express = require("express");
const AdviceApi = require("../api/advice");
const authMiddleware = require("../middleware/auth");
const router = express.Router();


router.post("/", authMiddleware(['viewer', 'admin']), AdviceApi.createAdvice);
router.get("/:userId", authMiddleware(['viewer', 'admin']), AdviceApi.getAllUserAdvice);
router.get("/", authMiddleware(['viewer', 'admin']), AdviceApi.getAllAdvices); 
router.get("/get/month", authMiddleware(['viewer', 'admin']), AdviceApi.getMonthAdvice); 
router.get("/get/one", authMiddleware(['viewer', 'admin']), AdviceApi.getOneAdvice); 
router.get("/get/change", authMiddleware(['viewer', 'admin']), AdviceApi.getChangeAdvice); 
router.put("/:id", authMiddleware(['admin']), AdviceApi.updateAdvice); 
router.delete("/:id", authMiddleware(['admin']), AdviceApi.deleteAdvice); 

module.exports = router;
