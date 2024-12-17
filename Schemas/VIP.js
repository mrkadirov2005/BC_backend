const mongoose=require("mongoose")
const Schema=mongoose.Schema

const VIP=new Schema({
  _id:{type:String,require:true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    age:{type:Number,required:true},
    email:{type:String,required:true},
    address: { type: String, required: true },
    password:{type:String,required:true},
    loggedIn:{type:Boolean,required:false},
    phone_number:{type:Number,required:true},
    center_id:{type:String,required:true},
    admin_id:{type:String,required:false}
  }
  )
  module.exports=mongoose.model('VIP',VIP)