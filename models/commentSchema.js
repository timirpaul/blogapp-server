const mongooes = require('mongoose')

const commentSchema = new mongooes.Schema({
    username:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    postId:{
        type:String,
        required:true
    }
},{timestamps:true})

const Comment = mongooes.model("Comment", commentSchema)

module.exports = Comment 