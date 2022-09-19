
const mongoose = require("mongoose")

    const url = `mongodb+srv://Blogdb:Blog123@cluster0.xyb9h.mongodb.net/Blogdb?retryWrites=true&w=majority`
    // const url = `mongodb://localhost:27017/blogdb`
    try {
        mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true})
      console.log("database connection succesfully");
    } catch (error) {
        console.log(error);
    } 
  

    


