import mongoose from 'mongoose';
const EdiarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    CaseNo: {
        type: String,
        required: true,
    },
    Court: {
        type: String,
        required: true,
    },
    Petitioner:{
        type: String,
        required: true,
    },
    Hearingdate: {
        type: Date,
        default: Date.now,
    },
    District:{
        type: String,
        // default: "Pending",
        required: true,
    },
   
});
const Ediary = mongoose.model('Ediary', EdiarySchema);
export default Ediary;