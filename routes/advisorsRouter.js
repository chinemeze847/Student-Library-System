
import express from "express"
const router = express.Router()
import { updateAdvisor, getAllAdvisors} from "../controllers/authController.js"

router.route("/").get(getAllAdvisors)
router.route("/update").post(updateAdvisor)


export default router