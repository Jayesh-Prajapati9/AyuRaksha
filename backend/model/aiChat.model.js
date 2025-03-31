import mongoose, { Schema } from "mongoose"

const aiChatSchema = new mongoose.Schema({
    message: {
        type: String
    },
    image: {
        type: String
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', aiChatSchema)

export default Chat