const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Student=new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email:{type:String,required:true},
    address: { type: String, required: false },
    password:{type:String,required:true},
    loggedIn:{type:Boolean,required:false},
    phone_number:{type:Number,required:true},
    group_id:{type:String,required:true},
    rank:{type:Object,required:false},

  }
  )
  module.exports=mongoose.model('Student',Student)