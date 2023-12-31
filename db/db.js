
const mongoose = require("mongoose")

    const url = process.env.MONGODB_URL
    // const url = `mongodb://localhost:27017/blogdb`
    try {
        mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true})
      console.log("database connection succesfully");
    } catch (error) {
        console.log(error);
    } 
  

    


