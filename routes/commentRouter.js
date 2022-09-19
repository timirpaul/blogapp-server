const express = require('express')
const router = express.Router()
const commentSchema = require('../models/commentSchema')


router.get('/:id', async (req,res)=>{
    const postId = req.params.id
    try {
        const allComment = await commentSchema.find({postId})
        res.status(200).json(allComment)
    } catch (error) {
        res.status(500).json({msg:"error", error})
    }
})
 
router.post("/", async (req,res)=>{
    const {username, comment , postId} = req.body

    try {
        const newComment = new commentSchema({username , comment ,postId})
        const saveComment = await newComment.save()
        res.status(200).json({msg:"comment save",saveComment})
    } catch (error) {
        res.status(500).json({msg:"comment error",error})
    }
})
module.exports = router