const mongoose=require("mongoose")
const Schema=mongoose.Schema

const Log=new Schema({
    type:{type:String,required:true},
    client:{type:String,required:true},
    data:{type:String,required:true},
    date:{type:String,required:true},
    trial_status:{type:String,required:true}

  }
  )
  module.exports=mongoose.model('Log',Log)