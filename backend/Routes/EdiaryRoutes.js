import { Router } from "express";
import { UploadDiaryData,GetDiaryData,DeleteRecord ,SearchCase,DeleteAllRecords} from "../Controller/EdiaryController.js";
import { AuthSession } from "../Middlewares/AuthSession.js";
const router = Router()

router.post("/addDiaryData", AuthSession, UploadDiaryData)
router.get("/getDiaryData", AuthSession, GetDiaryData)
router.delete("/deleteRecord/:id", AuthSession, DeleteRecord)

router.post("/search-case",AuthSession,SearchCase)
router.post("/delete-all-records",AuthSession,DeleteAllRecords)
export default router