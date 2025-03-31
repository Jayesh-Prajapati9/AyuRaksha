import mongoose, { Schema } from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    memberId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupProfile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/166/166258.png'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

groupSchema.statics.getGroupDetail = function (groupIds = []) {
    
    if (groupIds.length === 0) return Promise.resolve([]);

    return this.aggregate([
        {
            $match: {
                _id: {
                    $in: groupIds.map(id => new mongoose.Types.ObjectId(id))
                }
            }
        },
        {
            $project: {
                id: "$_id",
                name: 1,
                groupProfile: 1,
                memberId: 1
            }
        }
    ])
}

const Group = mongoose.model("Group", groupSchema);

export default Group;