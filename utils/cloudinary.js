// const {v2} = require ('cloudinary');
const cloudinary = require("cloudinary").v2;

const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const resposne = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log(resposne);
    return resposne ;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath)
    return null ;
  }
};

const deleteCloudinary = async(publicId)=>{
try {
  if(!publicId) return null;

  const res=await cloudinary.uploader.destroy(publicId)
  console.log("res",res);
  return res;
} catch (error) {
  return error;
}
}

module.exports = {uploadCloudinary , deleteCloudinary}


