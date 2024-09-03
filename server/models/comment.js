import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        require: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;