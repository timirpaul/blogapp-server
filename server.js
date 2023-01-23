const express = require('express');
const multer = require('multer')
const path = require('path')

require("dotenv").config()

const Auth = require('./routes/auth')
const usersRouter = require('./routes/usersRouter')
const postRouter = require('./routes/postRouter')
const contactRouter = require('./routes/contactRouter')
const categoryRouter = require('./routes/categoriesRouter')
const commentRouter = require('./routes/commentRouter.js')


require('./db/db')
const app =express()

const PORT = process.env.PORT || 5000;
// const bodyparser = require("body-parser");
const cors = require("cors");


app.use(cors());

//npm path


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.send("Hello from node")
})



app.use("/images", express.static(path.join(__dirname,"/images")))

//multer

const storage = multer.diskStorage({
    destination : (request , file , callback) => {
        callback(null ,"images")
    },
    filename : (request , file , callback) => {
        callback(null , request.body.name)
    }
})

const upload = multer({storage : storage})

app.post("/api/upload" , upload.single("file") , (req , res ) => {
    try {
        
        res.status(200).json({result: true, msg:"Fill has been uploaded"})
        
    } catch (error) {
        response.status(500).json(error)
    }
})


app.use('/api',Auth)
app.use('/api/users',usersRouter)
app.use('/api/posts',postRouter)
app.use('/api/contact',contactRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/comment',commentRouter)

app.listen(PORT,()=>{
    console.log(`liss PORT ${PORT}`);
})

// setInterval(()=>{
//     console.log("reload");
// },10000)
