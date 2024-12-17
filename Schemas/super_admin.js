const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Super_Admin=new Schema({
// Name is the official name of center
name:{type:String,required:true},
username:{type:String,required:true},
password:{type:String,required:true},
signed_in:{type:String,required:true},
// token:{type:String,required:false}
  }
  )
  module.exports=mongoose.model('Super_admin',Super_Admin)