const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Teacher=new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email:{type:String,required:true},
    address: { type: String, required: true },
    password:{type:String,required:true},
    loggedIn:{type:Boolean,required:false},
    phone_number:{type:String,required:true},
    subject:{type:String,required:true},
    groups:{type:String,required:true},
    rank:{type:String,required:false}
  }
  )
  module.exports=mongoose.model('Teacher',Teacher)