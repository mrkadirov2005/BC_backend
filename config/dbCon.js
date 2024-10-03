const mongoose=require("mongoose")
const CONNECTION_URL="mongodb+srv://muzaffar:abc1234567@cluster0.brqim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log(CONNECTION_URL)
const connectDB=async()=>{
    try {
        await mongoose.connect(CONNECTION_URL);
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB