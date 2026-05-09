import Ediary from "../Models/EdiaryModel.js";

export const UploadDiaryData = async(req,res)=>{
    const { CaseNo, Court, Petitioner, Hearingdate ,District} = req.body;
    const {userId: sessionUserId} = req.session;
    try {
        if(!CaseNo || !Court || !Petitioner || !Hearingdate || !District){
            return res.status(400).json({ message: "All fields are required" });
        }
        const NewDiary = new Ediary({
            userId: sessionUserId,
            CaseNo,
            Court,
            Petitioner,
            Hearingdate,
            District
        });
        await NewDiary.save();
        res.status(201).json({ message: "Diary data uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const GetDiaryData = async(req,res)=>{
    const {userId : sessionUserId} = req.session;
    try {
        const diaryData= await Ediary.find({userId: sessionUserId}).sort({ createdAt: -1 });
        res.status(200).json({ diaryData })
    } catch (error) {
        console.error("Error fetching diary data:", error)
        res.status(500).json({ message: "Failed to fetch diary data" })
    }
}

export const DeleteRecord = async(req,res)=>{
    const {id:recordId} = req.params;   
    try {
        const deletedRecord = await Ediary.findByIdAndDelete(recordId);
        if (!deletedRecord) {
            return res.status(404).json({ message: "Record not found" })
        } 
        return res.status(200).json({ message: "Record deleted successfully" })
    } catch (error) {
        console.log(error)
            res.status(500).json({ message: "Failed to delete record" })
    }
}

export const SearchCase = async(req,res)=>{
    const {query}   = req.body
    try {
        const cases = await Ediary.find({$or:[
            {Court:{$regex:query,$options:"i"}},
            {Petitioner:{$regex:query,$options:"i"}},
            {District:{$regex:query,$options:"i"}},
            {CaseNo:{$regex:query,$options:"i"}}
        ]})
        if(cases.length === 0){
            return res.status(404).json({message:"No cases found"})
        }
        res.status(200).json({cases})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}

export const DeleteAllRecords =async(req,res)=>{
    try {
     const Cases = await Ediary.deleteMany({userId: req.session.userId})
    //  console.log(Cases)
     if(Cases.deletedCount === 0){
        return res.status(404).json({message:"No cases found"})
     }
     return res.status(200).json({message:"All records deleted successfully"})
     
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}