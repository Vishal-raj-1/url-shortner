import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    visitedHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

export default mongoose.model("url", URLSchema);